-- Migration: Add compliance and tracking columns to leads table
-- This replaces the JSON blob approach with proper indexed columns

-- Add TCPA consent columns
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS tcpa_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS consent_ip VARCHAR(45);

-- Add UTM tracking columns
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100),
ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100),
ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_term VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_content VARCHAR(255);

-- Add attribution columns
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS session_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS landing_page TEXT;

-- Add property/lead quality columns
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS property_issues TEXT[], -- PostgreSQL array
ADD COLUMN IF NOT EXISTS estimated_value_min INTEGER,
ADD COLUMN IF NOT EXISTS estimated_value_max INTEGER;

-- Add duplicate detection index
CREATE INDEX IF NOT EXISTS idx_leads_phone_created 
ON leads (phone, created_at DESC);

-- Add UTM source index for analytics
CREATE INDEX IF NOT EXISTS idx_leads_utm_source 
ON leads (utm_source, created_at DESC);

-- Add consent index for compliance queries
CREATE INDEX IF NOT EXISTS idx_leads_consent 
ON leads (tcpa_consent, created_at DESC);

-- Comment on columns for documentation
COMMENT ON COLUMN leads.tcpa_consent IS 'User explicitly checked TCPA consent checkbox';
COMMENT ON COLUMN leads.consent_timestamp IS 'Timestamp when consent was given';
COMMENT ON COLUMN leads.consent_ip IS 'IP address when consent was given';
COMMENT ON COLUMN leads.property_issues IS 'Array of issues: storm-damage, old-roof, high-bills';
