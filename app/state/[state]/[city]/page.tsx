import { getStateData } from "@/lib/locations"
import BenefitForm from "@/components/BenefitForm"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"

interface PageProps {
  params: {
    state: string;
    city: string;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityFormatted = params.city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const stateFormatted = params.state.charAt(0).toUpperCase() + params.state.slice(1);
  const stateData = getStateData(params.state);
  const avgClaim = stateData?.stats?.avgClaim || '$10,000';

  return {
    title: `${cityFormatted}, ${stateFormatted} Roof Repair Benefits 2025 | Free Inspection`,
    description: `${cityFormatted}, ${stateFormatted} homeowners: Check eligibility for storm damage roof repair programs. Free inspection, average claim ${avgClaim}. Approved 2025 program for ${cityFormatted} residents.`,
    keywords: `${cityFormatted} roof repair, ${cityFormatted} storm damage, ${cityFormatted} housing benefits, roof replacement ${cityFormatted}, ${stateFormatted} roofing assistance`,
    openGraph: {
      title: `${cityFormatted}, ${stateFormatted} Housing Benefits 2025`,
      description: `Free roof inspection for ${cityFormatted} homeowners. Check your eligibility for storm damage recovery programs today.`,
      url: `https://housingbenefitcheck.org/state/${params.state}/${params.city}`,
      siteName: 'Housing Benefit Check',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `/og-${params.state}-${params.city}.png`,
          width: 1200,
          height: 630,
          alt: `${cityFormatted}, ${stateFormatted} Roof Repair Benefits`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cityFormatted}, ${stateFormatted} Roof Benefits`,
      description: `Free inspection for ${cityFormatted} homeowners. Average claim: ${avgClaim}`,
      images: [`/og-${params.state}-${params.city}.png`]
    },
    alternates: {
      canonical: `https://housingbenefitcheck.org/state/${params.state}/${params.city}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  }
}

// Generate static paths for all city pages
export async function generateStaticParams() {
  const fs = await import('fs')
  const path = await import('path')
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'dynamic_cities.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const lines = fileContents.trim().split('\n')
    const allCities = lines.map(line => JSON.parse(line))

    // State name mapping
    const stateMap: Record<string, string> = {
      'Texas': 'texas',
      'Colorado': 'colorado',
      'Oklahoma': 'oklahoma',
      'Kansas': 'kansas',
      'Nebraska': 'nebraska',
      'Missouri': 'missouri',
      'Florida': 'florida',
      'Minnesota': 'minnesota',
      'Illinois': 'illinois',
    }

    const params: Array<{ state: string; city: string }> = []
    
    allCities.forEach((item: any) => {
      const stateSlug = stateMap[item.state]
      if (stateSlug && item.city) {
        const citySlug = item.city.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
        
        // Avoid duplicates
        if (!params.some(p => p.state === stateSlug && p.city === citySlug)) {
          params.push({
            state: stateSlug,
            city: citySlug
          })
        }
      }
    })

    return params
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Helper to get nearby cities in same state
function getNearbyCities(currentCity: string, stateName: string) {
  try {
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(process.cwd(), 'data', 'dynamic_cities.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const lines = fileContents.trim().split('\n')
    const allCities = lines.map((line: string) => JSON.parse(line))

    const stateMap: Record<string, string> = {
      'texas': 'Texas',
      'colorado': 'Colorado',
      'oklahoma': 'Oklahoma',
      'kansas': 'Kansas',
      'nebraska': 'Nebraska',
      'missouri': 'Missouri',
      'florida': 'Florida',
      'minnesota': 'Minnesota',
      'illinois': 'Illinois',
    }

    const fullStateName = stateMap[stateName.toLowerCase()]
    
    const cities = allCities
      .filter((city: any) => city.state === fullStateName && city.city.toLowerCase() !== currentCity.toLowerCase())
      .map((city: any) => ({
        name: city.city,
        slug: city.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        county: city.county
      }))
    
    // Remove duplicates
    const unique = Array.from(new Map(cities.map((c: any) => [c.slug, c])).values())
    return unique.slice(0, 30)
  } catch (error) {
    console.error('Error loading nearby cities:', error)
    return []
  }
}

export default function CityPage({ params }: PageProps) {
  const stateData = getStateData(params.state);

  const cityName = params.city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const stateName = params.state.charAt(0).toUpperCase() + params.state.slice(1);
  
  const nearbyCities = getNearbyCities(cityName, params.state)
  
  const programName = stateData?.programName || `${stateName} Restoration Initiative`;
  const utility = stateData?.utility || "local utility providers";

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 lg:py-20">
        
        {/* Top Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            Official 2025 Program Active
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Blue Header Bar */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-8 py-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              {cityName} Homeowner<br />
              <span className="text-yellow-400">Eligibility Center</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold">
              2025 Storm Restoration Program
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="text-center mb-10">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Official verification for residents of <span className="font-bold text-blue-900">{cityName}, {stateName}</span> served by{' '}
                <span className="font-bold text-blue-900">{utility}</span>.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg> 
                  Instant verification
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg> 
                  No credit check
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg> 
                  100% free
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-10 mb-12 opacity-80">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <span className="text-3xl font-black text-blue-900">HB</span>
                </div>
                <p className="text-xs font-medium text-gray-600">Housing Benefit Check</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-2 text-white text-4xl font-bold">✓</div>
                <p className="text-xs font-medium text-gray-600">Verified Program</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-xl">5★</div>
                <p className="text-xs font-medium text-gray-600">Trusted Service</p>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-2xl border-4 border-blue-200 p-8 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  Check Your Property Eligibility
                </h3>
                <p className="text-gray-600 text-lg">Takes less than 30 seconds • Instant results</p>
              </div>

              <BenefitForm defaultState={params.state} defaultCity={cityName} />

              {/* Security Badges */}
              <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-300 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  "256-bit SSL Encrypted",
                  "No Credit Check Required",
                  "100% Free Assessment"
                ].map((text) => (
                  <div key={text} className="flex flex-col items-center">
                    <svg className="w-10 h-10 text-green-600 mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Why Check Eligibility in {cityName}?
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Homeowners in <span className="font-bold text-blue-900">{cityName}, {stateName}</span> may be eligible for 
                state-backed restoration programs through the <span className="font-bold">{programName}</span>. 
                This tool verifies your address against program databases to determine if you qualify for 
                full roof replacement or energy incentives at little to no out-of-pocket cost.
              </p>
              
              {/* Info Grid */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <h4 className="text-lg font-black text-gray-900 mb-6">Program Information</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div>
                    <span className="block font-bold text-gray-900 mb-2">Program Status</span>
                    <span className="inline-flex items-center gap-1 text-green-700 font-bold">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Active
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 mb-2">Region</span>
                    <span className="text-gray-700">{cityName}, {stateName}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 mb-2">Utility Zone</span>
                    <span className="text-gray-700">{utility}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 mb-2">Last Updated</span>
                    <span className="text-gray-700">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                Housing Benefit Check is a private service. Not affiliated with any government agency.
              </p>
            </div>
          </div>
        </div>

        {/* Articles Section - SEO Content */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border-2 border-blue-200 p-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
            {cityName} Roofing Resources
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link href={`/articles/free-roof-inspection-guide?city=${params.city}&state=${params.state}`} className="bg-white border border-green-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600">Free Inspection</h3>
              <p className="text-xs text-gray-600 mb-2">Get free roof inspection in {cityName}</p>
              <span className="text-xs text-green-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/hail-damage-roof-replacement?city=${params.city}&state=${params.state}`} className="bg-white border border-purple-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">🌨️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-purple-600">Hail Damage</h3>
              <p className="text-xs text-gray-600 mb-2">Hail damage claims for {cityName}</p>
              <span className="text-xs text-purple-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/roofing-benefits-guide-2025?city=${params.city}&state=${params.state}`} className="bg-white border border-blue-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600">Benefits Guide</h3>
              <p className="text-xs text-gray-600 mb-2">Roofing benefits in {cityName}</p>
              <span className="text-xs text-blue-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/storm-damage-claims?city=${params.city}&state=${params.state}`} className="bg-white border border-red-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">⛈️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-red-600">Storm Claims</h3>
              <p className="text-xs text-gray-600 mb-2">File claims in {cityName}</p>
              <span className="text-xs text-red-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/home-restoration-tips?city=${params.city}&state=${params.state}`} className="bg-white border border-amber-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">🔨</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-amber-600">Restoration</h3>
              <p className="text-xs text-gray-600 mb-2">Restoration tips for {cityName}</p>
              <span className="text-xs text-amber-600 font-semibold">Read →</span>
            </Link>
          </div>
        </div>

        {/* Other Cities in State - SEO Internal Links */}
        {nearbyCities.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
              Other Cities in {stateName}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {nearbyCities.map((city: any) => (
                <Link
                  key={city.slug}
                  href={`/state/${params.state}/${city.slug}`}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <span className="text-blue-600 text-sm">📍</span>
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                    {city.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link 
                href={`/state/${params.state}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
              >
                View All {stateName} Cities →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}