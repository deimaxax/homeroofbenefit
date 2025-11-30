import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

// Function to get state data
function getStateData(stateName: string) {
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
  
  return stateMap[stateName.toLowerCase()]
}

// Function to get county data and all cities in that county
function getCountyData(citySlug: string, stateName: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'dynamic_cities.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const lines = fileContents.trim().split('\n')
    const allCities = lines.map(line => JSON.parse(line))
    
    // Convert slug back to city name
    const cityName = citySlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    // Find all entries for this city in this state
    const cityEntries = allCities.filter((city: any) => 
      city.state === stateName && 
      city.city.toLowerCase() === cityName.toLowerCase()
    )
    
    // Prioritize entries with county information
    const originalCity = cityEntries.find((city: any) => city.county) || cityEntries[0]
    
    if (!originalCity || !originalCity.county) {
      return null
    }
    
    // Get all cities in this county (case-insensitive county matching)
    const countyName = originalCity.county.toLowerCase()
    const countyCities = allCities
      .filter((city: any) => 
        city.state === stateName && 
        city.county && 
        city.county.toLowerCase() === countyName
      )
      .map((city: any) => city.city)
      .sort((a: string, b: string) => a.localeCompare(b))
    
    // Remove duplicates
    const uniqueCities = Array.from(new Set(countyCities))
    
    // Format county name to proper case
    const formattedCounty = originalCity.county
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    return {
      county: formattedCounty,
      cities: uniqueCities,
      originalCity: originalCity.city
    }
  } catch (error) {
    // Silent fail to reduce logs
    return null
  }
}

