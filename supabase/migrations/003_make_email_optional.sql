-- ═══════════════════════════════════════════════════════════════
-- Make EMAIL optional for higher conversion
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Remove NOT NULL constraint from email column
ALTER TABLE leads 
ALTER COLUMN email DROP NOT NULL;

-- Add a comment explaining why email is optional
COMMENT ON COLUMN leads.email IS 'Optional - many users convert better without email requirement';
