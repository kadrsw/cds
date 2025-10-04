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

  useEffect(() => {
    let userDataUnsubscribe: (() => void) | null = null;
    let isMounted = true; // Cleanup için

    const authUnsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!isMounted) return; // Component unmount olduysa işlem yapma

      try {
        if (firebaseUser) {
          const userRef = ref(database, `users/${firebaseUser.uid}`);
          
          // Check if user exists
          const snapshot = await get(userRef);
          
          if (!isMounted) return; // Async işlem sonrası tekrar kontrol
          
          if (snapshot.exists()) {
            // Set up real-time listener for user data
            userDataUnsubscribe = onValue(userRef, (userSnapshot) => {
              if (!isMounted) return;
              
              if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                
                // Mevcut kullanıcılar için referans kodu yoksa ekle
                if (!userData.referralCode) {
                  const referralCode = generateReferralCode(firebaseUser.uid);
                  const updatedUserData = { ...userData, referralCode };
                  set(userRef, updatedUserData).catch(console.error);
                  setUser(updatedUserData);
                } else {
                  setUser(userData);
                }
              } else {
                console.warn('User data not found in database');
                setUser(null);
              }
              setLoading(false);
            }, (error) => {
              console.error('User data listener error:', error);
              setLoading(false);
            });
          } else {
            // Create new user profile
            const deviceFingerprint = await generateDeviceFingerprint();
            const referralCode = generateReferralCode(firebaseUser.uid);
            
            if (!isMounted) return;
            
            // URL'den referans kodunu kontrol et
            const urlParams = new URLSearchParams(window.location.search);
            const referralParam = urlParams.get('ref');
            let referredBy = undefined;
            
            if (referralParam) {
              try {
                // Referans kodunu kontrol et
                const usersRef = ref(database, 'users');
                const usersSnapshot = await get(usersRef);
                if (usersSnapshot.exists()) {
                  const users = usersSnapshot.val();
                  const referrer = Object.values(users).find((u: any) => u.referralCode === referralParam);
                  if (referrer) {
                    referredBy = (referrer as any).uid;
                    
                    // Referans veren kullanıcının referans sayısını artır
                    const referrerRef = ref(database, `users/${(referrer as any).uid}`);
                    const referrerData = referrer as any;
                    await set(referrerRef, {
                      ...referrerData,
                      totalReferrals: (referrerData.totalReferrals || 0) + 1
                    });
                  }
                }
              } catch (error) {
                console.error('Referral processing error:', error);
              }
            }
            
            if (!isMounted) return;
            
            // Kullanıcı dilini ve ülkesini tespit et
            const userLanguage = detectUserLanguage();
            const userCountry = await getUserCountry();
            const userIP = await getUserIP();
            
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
              ...(referredBy && { referredBy }),
              referralEarnings: 0,
              totalReferrals: 0,
              isBanned: false,
              deviceFingerprint: deviceFingerprint,
              language: userLanguage,
              lastLoginIP: userIP,
              country: userCountry
            };
            
            await set(userRef, newUser);
            
            if (!isMounted) return;
            
            setUser(newUser);
            
            // Güvenlik logu (sessiz hata)
            logSecurityEvent(firebaseUser.uid, 'ACCOUNT_CREATED', deviceFingerprint).catch(() => {});
            
            // Set up real-time listener for the new user
            userDataUnsubscribe = onValue(userRef, (userSnapshot) => {
              if (!isMounted) return;
              
              if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                setUser(userData);
              }
              setLoading(false);
            }, (error) => {
              console.error('User data listener error:', error);
              setLoading(false);
            });
          }
        } else {
          // Çıkış logu (sessiz hata)
          const currentUser = user;
          if (currentUser) {
            logSecurityEvent(currentUser.uid, 'LOGOUT', currentUser.deviceFingerprint || '').catch(() => {});
          }
          
          // Clean up user data listener when user logs out
          if (userDataUnsubscribe) {
            userDataUnsubscribe();
            userDataUnsubscribe = null;
          }
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
      }
    });

    // Timeout fallback - 5 saniye içinde loading bitmediyse zorla kapat
    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Auth initialization timeout - forcing loading to false');
        setLoading(false);
      }
    }, 5000);

    return () => {
      isMounted = false; // Component unmount olduğunda flag'i değiştir
      clearTimeout(timeoutId);
      authUnsubscribe();
      // Clean up user data listener
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
    };
  }, []); // ← BAĞIMLILIK KALDIRILDI! Bu kritik düzeltme

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Giriş güvenlik kontrolü
      if (result.user) {
        const deviceFingerprint = await generateDeviceFingerprint();
        const userIP = await getUserIP();
        
        // Kullanıcı bilgilerini güncelle
        const userRef = ref(database, `users/${result.user.uid}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          await update(userRef, {
            lastLoginIP: userIP,
            deviceFingerprint
          });
        }
        
        // Güvenlik logu (sessiz hata)
        logSecurityEvent(result.user.uid, 'LOGIN', deviceFingerprint).catch(() => {});

        // Şüpheli aktivite kontrolü (sessiz hata)
        checkSuspiciousActivity(result.user.uid, userIP, deviceFingerprint).catch(() => {});
      }
      
      return result;
    } catch (error: any) {
      // Handle specific Firebase auth errors
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
      
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password strength
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error: any) {
      // Handle specific Firebase auth errors
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
      
      // Validate email format
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

  // Update user language
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

  // Helper function to update user data
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

  // IP adresi alma
  const getUserIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) });
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Failed to get user IP:', error);
      return 'unknown';
    }
  };

  // Kullanıcı ülkesi alma
  const getUserCountry = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
      const data = await response.json();
      return data.country_code || 'unknown';
    } catch (error) {
      console.warn('Failed to get user country:', error);
      return 'unknown';
    }
  };

  // Güvenlik olayı loglama (sessiz hata)
  const logSecurityEvent = async (userId: string, action: string, deviceFingerprint: string) => {
    try {
      const userIP = await getUserIP();
      const securityLog = {
        userId,
        action,
        ipAddress: userIP,
        deviceFingerprint,
        timestamp: new Date().toISOString(),
        suspicious: false
      };

      const logsRef = ref(database, `securityLogs/${Date.now()}_${userId}`);
      await set(logsRef, securityLog);
    } catch (error) {
      // Sessiz hata - izinler olmayabilir
    }
  };

  // Şüpheli aktivite kontrolü (sessiz hata)
  const checkSuspiciousActivity = async (userId: string, ip: string, fingerprint: string) => {
    try {
      const logsRef = ref(database, 'securityLogs');
      const snapshot = await get(logsRef);

      if (snapshot.exists()) {
        const logs = Object.values(snapshot.val()) as any[];
        const recentLogs = logs.filter(log =>
          new Date(log.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
        );

        // Aynı IP'den çok fazla hesap kontrolü
        const sameIPAccounts = recentLogs.filter(log =>
          log.ipAddress === ip && log.userId !== userId
        );

        if (sameIPAccounts.length > 3) {
          // Şüpheli aktivite tespit edildi
          await banUser(userId, 'Multiple accounts from same IP detected');
        }
      }
    } catch (error) {
      // Sessiz hata - izinler olmayabilir
    }
  };

  // Kullanıcı banlama
  const banUser = async (userId: string, reason: string) => {
    try {
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);
      
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        await set(userRef, {
          ...userData,
          isBanned: true,
          banReason: reason,
          bannedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Ban user failed:', error);
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
