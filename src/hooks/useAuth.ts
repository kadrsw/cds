// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, set, get, onValue, update } from 'firebase/database';
import { auth, database } from '../config/firebase';
import { User } from '../types';
import { generateReferralCode, generateDeviceFingerprint } from '../utils/miningCalculations';
import { detectUserLanguage } from '../utils/languages';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Firebase yoksa hemen loading'i kapat
    if (!auth) {
      console.error('Firebase Auth not initialized');
      setLoading(false);
      setInitialized(true);
      return;
    }

    let userDataUnsubscribe: (() => void) | null = null;
    let isMounted = true;
    let hasSetLoading = false;

    // Maksimum 3 saniye loading
    const forceTimeout = setTimeout(() => {
      if (!hasSetLoading && isMounted) {
        console.warn('⏰ Auth timeout - forcing loading to false');
        setLoading(false);
        setInitialized(true);
        hasSetLoading = true;
      }
    }, 3000);

    const authUnsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (!isMounted) return;

        try {
          if (firebaseUser) {
            const userRef = ref(database, `users/${firebaseUser.uid}`);
            
            try {
              const snapshot = await Promise.race([
                get(userRef),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
              ]) as any;
              
              if (!isMounted) return;
              
              if (snapshot && snapshot.exists && snapshot.exists()) {
                // User exists - set up listener
                userDataUnsubscribe = onValue(
                  userRef,
                  (userSnapshot) => {
                    if (!isMounted) return;
                    
                    if (userSnapshot.exists()) {
                      const userData = userSnapshot.val();
                      
                      if (!userData.referralCode) {
                        const referralCode = generateReferralCode(firebaseUser.uid);
                        const updatedUserData = { ...userData, referralCode };
                        set(userRef, updatedUserData).catch(console.error);
                        setUser(updatedUserData);
                      } else {
                        setUser(userData);
                      }
                    }
                    
                    if (!hasSetLoading) {
                      setLoading(false);
                      setInitialized(true);
                      hasSetLoading = true;
                    }
                  },
                  (error) => {
                    console.error('User data listener error:', error);
                    if (!hasSetLoading && isMounted) {
                      setLoading(false);
                      setInitialized(true);
                      hasSetLoading = true;
                    }
                  }
                );
              } else {
                // New user - create profile
                await createNewUserProfile(firebaseUser, userRef, isMounted);
                
                if (!isMounted) return;
                
                // Set up listener for new user
                userDataUnsubscribe = onValue(
                  userRef,
                  (userSnapshot) => {
                    if (!isMounted) return;
                    if (userSnapshot.exists()) {
                      setUser(userSnapshot.val());
                    }
                    if (!hasSetLoading) {
                      setLoading(false);
                      setInitialized(true);
                      hasSetLoading = true;
                    }
                  },
                  (error) => {
                    console.error('New user listener error:', error);
                    if (!hasSetLoading && isMounted) {
                      setLoading(false);
                      setInitialized(true);
                      hasSetLoading = true;
                    }
                  }
                );
              }
            } catch (error) {
              console.error('Database error:', error);
              if (!hasSetLoading && isMounted) {
                setLoading(false);
                setInitialized(true);
                hasSetLoading = true;
              }
            }
          } else {
            // No user logged in
            if (userDataUnsubscribe) {
              userDataUnsubscribe();
              userDataUnsubscribe = null;
            }
            setUser(null);
            if (!hasSetLoading && isMounted) {
              setLoading(false);
              setInitialized(true);
              hasSetLoading = true;
            }
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          if (!hasSetLoading && isMounted) {
            setUser(null);
            setLoading(false);
            setInitialized(true);
            hasSetLoading = true;
          }
        }
      },
      (error) => {
        console.error('Auth observer error:', error);
        if (!hasSetLoading && isMounted) {
          setLoading(false);
          setInitialized(true);
          hasSetLoading = true;
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(forceTimeout);
      authUnsubscribe();
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
    };
  }, []);

  // Helper function to create new user profile
  const createNewUserProfile = async (
    firebaseUser: FirebaseUser,
    userRef: any,
    isMounted: boolean
  ) => {
    try {
      const deviceFingerprint = await generateDeviceFingerprint().catch(() => 'unknown');
      const referralCode = generateReferralCode(firebaseUser.uid);
      const userLanguage = detectUserLanguage();
      const userIP = await getUserIP();
      const userCountry = await getUserCountry();

      if (!isMounted) return;

      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || '',
        createdAt: new Date().toISOString(),
        trialStartDate: new Date().toISOString(),
        trialEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        totalTrialEarnings: 0,
        balance: 0,
        isAdmin: firebaseUser.email === 'admin@cryptocloudmining.com',
        referralCode,
        referralEarnings: 0,
        totalReferrals: 0,
        isBanned: false,
        deviceFingerprint,
        language: userLanguage,
        lastLoginIP: userIP,
        country: userCountry
      };

      await set(userRef, newUser);
      setUser(newUser);
    } catch (error) {
      console.error('Create user profile error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error: any) {
      let errorMessage = 'Login failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message || 'Login failed';
      }
      
      console.error('Login error:', error);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Use at least 6 characters';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        default:
          errorMessage = error.message || 'Registration failed';
      }
      
      console.error('Registration error:', error);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      if (!email) {
        throw new Error('Email is required');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      let errorMessage = 'Password reset failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        default:
          errorMessage = error.message || 'Password reset failed';
      }
      
      console.error('Password reset error:', error);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const updateUserLanguage = async (language: string) => {
    if (!user) return;
    
    try {
      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, { language });
    } catch (error) {
      console.error('Failed to update user language:', error);
      throw new Error('Failed to update language preference');
    }
  };

  const updateUserData = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in');
    }
    
    try {
      const userRef = ref(database, `users/${user.uid}`);
      const updatedData = { ...user, ...updates };
      await set(userRef, updatedData);
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw new Error('Failed to update user data');
    }
  };

  const getUserIP = async (): Promise<string> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const getUserCountry = async (): Promise<string> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      return data.country_code || 'unknown';
    } catch (error) {
      return 'unknown';
    }
  };

  return {
    user,
    loading,
    login,
    register,
    resetPassword,
    logout,
    updateUserData,
    updateUserLanguage
  };
};
