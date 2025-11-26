// app/api/leads/route.ts - Lead capture API endpoint with Supabase

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, Lead } from '@/lib/supabase'

interface LeadRequestData {
  name: string
  phone: string
  email: string
  zipCode?: string
  city?: string
  state?: string
  source?: string
  consent?: boolean
  consent_ts?: string
  utm?: Record<string, string>
  referrer?: string
  sessionId?: string
  propertyIssues?: string[]
  estimatedBenefit?: number
}

// Optional: Webhook URL for backup (Make/Zapier/n8n)
const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL || ''

// ═══════════════════════════════════════════════════════════════
// RATE LIMITING - Simple in-memory store (use Redis in production)
// ═══════════════════════════════════════════════════════════════
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }
  
  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}

// ═══════════════════════════════════════════════════════════════
// DUPLICATE DETECTION - Check for same phone in last 24 hours
// ═══════════════════════════════════════════════════════════════
const recentSubmissions = new Map<string, number>()
const DUPLICATE_WINDOW = 24 * 60 * 60 * 1000 // 24 hours

function checkDuplicate(phone: string): boolean {
  const normalizedPhone = phone.replace(/\D/g, '')
  const now = Date.now()
  const lastSubmission = recentSubmissions.get(normalizedPhone)
  
  // Clean old entries periodically
  if (recentSubmissions.size > 10000) {
    const entries = Array.from(recentSubmissions.entries())
    for (let i = 0; i < entries.length; i++) {
      const [key, time] = entries[i]
      if (now - time > DUPLICATE_WINDOW) {
        recentSubmissions.delete(key)
      }
    }
  }
  
  if (lastSubmission && now - lastSubmission < DUPLICATE_WINDOW) {
    return true // Is duplicate
  }
  
  recentSubmissions.set(normalizedPhone, now)
  return false
}

// ═══════════════════════════════════════════════════════════════
// BOT DETECTION - Basic honeypot and timing checks
// ═══════════════════════════════════════════════════════════════
function detectBot(body: any, headers: Headers): { isBot: boolean; reason?: string } {
  // Check for honeypot field (if frontend sends one)
  if (body.website || body.url || body.honeypot) {
    return { isBot: true, reason: 'honeypot' }
  }
  
  // Check user agent
  const ua = headers.get('user-agent') || ''
  const botPatterns = /bot|crawler|spider|scraper|curl|wget|python|java|php/i
  if (botPatterns.test(ua)) {
    return { isBot: true, reason: 'user-agent' }
  }
  
  // Check for missing required headers
  if (!headers.get('accept') || !headers.get('accept-language')) {
    return { isBot: true, reason: 'missing-headers' }
  }
  
  return { isBot: false }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Rate limit check
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      console.log('🚫 Rate limited:', ip)
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }
    
    const body: LeadRequestData = await request.json()
    
    // Bot detection
    const botCheck = detectBot(body, request.headers)
    if (botCheck.isBot) {
      console.log('🤖 Bot detected:', botCheck.reason, ip)
      // Return success to not alert bot operators, but don't save
      return NextResponse.json({ success: true, message: 'Received' })
    }
    
    // Duplicate check
    if (body.phone && checkDuplicate(body.phone)) {
      console.log('🔄 Duplicate submission detected:', body.phone.slice(-4))
      return NextResponse.json({
        success: true,
        message: 'You have already submitted a request. We will contact you soon.',
        duplicate: true
      })
    }

    // Validate required fields (email is now optional for higher conversion)
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate phone (10 digits)
    const phoneDigits = body.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Validate email only if provided (now optional)
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address' },
          { status: 400 }
        )
      }
    }

    // Prepare lead data for Supabase
    const leadData: Lead = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      zip_code: body.zipCode || null,
      city: body.city || request.headers.get('x-user-city') || null,
      state: body.state || request.headers.get('x-user-region') || null,
      source: body.source || 'benefit-form',
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || 
                  request.headers.get('x-real-ip') || 
                  'unknown',
      user_agent: request.headers.get('user-agent') || null,
      notes: JSON.stringify({
        consent: !!body.consent,
        consent_ts: body.consent_ts || null,
        utm: body.utm || {},
        referrer: body.referrer || null,
        sessionId: body.sessionId || null,
        propertyIssues: body.propertyIssues || [],
        estimatedBenefit: body.estimatedBenefit || null,
      }),
    }

    console.log('📩 New lead received:', {
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      city: leadData.city,
      state: leadData.state,
      source: leadData.source,
    })

    // ═══════════════════════════════════════════════════════════════
    // SAVE TO SUPABASE (Primary)
    // ═══════════════════════════════════════════════════════════════
    let supabaseSuccess = false
    let leadId: string | null = null

    try {
      const supabase = createServerSupabaseClient()
      
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select('id')
        .single()

      if (error) {
        console.error('❌ Supabase insert error:', error.message)
      } else {
        supabaseSuccess = true
        leadId = data?.id
        console.log('✅ Lead saved to Supabase:', leadId)
      }
    } catch (supabaseError) {
      console.error('❌ Supabase connection error:', supabaseError)
    }

    // ═══════════════════════════════════════════════════════════════
    // BACKUP TO WEBHOOK (Optional - Make/Zapier)
    // ═══════════════════════════════════════════════════════════════
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadData,
            timestamp: new Date().toISOString(),
            supabase_id: leadId,
          }),
        })
        console.log('✅ Webhook backup sent')
      } catch (webhookError) {
        console.error('⚠️ Webhook backup failed:', webhookError)
      }
    }

    // Return success if Supabase worked
    if (supabaseSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Lead captured successfully',
        leadId: leadId,
      })
    }

    // If Supabase failed but webhook exists, still return success
    if (WEBHOOK_URL) {
      return NextResponse.json({
        success: true,
        message: 'Lead captured via backup',
        leadId: `backup_${Date.now()}`,
      })
    }

    // Both failed
    return NextResponse.json(
      { success: false, error: 'Failed to save lead' },
      { status: 500 }
    )

  } catch (error) {
    console.error('❌ Lead capture error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  let supabaseStatus = 'not configured'
  
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from('leads').select('id').limit(1)
    supabaseStatus = error ? `error: ${error.message}` : 'connected'
  } catch {
    supabaseStatus = 'connection failed'
  }

  return NextResponse.json({ 
    status: 'ok', 
    endpoint: '/api/leads',
    supabase: supabaseStatus,
    webhookConfigured: !!WEBHOOK_URL,
  })
}
