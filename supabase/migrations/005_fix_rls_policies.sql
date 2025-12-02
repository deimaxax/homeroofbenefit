-- Fix RLS policies to remove multiple permissive policies for same role/action
-- This addresses the performance warning about multiple permissive INSERT policies

-- Drop the overly broad "Allow all for service role" policy
DROP POLICY IF EXISTS "Allow all for service role" ON leads;

-- Create specific policies for service role instead
-- Service role should have full access but with separate policies per action
CREATE POLICY "Service role can select" ON leads
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can insert" ON leads
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update" ON leads
  FOR UPDATE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can delete" ON leads
  FOR DELETE
  USING (auth.role() = 'service_role');

-- The "Anon can insert leads" policy remains as-is for form submissions
-- Now there's only ONE permissive INSERT policy per role (anon has 1, service_role has 1)
