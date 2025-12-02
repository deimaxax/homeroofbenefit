-- ═══════════════════════════════════════════════════════════════
-- OPTIONAL: Add property_issues JSONB column to leads table
-- ═══════════════════════════════════════════════════════════════
-- Run this migration in Supabase SQL Editor if you want a dedicated
-- column for damage indicators. Otherwise, they're stored in notes JSON.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS property_issues JSONB DEFAULT '[]'::jsonb;

-- Index for fast lookup of entries that contain specific issues
CREATE INDEX IF NOT EXISTS idx_leads_property_issues ON leads USING gin (property_issues);

COMMENT ON COLUMN leads.property_issues IS 'Array of damage indicators: hail, age, leaks, etc.';