type Props = {
  params: { state: string; city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stateName = getStateData(params.state)
  const countyData = getCountyData(params.city, stateName || '')

  if (!stateName || !countyData) {
    return {
      title: 'County Not Found',
      robots: {
        index: false,
        follow: false
      }
    }
  }

  const topCities = countyData.cities.slice(0, 5).join(', ')
  const cityCount = countyData.cities.length

  return {
    title: `${countyData.county} County, ${stateName} Roof Repair Benefits | ${cityCount} Cities Covered`,
    description: `${countyData.county} County, ${stateName} housing restoration benefits. Serving ${cityCount} cities: ${topCities}. Free roof inspection, storm damage claims, emergency repairs. Check eligibility for ${countyData.county} County residents.`,
    keywords: `${countyData.county} County ${stateName}, ${countyData.county} County roof repair, ${countyData.county} County storm damage, housing benefits ${countyData.county} County, ${stateName} roofing assistance`,
    openGraph: {
      title: `${countyData.county} County, ${stateName} Housing Benefits 2025`,
      description: `Free roof inspections for ${countyData.county} County homeowners. ${cityCount} cities covered including ${topCities}.`,
      url: `https://homeroofprogram.com/state/${params.state}/${params.city}/county`,
      siteName: 'Home Roof Program',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `/og-${countyData.county.toLowerCase().replace(/\s+/g, '-')}-county.png`,
          width: 1200,
          height: 630,
          alt: `${countyData.county} County, ${stateName} Housing Benefits`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${countyData.county} County, ${stateName} Benefits`,
      description: `${cityCount} cities covered. Free roof inspection for ${countyData.county} County homeowners.`,
      images: [`/og-${countyData.county.toLowerCase().replace(/\s+/g, '-')}-county.png`]
    },
    alternates: {
      canonical: `https://homeroofprogram.com/state/${params.state}/${params.city}/county`
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

// Generate static params for all county pages
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'dynamic_cities.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const lines = fileContents.trim().split('\n')
    const allCities = lines.map(line => JSON.parse(line))

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
    
    // Only include cities that have county information
    allCities.forEach((item: any) => {
      const stateSlug = stateMap[item.state]
      if (stateSlug && item.city && item.county) {
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
    console.error('Error generating county static params:', error)
    return []
  }
}export default function CountyPage({ params }: Props) {
  const stateName = getStateData(params.state)
  const countyData = getCountyData(params.city, stateName || '')
  
  if (!stateName) {
    notFound()
  }
  
  if (!countyData) {
    const cityName = params.city
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    redirect(`/benefitform?city=${encodeURIComponent(cityName)}&state=${encodeURIComponent(stateName)}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link 
          href={`/state/${params.state}`} 
          className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-2 mb-8 transition-colors"
        >
          ← Back to {stateName}
        </Link>

        {/* County Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
                {countyData.county} County
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-blue-900">
                {stateName} • {countyData.cities.length} Cities Eligible
              </p>
            </div>
          </div>

          {/* Benefits Info */}
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
              Housing Restoration Benefits Available
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold">
              Homeowners in {countyData.county} County may be eligible for:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Storm damage repair assistance',
                'Roof replacement programs',
                'Home restoration incentives',
                'Emergency repair funding'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800 font-bold">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cities List */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Select Your City in {countyData.county} County
          </h2>
          <p className="text-gray-700 text-lg mb-10 font-semibold">
            Click on your city to check eligibility for restoration benefits
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countyData.cities.map((city: string, index: number) => (
              <Link 
                key={index}
                href={`/benefitform?city=${encodeURIComponent(city)}&state=${encodeURIComponent(stateName)}`}
                className="group"
              >
                <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-lg">
                  <svg 
                    className="w-6 h-6 text-blue-700 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                      {city}
                    </div>
                  </div>
                  <svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-700 transition-colors flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Check CTA */}
          <div className="mt-12 pt-10 border-t-2 border-gray-200 text-center">
            <p className="text-gray-700 text-lg mb-6 font-semibold">
              Not sure which city? Check eligibility for the entire county
            </p>
            <Link href={`/benefitform?state=${encodeURIComponent(stateName)}`}>
              <Button 
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-7 text-xl font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Check Eligibility for {countyData.county} County →
              </Button>
            </Link>
          </div>
        </div>

        {/* Articles Section - County Specific */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border-2 border-blue-200 p-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
            {countyData.county} County Resources
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link href={`/articles/free-roof-inspection-guide?county=${countyData.county}&state=${params.state}`} className="bg-white border border-green-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600">Free Inspection</h3>
              <p className="text-xs text-gray-600 mb-2">Get free inspection in {countyData.county} County</p>
              <span className="text-xs text-green-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/hail-damage-roof-replacement?county=${countyData.county}&state=${params.state}`} className="bg-white border border-purple-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">🌨️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-purple-600">Hail Damage</h3>
              <p className="text-xs text-gray-600 mb-2">Hail claims in {countyData.county} County</p>
              <span className="text-xs text-purple-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/roofing-benefits-guide-2025?county=${countyData.county}&state=${params.state}`} className="bg-white border border-blue-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600">Benefits</h3>
              <p className="text-xs text-gray-600 mb-2">Benefits for {countyData.county} County</p>
              <span className="text-xs text-blue-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/storm-damage-claims?county=${countyData.county}&state=${params.state}`} className="bg-white border border-red-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">⛈️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-red-600">Storm Claims</h3>
              <p className="text-xs text-gray-600 mb-2">File claims in {countyData.county} County</p>
              <span className="text-xs text-red-600 font-semibold">Read →</span>
            </Link>
            <Link href={`/articles/home-restoration-tips?county=${countyData.county}&state=${params.state}`} className="bg-white border border-amber-200 rounded-xl p-3 hover:shadow-lg transition-all group">
              <div className="text-2xl mb-2">🔨</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-amber-600">Restoration</h3>
              <p className="text-xs text-gray-600 mb-2">Restoration for {countyData.county} County</p>
              <span className="text-xs text-amber-600 font-semibold">Read →</span>
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center">
          <div className="inline-block bg-gray-100 rounded-2xl px-8 py-4 border-2 border-gray-200">
            <p className="text-gray-700 font-semibold">
              Serving all homeowners in {countyData.county} County, {stateName}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Home Roof Program is a private service. Not affiliated with any government agency.
          </p>
        </div>
      </div>
    </main>
  )
}