import { NextRequest, NextResponse } from 'next/server'

// In-memory cache for IP lookups (resets on cold start, but saves tons of API calls)
// Key: IP address, Value: { city, region, country, timestamp }
const geoCache = new Map<string, { city: string; region: string; country: string; ts: number }>()
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours in ms

async function getGeoFromIPInfo(ip: string): Promise<{ city: string; region: string; country: string } | null> {
  const token = process.env.IPINFO_TOKEN
  
  if (!token) {
    console.warn('[GEO] IPINFO_TOKEN not set, falling back to Vercel geo')
    return null
  }
  
  // Check cache first
  const cached = geoCache.get(ip)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    console.log('[GEO] Cache HIT for IP:', ip)
    return { city: cached.city, region: cached.region, country: cached.country }
  }
  
  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`, {
      headers: { 'Accept': 'application/json' },
    })
    
    if (!response.ok) {
      console.error('[GEO] ipinfo.io error:', response.status)
      return null
    }
    
    const data = await response.json()
    
    // ipinfo returns: { city, region, country, ... }
    const result = {
      city: data.city || 'Your Area',
      region: data.region || 'US', // This is the state name (e.g., "Mississippi")
      country: data.country || 'US'
    }
    
    // For US, convert state name to abbreviation if needed
    // ipinfo returns region as full name for some, abbreviation for others
    // We want abbreviation (MS, TX, etc.)
    if (result.country === 'US' && data.region) {
      // ipinfo actually returns the state code in the 'region' field for US
      result.region = data.region.length === 2 ? data.region : getStateAbbreviation(data.region) || data.region
    }
    
    // Cache the result
    geoCache.set(ip, { ...result, ts: Date.now() })
    console.log('[GEO] Cache MISS, fetched for IP:', ip, result)
    
    return result
  } catch (error) {
    console.error('[GEO] ipinfo.io fetch error:', error)
    return null
  }
}

// US State name to abbreviation mapping
function getStateAbbreviation(stateName: string): string | null {
  const states: Record<string, string> = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District of Columbia': 'DC'
  }
  return states[stateName] || null
}

export async function middleware(request: NextRequest) {
  // PRIORITY 1: Check URL params (manual override)
  const url = new URL(request.url)
  const urlCity = url.searchParams.get('city')
  const urlState = url.searchParams.get('state')
  
  // Get visitor IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || request.headers.get('x-real-ip') 
    || request.ip 
    || ''
  
  // PRIORITY 2: Try ipinfo.io (cached)
  let city = urlCity || ''
  let region = urlState || ''
  let country = 'US'
  
  if (!city || !region) {
    const ipinfoGeo = await getGeoFromIPInfo(ip)
    
    if (ipinfoGeo) {
      city = city || ipinfoGeo.city
      region = region || ipinfoGeo.region
      country = ipinfoGeo.country
    } else {
      // PRIORITY 3: Fallback to Vercel geo (less accurate but free)
      city = city || request.geo?.city || 'Your Area'
      region = region || request.geo?.region || 'US'
      country = request.geo?.country || 'US'
    }
  }

  const response = NextResponse.next()

  // Set headers for the server components to read
  response.headers.set('x-user-city', city)
  response.headers.set('x-user-region', region)
  response.headers.set('x-user-country', country)
  response.headers.set('x-user-ip', ip)

  return response
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
