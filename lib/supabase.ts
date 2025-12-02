// lib/supabase.ts - Supabase client configuration

import { createClient } from '@supabase/supabase-js'

// Check if Supabase is actually configured
export const isSupabaseConfigured = () => {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// Get configured values or null
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate URL format
const isValidUrl = supabaseUrl && (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://'))

// Client-side Supabase instance (for browser) - only create if configured
export const supabase = (isValidUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server-side Supabase instance (with service role for admin operations)
export const createServerSupabaseClient = () => {
  if (!isValidUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase not configured - set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return null
  }
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
  return createClient(supabaseUrl!, supabaseServiceKey)
}

// Type definitions for leads table
export interface Lead {
  id?: string
  name: string
  phone: string
  email: string  // NOT NULL in current schema
  zip_code?: string | null
  street_address?: string | null
  city?: string | null
  state?: string | null
  source?: string | null
  ip_address?: string | null
  user_agent?: string | null
  notes?: string | null
  created_at?: string
  status?: string | null
  assigned_to?: string | null
  updated_at?: string
  
  // Compliance columns (from migration 002)
  tcpa_consent?: boolean
  consent_timestamp?: string | null
  consent_ip?: string | null
  
  // UTM tracking
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  
  // Attribution
  referrer?: string | null
  session_id?: string | null
  landing_page?: string | null
  
  // Property/lead quality
  property_issues?: string[] | null  // PostgreSQL array OR JSONB (migration 004)
  estimated_value_min?: number | null
  estimated_value_max?: number | null
}
