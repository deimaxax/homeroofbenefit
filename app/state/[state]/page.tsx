import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BenefitForm from '@/components/BenefitForm'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

interface PageProps {
  params: {
    state: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const stateData = getStateDataInfo(params.state)
  
  if (!stateData) {
    return {
      title: 'State Not Found',
      description: 'This state is not currently supported.'
    }
  }

  const stateName = stateData.name
  const programName = stateData.programName || `${stateName} Restoration Initiative`
  
  return {
    title: `${stateName} Housing Benefits 2025 | Free Roof Inspection & Storm Damage Claims`,
    description: `Check your ${stateName} housing restoration eligibility instantly. ${stateData.stats.homeowners} homeowners served. Average claim: ${stateData.stats.avgClaim}. Free roof inspection for ${stateName} residents.`,
    keywords: `${stateName} housing benefits, ${stateName} roof repair, ${stateName} storm damage, ${stateName} roof replacement, ${stateName} home restoration, roofing assistance ${stateName}`,
    openGraph: {
      title: `${stateName} Homeowner Benefits - Free Roof Inspection 2025`,
      description: `${stateName} homeowners: Check eligibility for storm damage recovery and roof restoration programs. ${stateData.stats.homeowners} served statewide.`,
      url: `https://housingbenefitcheck.org/state/${params.state}`,
      siteName: 'Housing Benefit Check',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `/og-${params.state}.png`,
          width: 1200,
          height: 630,
          alt: `${stateName} Housing Benefits 2025`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${stateName} Housing Benefits 2025`,
      description: `Free roof inspection for ${stateName} homeowners. Check eligibility now.`,
      images: [`/og-${params.state}.png`]
    },
    alternates: {
      canonical: `https://housingbenefitcheck.org/state/${params.state}`
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

// Generate static params for all states
export async function generateStaticParams() {
  const states = Object.keys(stateData)
  
  return states.map((state) => ({
    state: state
  }))
}

function getStateDataInfo(stateName: string) {
  return stateData[stateName.toLowerCase()] || null
}

const stateData: Record<string, {
  name: string
  programName: string
  description: string
  benefits: string[]
  stats: {
    avgClaim: string
    homeowners: string
    coverage: string
  }
}> = {
  texas: {
    name: 'Texas',
    programName: 'Texas Storm Recovery Initiative',
    description: 'Texas homeowners face some of the most severe weather conditions in the nation, including hail storms, tornadoes, and hurricanes. Our state-approved restoration programs help Texas residents recover from storm damage.',
    benefits: [
      'Hail damage repair assistance',
      'Wind mitigation incentives',
      'Hurricane recovery programs',
      'Roof replacement benefits',
      'Emergency repair funding'
    ],
    stats: {
      avgClaim: '$12,500',
      homeowners: '15,000+',
      coverage: '254 Counties'
    }
  },
  colorado: {
    name: 'Colorado',
    programName: 'Colorado Roof & Solar Incentive',
    description: 'Colorado\'s unique climate brings severe hailstorms and heavy snow loads that can damage roofs. Our programs help Colorado homeowners maintain and restore their properties.',
    benefits: [
      'Hail damage restoration',
      'Snow load repair assistance',
      'Mountain region weather programs',
      'Energy-efficient roofing upgrades',
      'Storm damage recovery'
    ],
    stats: {
      avgClaim: '$11,200',
      homeowners: '8,500+',
      coverage: '64 Counties'
    }
  },
  florida: {
    name: 'Florida',
    programName: 'Sunshine State Restoration',
    description: 'Florida homeowners deal with hurricanes, tropical storms, and severe wind damage. Our comprehensive programs provide crucial support for storm recovery and prevention.',
    benefits: [
      'Hurricane damage assistance',
      'Wind-resistant roofing subsidies',
      'Storm preparedness grants',
      'Flood damage recovery',
      'Emergency repair programs'
    ],
    stats: {
      avgClaim: '$14,800',
      homeowners: '12,000+',
      coverage: '67 Counties'
    }
  },
  oklahoma: {
    name: 'Oklahoma',
    programName: 'Oklahoma Storm Recovery',
    description: 'Oklahoma is located in Tornado Alley, experiencing frequent severe weather events. Our programs help Oklahoma homeowners recover from tornado and hail damage.',
    benefits: [
      'Tornado damage recovery',
      'Severe weather restoration',
      'Hail impact repair',
      'Wind damage assistance',
      'Storm-resistant upgrades'
    ],
    stats: {
      avgClaim: '$10,500',
      homeowners: '6,200+',
      coverage: '77 Counties'
    }
  },
  kansas: {
    name: 'Kansas',
    programName: 'Kansas Weather Protection',
    description: 'Kansas experiences severe thunderstorms, tornadoes, and hail. Our restoration programs provide essential support for Kansas homeowners facing weather-related damage.',
    benefits: [
      'Tornado recovery programs',
      'Hail damage assistance',
      'Severe storm restoration',
      'Agricultural property support',
      'Emergency repair funding'
    ],
    stats: {
      avgClaim: '$9,800',
      homeowners: '4,500+',
      coverage: '105 Counties'
    }
  },
  nebraska: {
    name: 'Nebraska',
    programName: 'Nebraska Home Restoration',
    description: 'Nebraska homeowners face severe weather including tornadoes, hail, and winter storms. Our programs help protect and restore Nebraska properties.',
    benefits: [
      'Tornado damage recovery',
      'Hail storm assistance',
      'Winter storm damage',
      'Agricultural building support',
      'Preventive upgrade programs'
    ],
    stats: {
      avgClaim: '$9,200',
      homeowners: '3,800+',
      coverage: '93 Counties'
    }
  },
  missouri: {
    name: 'Missouri',
    programName: 'Missouri Storm Relief',
    description: 'Missouri experiences diverse weather challenges including tornadoes, severe thunderstorms, and ice storms. Our programs support Missouri homeowners in recovery and prevention.',
    benefits: [
      'Tornado recovery assistance',
      'Severe storm restoration',
      'Ice storm damage repair',
      'Hail damage programs',
      'Flood recovery support'
    ],
    stats: {
      avgClaim: '$10,100',
      homeowners: '5,500+',
      coverage: '114 Counties'
    }
  },
  minnesota: {
    name: 'Minnesota',
    programName: 'Minnesota Weather Recovery',
    description: 'Minnesota homeowners deal with harsh winters, severe storms, and hail damage. Our programs provide comprehensive support for weather-related property damage.',
    benefits: [
      'Winter storm damage',
      'Hail damage restoration',
      'Severe weather recovery',
      'Ice dam prevention',
      'Energy-efficient upgrades'
    ],
    stats: {
      avgClaim: '$10,800',
      homeowners: '6,800+',
      coverage: '87 Counties'
    }
  },
  illinois: {
    name: 'Illinois',
    programName: 'Illinois Home Protection',
    description: 'Illinois experiences severe thunderstorms, tornadoes, and winter weather. Our restoration programs help Illinois homeowners recover from diverse weather challenges.',
    benefits: [
      'Tornado damage recovery',
      'Severe storm assistance',
      'Hail damage programs',
      'Winter weather restoration',
      'Urban property support'
    ],
    stats: {
      avgClaim: '$11,500',
      homeowners: '7,200+',
      coverage: '102 Counties'
    }
  }
}

type Props = {
  params: { state: string }
}

function getCitiesForState(stateName: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'dynamic_cities.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    const lines = fileContents.trim().split('\n')
    const allCities = lines.map(line => JSON.parse(line))
    
    const stateCities = allCities
      .filter((city: any) => city.state === stateName)
      .map((city: any) => ({
        city: city.city,
        county: city.county || null
      }))
    
    const uniqueCities = Array.from(
      new Map(stateCities.map((item: any) => [item.city, item])).values()
    ).sort((a: any, b: any) => a.city.localeCompare(b.city))
    
    return uniqueCities
  } catch (error) {
    console.error('Error loading cities:', error)
    return []
  }
}

export default function StatePage({ params }: Props) {
  const state = stateData[params.state.toLowerCase()]

  if (!state) {
    notFound()
  }

  const cities = getCitiesForState(state.name)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8">
            <Link href="/home" className="text-blue-200 hover:text-white flex items-center gap-2 mb-6 font-medium transition-colors">
              ← Back to Home
            </Link>
            <span className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              {state.name} Program Active
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            {state.name} Housing<br />
            <span className="text-yellow-400">Restoration Benefits</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mb-12">
            {state.description}
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl font-black mb-3">{state.stats.avgClaim}</div>
              <div className="text-blue-100 font-semibold">Average Claim Value</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl font-black mb-3">{state.stats.homeowners}</div>
              <div className="text-blue-100 font-semibold">Homeowners Helped</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl font-black mb-3">{state.stats.coverage}</div>
              <div className="text-blue-100 font-semibold">Statewide Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white border-y-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 text-center">
            Available Benefits in {state.name}
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Comprehensive restoration programs designed for {state.name} homeowners
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl border-4 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-lg">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section - SEO Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">
            {state.name} Roofing Resources & Guides
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href={`/articles/free-roof-inspection-guide?state=${params.state}`} className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-5 hover:shadow-xl transition-all group">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600">Free Roof Inspection</h3>
              <p className="text-sm text-gray-600 mb-3">Get a professional inspection at no cost in {state.name}</p>
              <span className="text-green-600 font-semibold text-sm">Read →</span>
            </Link>
            <Link href={`/articles/hail-damage-roof-replacement?state=${params.state}`} className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-5 hover:shadow-xl transition-all group">
              <div className="text-3xl mb-3">🌨️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600">Hail Damage Guide</h3>
              <p className="text-sm text-gray-600 mb-3">Identify hail damage and file successful claims in {state.name}</p>
              <span className="text-purple-600 font-semibold text-sm">Read →</span>
            </Link>
            <Link href={`/articles/roofing-benefits-guide-2025?state=${params.state}`} className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-5 hover:shadow-xl transition-all group">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Benefits Guide</h3>
              <p className="text-sm text-gray-600 mb-3">Maximize roofing restoration benefits in {state.name}</p>
              <span className="text-blue-600 font-semibold text-sm">Read →</span>
            </Link>
            <Link href={`/articles/storm-damage-claims?state=${params.state}`} className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-2xl p-5 hover:shadow-xl transition-all group">
              <div className="text-3xl mb-3">⛈️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600">Storm Claims</h3>
              <p className="text-sm text-gray-600 mb-3">File and win storm damage claims in {state.name}</p>
              <span className="text-red-600 font-semibold text-sm">Read →</span>
            </Link>
            <Link href={`/articles/home-restoration-tips?state=${params.state}`} className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-5 hover:shadow-xl transition-all group">
              <div className="text-3xl mb-3">🔨</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600">Restoration Tips</h3>
              <p className="text-sm text-gray-600 mb-3">Expert restoration advice for {state.name} homes</p>
              <span className="text-amber-600 font-semibold text-sm">Read →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Cities & Counties in {state.name}
            </h2>
            <p className="text-xl text-gray-700 mb-2 font-semibold">
              Click on your city to check eligibility
            </p>
            <p className="text-lg text-gray-600">
              Serving {cities.length}+ locations across {state.name}
            </p>
          </div>

          {cities.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {cities.map((location: any, index: number) => {
                  const citySlug = location.city.toLowerCase().replace(/\s+/g, '-')
                  
                  return (
                    <Link 
                      key={index}
                      href={`/state/${params.state}/${citySlug}/county`}
                      className="group"
                    >
                      <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
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
                            {location.city}
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
                  )
                })}
              </div>
              
              {cities.length > 100 && (
                <div className="mt-10 text-center">
                  <p className="text-gray-700 font-semibold mb-6 text-lg">
                    Showing 100 of {cities.length} locations
                  </p>
                  <details className="inline-block">
                    <summary className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
                      View All {cities.length} Locations →
                    </summary>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                      {cities.slice(100).map((location: any, index: number) => {
                        const citySlug = location.city.toLowerCase().replace(/\s+/g, '-')
                        
                        return (
                          <Link 
                            key={index + 100}
                            href={`/state/${params.state}/${citySlug}/county`}
                            className="group"
                          >
                            <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
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
                                  {location.city}
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
                        )
                      })}
                    </div>
                  </details>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">Loading cities...</p>
            </div>
          )}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Check Your Eligibility in {state.name}
            </h2>
            <p className="text-xl text-gray-700">
              Find out if you qualify for restoration benefits in under 2 minutes
            </p>
          </div>

          <BenefitForm defaultState={state.name} defaultCity="" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Questions About {state.name} Benefits?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Our team is here to help you navigate the claims process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-10 py-7 text-xl font-black rounded-xl shadow-xl">
                Contact Us
              </Button>
            </Link>
            <Link href="/articles">
              <Button size="lg" variant="outline" className="border-4 border-white text-white hover:bg-white/20 px-10 py-7 text-xl font-black rounded-xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}