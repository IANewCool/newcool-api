-- Migration: Create profiles table
-- Extends Supabase auth.users with NewCool-specific fields

CREATE TABLE IF NOT EXISTS public.profiles (
  -- Identity (links to auth.users)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic Info
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,

  -- Contact
  email TEXT NOT NULL,
  phone TEXT,

  -- Location
  country_code TEXT DEFAULT 'CL' CHECK (length(country_code) = 2),
  timezone TEXT DEFAULT 'America/Santiago',
  locale TEXT DEFAULT 'es-CL',

  -- Subscription
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'pro', 'enterprise')),
  tier_expires_at TIMESTAMPTZ,

  -- Preferences (JSONB for flexibility)
  preferences JSONB DEFAULT '{
    "theme": "system",
    "notifications": true,
    "newsletter": false
  }'::jsonb,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_seen_at TIMESTAMPTZ,

  -- Flags
  is_verified BOOLEAN DEFAULT FALSE,
  is_creator BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON public.profiles(country_code);
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(tier);
CREATE INDEX IF NOT EXISTS idx_profiles_created ON public.profiles(created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Public fields are viewable by anyone (via view)
CREATE OR REPLACE VIEW public.profiles_public AS
SELECT
  id,
  username,
  display_name,
  avatar_url,
  is_verified,
  is_creator,
  created_at
FROM public.profiles;

-- Grant access
GRANT SELECT ON public.profiles_public TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth';
