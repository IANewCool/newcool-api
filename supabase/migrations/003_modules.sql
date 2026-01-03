-- Migration: Create modules catalog
-- Central registry of all NewCool modules

CREATE TABLE IF NOT EXISTS public.modules (
  id TEXT PRIMARY KEY,  -- e.g., 'mind-os', 'search-v3'
  name TEXT NOT NULL,
  description TEXT,

  -- Classification
  department TEXT NOT NULL,  -- T01, T02, etc.
  category TEXT NOT NULL,  -- education, streaming, etc.

  -- Monetization
  revenue_model TEXT DEFAULT 'free' CHECK (revenue_model IN (
    'free', 'donation', 'freemium', 'subscription', 'pay-per-use', 'commission', 'custom'
  )),

  -- Access Defaults
  default_access TEXT DEFAULT 'free' CHECK (default_access IN ('free', 'basic', 'pro', 'enterprise')),

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'beta', 'deprecated', 'coming_soon')),
  is_public BOOLEAN DEFAULT TRUE,

  -- URLs
  url TEXT,
  api_url TEXT,
  docs_url TEXT,
  repo_url TEXT,

  -- Metadata
  icon TEXT,
  color TEXT,  -- Hex color
  tags TEXT[],

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Stats (updated periodically)
  total_users INTEGER DEFAULT 0,
  monthly_active_users INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_modules_department ON public.modules(department);
CREATE INDEX IF NOT EXISTS idx_modules_category ON public.modules(category);
CREATE INDEX IF NOT EXISTS idx_modules_status ON public.modules(status);

-- RLS (public read)
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Modules are publicly readable"
  ON public.modules FOR SELECT
  USING (is_public = TRUE);

GRANT SELECT ON public.modules TO anon, authenticated;

-- Insert initial modules
INSERT INTO public.modules (id, name, description, department, category, revenue_model, default_access, status) VALUES
  -- T01 Infrastructure
  ('auth', 'NewCool Auth', 'Sistema de autenticación unificado', 'T01', 'infrastructure', 'free', 'free', 'active'),
  ('hub', 'NewCool Hub', 'Panel de control central', 'T01', 'infrastructure', 'freemium', 'free', 'active'),

  -- T02 Browser & AI
  ('atlas-v4', 'Atlas Browser', 'Navegador con IA integrada', 'T02', 'browser', 'free', 'free', 'beta'),
  ('search-v3', 'Search V3', 'Motor de búsqueda híbrido', 'T02', 'search', 'pay-per-use', 'free', 'active'),

  -- T03 Education
  ('math', 'NewCool Math', 'Matemáticas interactivas', 'T03', 'education', 'donation', 'free', 'active'),
  ('english', 'NewCool English', 'Inglés gamificado', 'T03', 'education', 'donation', 'free', 'active'),
  ('science', 'NewCool Science', 'Ciencias experimentales', 'T03', 'education', 'donation', 'free', 'active'),

  -- T04 Streaming
  ('streaming', 'NewCool Music', 'Streaming de música educativa', 'T04', 'streaming', 'freemium', 'free', 'active'),

  -- T06 Marketplace
  ('fixmatch', 'FixMatch', 'Marketplace de servicios', 'T06', 'marketplace', 'commission', 'free', 'active'),

  -- T07 Government
  ('sernac', 'NewCool SERNAC', 'Consultas consumidor', 'T07', 'government', 'free', 'free', 'active'),
  ('sii', 'NewCool SII', 'Info tributaria', 'T07', 'government', 'free', 'free', 'active'),

  -- T10 AI Factory
  ('ai-factory', 'AI Factory OS', 'Generación de contenido', 'T10', 'ai', 'pay-per-use', 'free', 'active'),

  -- T11 Premium
  ('mind-os', 'Mind OS', 'Gestión cognitiva premium', 'T11', 'premium', 'subscription', 'free', 'active')

ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE public.modules IS 'Central catalog of NewCool modules';
