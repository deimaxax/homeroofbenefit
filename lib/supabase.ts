// lib/supabase.ts - Supabase client configuration

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase instance (for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase instance (with service role for admin operations)
export const createServerSupabaseClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
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
