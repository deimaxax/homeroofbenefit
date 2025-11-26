  // app/benefitform/page.tsx - COMPLIANT VERSION

  import { headers } from 'next/headers'
  import BenefitForm from '@/components/BenefitForm'
  import ExitIntent from '@/components/ExitIntent'
  import MobileCTA from '@/components/MobileCTA'
  import Link from 'next/link'
  import { Button } from '@/components/ui/button'

  export default function BenefitFormPage({ searchParams }: { searchParams?: { city?: string, state?: string, county?: string } }) {
    const headersList = headers()
    const city = searchParams?.city || headersList.get('x-user-city') || 'Your City'
    const region = searchParams?.state || headersList.get('x-user-region') || 'US'
    const county = searchParams?.county
    
    // Format location for display
    const locationName = county 
      ? `${county.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} County`
      : city !== 'Your City'
      ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : null
      
    const stateParam = searchParams?.state || region.toLowerCase()
    const cityParam = searchParams?.city || city.toLowerCase().replace(/\s+/g, '-')

    return (
      <>
      <main className="min-h-screen bg-slate-50 relative">
        
        {/* Exit Intent Popup */}
        <ExitIntent />

        {/* ═══════════════════════════════════════════════════════════════
            DISCLAIMER - Compact but compliant
        ═══════════════════════════════════════════════════════════════ */}
        
        {/* ═══════════════════════════════════════════════════════════════
            URGENCY BAR - MOBILE OPTIMIZED
        ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-2 px-3 text-center sticky top-0 z-40 shadow-lg border-b border-red-800" data-analytics-id="urgency_bar">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base font-medium">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>
            <span className="truncate">
              ⚠️ <span className="font-black">Only 4 Slots Left</span> for {city}
              <span className="hidden sm:inline"> Today</span>
              <span className="hidden md:inline text-red-200"> • Q4 Deadline</span>
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
          <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-14 max-w-4xl text-center">
            
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-sm font-medium">Program Active in {city}, {region}</span>
            </div>

            {/* Main Headline - MOBILE FIRST - SHORTER */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              <span className="text-yellow-400">⚠️CRITICAL ALERT:</span>
              <br />
              <span className="text-white">Homeowners Facing </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
                Immediate Insurance Rate HIKES
              </span>
            </h1>

            {/* Sub-headline - MOBILE OPTIMIZED */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto px-2">
              <span className="text-yellow-300 font-bold">Secure a TRUE 0-Cost Damage Assessment.</span>
              <span className="hidden sm:inline"> We guarantee we find the insurance-covered fault or we leave. Zero obligation.</span>.
              <span className="block mt-2 font-semibold text-white text-xs sm:text-sm md:text-base">Avg. claim: $8,500 - $22,800+*</span>
            </p>

            {/* Quick Benefits - COMPACT MOBILE */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-3 sm:gap-x-5 gap-y-1 text-xs sm:text-sm text-blue-100">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Fully Insured & Bonded
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Certified Master Contractor
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                15 Sec
              </span>
            </div>

            {/* CTA Button - CLEAN & PROFESSIONAL */}
            
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FORM SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section id="eligibility-form" className="relative -mt-4 z-10 pb-8 sm:pb-12 scroll-mt-16 sm:scroll-mt-20">
          <div className="container mx-auto px-3 sm:px-4 max-w-xl">
            
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              
              {/* Form Header - CLEAN & PROFESSIONAL */}
              <div className="bg-slate-800 text-white px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Free Eligibility Check</p>
                      <p className="text-xs text-slate-400">See your estimated benefit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <p className="font-semibold text-white text-sm">{city}</p>
                    </div>
                    <p className="text-xs text-slate-400">Program Active</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-4 sm:p-5 md:p-8">
                <BenefitForm defaultCity={city} defaultState={region} />
              </div>

              {/* Trust Footer - SIMPLIFIED (3 key points only) */}
              <div className="bg-gray-50 border-t border-gray-100 px-5 py-2.5">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    Secure
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    100% Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    No Obligation
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SOCIAL PROOF SECTION - MOBILE OPTIMIZED
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
            
            {/* Section Header */}
            <p className="text-center text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8 uppercase tracking-wider font-medium">
              Why Homeowners Trust Us
            </p>

            {/* Stats Row - COMPACT MOBILE */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mb-6 sm:mb-10">
              <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-2xl md:text-4xl font-black text-gray-900">$12.4k</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">Avg. Claim*</p>
              </div>
              <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-2xl md:text-4xl font-black text-emerald-600">FREE</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">$350 Value</p>
              </div>
              <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-2xl md:text-4xl font-black text-gray-900">24h</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">Response</p>
              </div>
            </div>

            {/* Trust Badges - HORIZONTAL SCROLL MOBILE */}
            <div className="flex overflow-x-auto sm:overflow-visible sm:flex-wrap items-center justify-start sm:justify-center gap-4 sm:gap-6 md:gap-10 py-4 sm:py-6 border-t border-b border-gray-100 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
              {/* Licensed & Insured */}
              <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-gray-900 whitespace-nowrap">Licensed</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">All Partners</p>
                </div>
              </div>

              {/* BBB Style */}
              <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-black text-[10px] sm:text-xs">
                  A+
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-gray-900 whitespace-nowrap">Top Rated</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">Verified</p>
                </div>
              </div>

              {/* Insurance Partners */}
              <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-gray-900 whitespace-nowrap">All Insurers</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">State Farm+</p>
                </div>
              </div>
            </div>

            {/* Live Activity Counter - COMPACT */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs sm:text-sm text-emerald-800">
                  <span className="font-bold">47</span> checked in {city} this week
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Articles Section - SEO Resources */}
        {locationName && (
          <div className="py-12 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
                {locationName} Roofing Resources
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Learn more about roofing benefits and claims in your area
              </p>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Link href={`/articles/free-roof-inspection-guide${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-4 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-2">🏠</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600">Free Inspection</h3>
                  <p className="text-xs text-gray-600 mb-2">Get free roof inspection</p>
                  <span className="text-xs text-green-600 font-semibold">Read Guide →</span>
                </Link>
                <Link href={`/articles/hail-damage-roof-replacement${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-4 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-2">🌨️</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-purple-600">Hail Damage</h3>
                  <p className="text-xs text-gray-600 mb-2">Insurance claim help</p>
                  <span className="text-xs text-purple-600 font-semibold">Read Guide →</span>
                </Link>
                <Link href={`/articles/roofing-benefits-guide-2025${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-4 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600">Benefits Guide</h3>
                  <p className="text-xs text-gray-600 mb-2">Maximize your benefits</p>
                  <span className="text-xs text-blue-600 font-semibold">Read Guide →</span>
                </Link>
                <Link href={`/articles/storm-damage-claims${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-xl p-4 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-2">⛈️</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-red-600">Storm Claims</h3>
                  <p className="text-xs text-gray-600 mb-2">File successful claims</p>
                  <span className="text-xs text-red-600 font-semibold">Read Guide →</span>
                </Link>
                <Link href={`/articles/home-restoration-tips${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-4 hover:shadow-lg transition-all group">
                  <div className="text-3xl mb-2">🔨</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-amber-600">Restoration</h3>
                  <p className="text-xs text-gray-600 mb-2">Expert restoration tips</p>
                  <span className="text-xs text-amber-600 font-semibold">Read Guide →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Disclaimer */}
        <div className="py-6 bg-slate-50 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <p className="text-xs text-gray-400 text-center">
              * Average based on approved insurance claims processed through our contractor network. Results vary based on damage extent, policy coverage, and insurance carrier decisions.
              We connect you with licensed contractors who can help assess your roof and navigate the claims process.
            </p>
          </div>
        </div>

      </main>      {/* Smart Mobile CTA - shows only when form is not visible */}
      <MobileCTA />
      </>
    )
  }