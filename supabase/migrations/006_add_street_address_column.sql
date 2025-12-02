-- ═══════════════════════════════════════════════════════════════
-- Migration: Add street_address column to leads table
-- This provides a dedicated field for the full property address
-- ═══════════════════════════════════════════════════════════════

-- Add street address column
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS street_address TEXT;

-- Add index for address searches
CREATE INDEX IF NOT EXISTS idx_leads_street_address 
ON leads (street_address);

-- Add comment for documentation
COMMENT ON COLUMN leads.street_address IS 'Full street address including street number, name, city, state, and zip code from Google Places API';
