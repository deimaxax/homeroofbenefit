-- ═══════════════════════════════════════════════════════════════
-- LEADS TABLE - Home Roof Program
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  zip_code TEXT,
  city TEXT,
  state TEXT,
  source TEXT DEFAULT 'benefit-form',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Optional: Add status tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'rejected')),
  notes TEXT,
  assigned_to TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create policy for anon role (insert only - for form submissions)
CREATE POLICY "Anon can insert leads" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- OPTIONAL: Create a view for dashboard stats
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW leads_stats AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as leads_24h,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as leads_7d,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as leads_30d,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE status = 'converted') as converted_leads
FROM leads;

-- ═══════════════════════════════════════════════════════════════
-- SAMPLE DATA (optional - remove in production)
-- ═══════════════════════════════════════════════════════════════
-- INSERT INTO leads (name, phone, email, zip_code, city, state, source) VALUES
-- ('Test User', '5125551234', 'test@example.com', '78701', 'Austin', 'TX', 'test');
