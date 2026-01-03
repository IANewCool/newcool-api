-- Migration: Create user_modules table
-- Tracks per-user access to NewCool modules

CREATE TABLE IF NOT EXISTS public.user_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,  -- e.g., 'mind-os', 'search-v3', 'fixmatch'

  -- Access Level
  access_level TEXT DEFAULT 'free' CHECK (access_level IN ('free', 'basic', 'pro', 'unlimited')),
  granted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ,  -- NULL = never expires

  -- Usage Tracking
  usage_count INTEGER DEFAULT 0,
  usage_limit INTEGER,  -- NULL = unlimited
  last_used_at TIMESTAMPTZ,

  -- Billing Reference
  subscription_id TEXT,  -- Stripe subscription ID

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Unique constraint: one entry per user per module
  UNIQUE(user_id, module_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_modules_user ON public.user_modules(user_id);
CREATE INDEX IF NOT EXISTS idx_user_modules_module ON public.user_modules(module_id);
CREATE INDEX IF NOT EXISTS idx_user_modules_expires ON public.user_modules(expires_at) WHERE expires_at IS NOT NULL;

-- RLS
ALTER TABLE public.user_modules ENABLE ROW LEVEL SECURITY;

-- Users can view their own module access
CREATE POLICY "Users can view own modules"
  ON public.user_modules FOR SELECT
  USING (auth.uid() = user_id);

-- Grant access
GRANT SELECT ON public.user_modules TO authenticated;

-- Function to check module access
CREATE OR REPLACE FUNCTION check_module_access(
  p_user_id UUID,
  p_module_id TEXT,
  p_required_level TEXT DEFAULT 'free'
) RETURNS BOOLEAN AS $$
DECLARE
  v_access RECORD;
  v_levels TEXT[] := ARRAY['free', 'basic', 'pro', 'unlimited'];
  v_required_idx INTEGER;
  v_actual_idx INTEGER;
BEGIN
  -- Get user's access for this module
  SELECT * INTO v_access
  FROM public.user_modules
  WHERE user_id = p_user_id AND module_id = p_module_id;

  -- If no record, check if free is enough
  IF v_access IS NULL THEN
    RETURN p_required_level = 'free';
  END IF;

  -- Check expiration
  IF v_access.expires_at IS NOT NULL AND v_access.expires_at < NOW() THEN
    RETURN FALSE;
  END IF;

  -- Check usage limit
  IF v_access.usage_limit IS NOT NULL AND v_access.usage_count >= v_access.usage_limit THEN
    RETURN FALSE;
  END IF;

  -- Check access level
  v_required_idx := array_position(v_levels, p_required_level);
  v_actual_idx := array_position(v_levels, v_access.access_level);

  RETURN v_actual_idx >= v_required_idx;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage
CREATE OR REPLACE FUNCTION increment_module_usage(
  p_user_id UUID,
  p_module_id TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE public.user_modules
  SET
    usage_count = usage_count + 1,
    last_used_at = NOW()
  WHERE user_id = p_user_id AND module_id = p_module_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.user_modules IS 'Per-user module access and usage tracking';
