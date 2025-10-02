import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface UserLanguagePreference {
  user_id: string;
  language: string;
  country?: string;
  browser_language?: string;
  created_at?: string;
  updated_at?: string;
}

export const languageService = {
  async getUserLanguagePreference(userId: string): Promise<string | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('language')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        return null;
      }

      return data?.language || null;
    } catch (error) {
      return null;
    }
  },

  async saveUserLanguagePreference(
    userId: string,
    language: string,
    country?: string,
    browserLanguage?: string
  ): Promise<boolean> {
    if (!supabase) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert(
          {
            user_id: userId,
            language,
            country,
            browser_language: browserLanguage,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'user_id'
          }
        );

      if (error) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  async updateUserLanguage(userId: string, language: string): Promise<boolean> {
    if (!supabase) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({ language, updated_at: new Date().toISOString() })
        .eq('user_id', userId);

      if (error) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  detectBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = ['tr', 'en', 'de', 'ru', 'ar', 'zh'];

    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    return 'en';
  },

  async detectCountry(): Promise<string | null> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code || null;
    } catch (error) {
      return null;
    }
  }
};
