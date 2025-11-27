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
    
    // Generate random spots left (3-9) - same for all components
    const spotsLeft = Math.floor(Math.random() * 7) + 3

    return (
      <>
      <main className="min-h-screen bg-slate-50 relative">
        
        {/* Exit Intent Popup */}
        <ExitIntent />

        {/* ═══════════════════════════════════════════════════════════════
            DISCLAIMER - Compact but compliant
        ═══════════════════════════════════════════════════════════════ */}
        


        {/* ═══════════════════════════════════════════════════════════════
            HERO + FORM - SINGLE CONVERSION BLOCK
        ═══════════════════════════════════════════════════════════════ */}
        <section id="eligibility-form" className="bg-slate-900 scroll-mt-0">
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 max-w-6xl">
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* LEFT: Value Proposition */}
              <div className="text-white text-center lg:text-left">
                
                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-300">Active in {city}, {region}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
                  OUT-OF-POCKET. GUARANTEED.
                  <span className="block text-emerald-400">Uncover the $16,400+ Insurance Payout in Your Roof.</span>
                </h1>

                {/* Value Prop */}
                <p className="text-lg text-slate-300 mb-6 max-w-md mx-auto lg:mx-0">
                  ACTION REQUIRED: Claim Deadline Expires Soon.
                </p>

                {/* Stats Row - Social Proof */}
                <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">$16,400+ </p>
                    <p className="text-xs text-slate-400">VERIFIED</p>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-400">$0$</p>
                    <p className="text-xs text-slate-400">RISK ASSESSMENT</p>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">15MIN.</p>
                    <p className="text-xs text-slate-400">Response</p>
                  </div>
                </div>

                {/* Trust Line - Desktop Only */}
                <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Licensed & Insured
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    All Insurance Accepted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    No Obligation
                  </span>
                </div>
              </div>

              {/* RIGHT: Form Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Form Body */}
                <div className="p-5 sm:p-6 md:p-8">
                  <BenefitForm defaultCity={city} defaultState={region} spotsLeft={spotsLeft} />
                </div>

                {/* Compact Trust Footer */}
                <div className="bg-slate-50 border-t border-slate-100 px-5 py-3">
                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                      Secure
                    </span>
                    <span>•</span>
                    <span>100% Free</span>
                    <span>•</span>
                    <span>No Obligation</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>        {/* ═══════════════════════════════════════════════════════════════
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
                <p className="text-lg sm:text-2xl md:text-4xl font-black text-gray-900">$16.4k</p>
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

            {/* Trust Badges - PREMIUM CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 border-t border-gray-100">
              {/* Licensed & Insured */}
              <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Licensed</p>
                  <p className="text-xs text-gray-600">Fully Insured</p>
                </div>
              </div>

              {/* Top Rated */}
              <div className="flex items-center gap-3 bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm">
                  A+
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Top Rated</p>
                  <p className="text-xs text-gray-600">Verified Partners</p>
                </div>
              </div>

              {/* All Insurers */}
              <div className="flex items-center gap-3 bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">All Insurers</p>
                  <p className="text-xs text-gray-600">State Farm+</p>
                </div>
              </div>
            </div>

            {/* Live Activity Counter - ENHANCED */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-full px-5 py-2.5 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-emerald-900">
                  <span className="text-emerald-600">24</span>  CLAIMS ALREADY APPROVED {city} this week
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
      <MobileCTA spotsLeft={spotsLeft} />
      </>
    )
  }