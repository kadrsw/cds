/*
  # Create User Preferences Table

  1. New Tables
    - `user_preferences`
      - `user_id` (text, primary key) - Firebase UID
      - `language` (text) - User's preferred language (tr, en, de, ru, ar, zh)
      - `country` (text) - User's country code
      - `browser_language` (text) - Browser detected language
      - `created_at` (timestamptz) - When preference was created
      - `updated_at` (timestamptz) - When preference was last updated

  2. Security
    - Enable RLS on `user_preferences` table
    - Add policy for authenticated users to read their own preferences
    - Add policy for authenticated users to insert their own preferences
    - Add policy for authenticated users to update their own preferences

  3. Important Notes
    - This table stores language preferences for seamless multi-language experience
    - Language is automatically detected from browser and can be manually changed
    - Integration with Firebase authentication via user_id
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id text PRIMARY KEY,
  language text DEFAULT 'tr',
  country text,
  browser_language text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own preferences
CREATE POLICY "Users can read own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: Users can insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy: Users can update their own preferences
CREATE POLICY "Users can update own preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER trigger_update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_user_preferences_updated_at();