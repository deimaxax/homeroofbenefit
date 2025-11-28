// lib/supabase.ts - Supabase client configuration

import { createClient } from '@supabase/supabase-js'

// Use dummy values during build if not configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'

// Client-side Supabase instance (for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase instance (with service role for admin operations)
export const createServerSupabaseClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Type definitions for leads table
export interface Lead {
  id?: string
  name: string
  phone: string
  email?: string | null  // Now optional
  zip_code?: string | null
  city?: string | null
  state?: string | null
  source?: string | null
  ip_address?: string | null
  user_agent?: string | null
  notes?: string | null
  created_at?: string
}
