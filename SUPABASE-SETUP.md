# Supabase Setup Guide

## Current Status ✅

Your BenefitForm now properly sends leads to `/api/leads` with damage indicators included. The API route is working in **dev mode** (logs to console when Supabase isn't configured).

## What's Working

- ✅ Form submission with propertyIssues (damage indicators)
- ✅ API route validates and processes lead data
- ✅ Damage indicators stored in `notes` JSON field
- ✅ Dev mode: Returns mock lead IDs when Supabase not configured
- ✅ Bot detection, rate limiting, duplicate checking

## To Enable Supabase Storage

### Step 1: Get Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project (or create one)
3. Go to **Settings** → **API**
4. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Configure Environment Variables

Create `.env.local` in your project root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### Step 3: Run Database Migration

Your current Supabase schema is ready! The leads table already exists with this structure:

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
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
  status TEXT DEFAULT 'new',
  notes TEXT,  -- Contains damage indicators as JSON
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Optional Enhancement:** If you want damage indicators in a dedicated column for easier querying:

Run this in **Supabase SQL Editor**:

```sql
-- Add property_issues column
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS property_issues JSONB DEFAULT '[]'::jsonb;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_leads_property_issues 
  ON leads USING gin (property_issues);
```

Then update `app/api/leads/route.ts` to include `property_issues` in the insert (currently commented out).

### Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 5: Test Real Submission

1. Go to http://localhost:3000/benefitform
2. Complete the form with damage indicators selected
3. Submit
4. Check Supabase Dashboard → **Table Editor** → `leads` table
5. You should see a new row with `notes` containing:

```json
{
  "propertyIssues": ["hail", "leaks"],
  "consent": false,
  "utm": {},
  ...
}
```

## How Damage Indicators Are Stored

Currently: Stored in `notes` field as JSON:
```json
{
  "propertyIssues": ["hail", "age", "leaks"]
}
```

To query leads with specific issues:
```sql
SELECT * FROM leads 
WHERE notes::jsonb @> '{"propertyIssues": ["hail"]}'::jsonb;
```

## Troubleshooting

### "Invalid supabaseUrl" Error
- Check `.env.local` exists and has valid HTTPS URL
- Restart dev server after adding env vars

### "Row Level Security" Error
- Your policies are already configured correctly
- Service role key bypasses RLS

### Email Field Required
- Current schema has `email TEXT NOT NULL`
- API uses placeholder `noemail@placeholder.com` if not provided
- Consider running migration 003 to make email optional

### No Data in Supabase
- Check server console for logs
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not just anon key)
- Check RLS policies allow service role inserts

## Production Checklist

- [ ] Set all 3 Supabase env vars
- [ ] Enable email collection in form (optional)
- [ ] Set up backup webhook (Make/Zapier) via `LEADS_WEBHOOK_URL`
- [ ] Monitor rate limits (currently 5/minute per IP)
- [ ] Review bot detection patterns
- [ ] Set up Supabase email alerts for new leads

## Files Changed

- ✅ `components/BenefitForm.tsx` - Now POSTs to API with propertyIssues
- ✅ `app/api/leads/route.ts` - Handles lead insertion, works without Supabase
- ✅ `lib/supabase.ts` - Gracefully handles missing credentials
- ✅ `supabase/migrations/004_add_property_issues_column.sql` - Optional column migration
