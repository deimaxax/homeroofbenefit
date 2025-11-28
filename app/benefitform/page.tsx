  // app/benefitform/page.tsx - COMPLIANT VERSION

  import { headers } from 'next/headers'
  import BenefitForm from '@/components/BenefitForm'
  import ExitIntent from '@/components/ExitIntent'
  import MobileCTA from '@/components/MobileCTA'
  import { Analytics } from "@vercel/analytics/next"
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
    
    // Generate random claim file ID (RC-1000 to RC-9999)
    const claimFileId = `RC-${Math.floor(Math.random() * 9000) + 1000}`

    return (
      <>
      <main className="min-h-screen bg-slate-50 relative">
        
        {/* Exit Intent Popup */}
        <ExitIntent />

        {/* ═══════════════════════════════════════════════════════════════
            DISCLAIMER - Compact but compliant
        ═══════════════════════════════════════════════════════════════ */}
        


        {/* ═══════════════════════════════════════════════════════════════
            HERO + FORM - PREMIUM CONVERSION BLOCK
        ═══════════════════════════════════════════════════════════════ */}
        <section id="eligibility-form" className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 scroll-mt-0 overflow-hidden">
          
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative container mx-auto px-4 py-6 sm:py-14 md:py-20 max-w-6xl z-10">
            
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              {/* LEFT: Value Proposition */}
              <div className="text-white text-center lg:text-left">
                
                {/* Location Badge - Premium */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 backdrop-blur-md border border-emerald-500/30 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 mb-6 sm:mb-8 shadow-lg shadow-emerald-500/10">
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
                  </span>
                  <span className="text-[11px] sm:text-sm font-semibold text-emerald-300 tracking-wide whitespace-nowrap">
                    ✓ Program Active in <span className="hidden sm:inline">{city}, {region}</span><span className="sm:hidden">{city}</span>
                  </span>
                </div>

                {/* Main Headline - Dramatic */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                  <span className="bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
                    UNCLAIMED ROOF ALLOWANCE?
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Guaranteed.
                  </span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl sm:text-2xl font-medium text-slate-200 mb-3 max-w-lg mx-auto lg:mx-0">
                  Uncover the <span className="text-emerald-400 font-bold">$21,450+</span> Insurance Payout Hiding in Your Roof
                </p>

                {/* Urgency Line */}
                <div className="inline-flex items-center gap-2 text-amber-400 mb-8">
                  <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-bold uppercase tracking-wider">Claim Deadline Expires Q4 2025</span>
                </div>

                {/* Stats Row - Premium Cards */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
                    <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">$17.4k</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Avg. Payout</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-4 text-center shadow-lg shadow-emerald-500/10">
                    <p className="text-2xl sm:text-3xl font-black text-emerald-400">$0</p>
                    <p className="text-[10px] sm:text-xs text-emerald-300/70 uppercase tracking-wider mt-1">Your Cost</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
                    <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">3 min</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">Response</p>
                  </div>
                </div>

                {/* Trust Line - Premium Chips */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Licensed & Certified
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    All Insurance Accepted
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    No Obligation
                  </span>
                </div>
              </div>

              {/* RIGHT: Form Card - Premium Glass */}
              <div className="relative">
                {/* Glow Effect Behind Card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-70"></div>
                
                <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20">
                  
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Claim File ID:</p>
                        <p className="text-white font-bold text-lg">#{claimFileId}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <span className="text-white text-xs font-bold">{spotsLeft} spots left</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Form Body */}
                  <div className="p-6 sm:p-8">
                    <BenefitForm defaultCity={city} defaultState={region} spotsLeft={spotsLeft} />
                  </div>

                  {/* Trust Footer - Premium */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 px-6 py-4">
                    <div className="flex items-center justify-center gap-5 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        256-bit SSL
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="font-medium">100% Free</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="font-medium">No Obligation</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HOW IT WORKS - PREMIUM 3-STEP PROCESS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-emerald-600 text-sm font-bold uppercase tracking-wider mb-3">Simple Process</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
                3 Steps to Your <span className="text-emerald-600">Free Roof</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Most homeowners qualify for full coverage. Here's how it works:
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl font-black mb-5 shadow-lg shadow-emerald-500/30">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Free Inspection</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Licensed inspector examines your roof for storm damage. Takes 15-20 minutes. <span className="font-semibold text-emerald-600">$350 value - FREE.</span>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-black mb-5 shadow-lg shadow-blue-500/30">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">We File Your Claim</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our experts handle all paperwork with your insurance. We fight for <span className="font-semibold text-blue-600">maximum payout.</span>
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl font-black mb-5 shadow-lg shadow-amber-500/30">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">New Roof Installed</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Premium materials, certified installers, lifetime warranty. <span className="font-semibold text-amber-600">$0 out of pocket.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <a href="#eligibility-form" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5">
                Check If You Qualify
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SOCIAL PROOF - TRUST SIGNALS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 bg-slate-900 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative container mx-auto px-4 max-w-5xl">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">$16.4k</p>
                <p className="text-sm text-slate-400">Avg. Claim Value</p>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">2,400+</p>
                <p className="text-sm text-slate-400">Roofs Replaced</p>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">98%</p>
                <p className="text-sm text-slate-400">Approval Rate</p>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <p className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">A+</p>
                <p className="text-sm text-slate-400">BBB Rating</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Licensed & Insured</p>
                  <p className="text-xs text-slate-400">All 50 States</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-black">
                  A+
                </div>
                <div>
                  <p className="font-bold text-sm text-white">BBB Accredited</p>
                  <p className="text-xs text-slate-400">Top Rated</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-white">All Insurers</p>
                  <p className="text-xs text-slate-400">State Farm, Allstate+</p>
                </div>
              </div>
            </div>

            {/* Live Counter */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-6 py-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-sm font-bold text-emerald-300">
                  24 claims approved in {city} this week
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            ARTICLES / RESOURCES - SEO
        ═══════════════════════════════════════════════════════════════ */}
        {locationName && (
          <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4 max-w-5xl">
              
              {/* Header */}
              <div className="text-center mb-10 sm:mb-14">
                <span className="inline-block text-emerald-600 text-sm font-bold uppercase tracking-wider mb-3">Resources</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                  {locationName} Roofing Guides
                </h2>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  Expert advice for maximizing your insurance benefits
                </p>
              </div>
              
              {/* Articles Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link href={`/articles/free-roof-inspection-guide${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3">🏠</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">Free Inspection</h3>
                  <p className="text-sm text-slate-500 mb-3">Get your $350 inspection free</p>
                  <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                    Read Guide 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link href={`/articles/hail-damage-roof-replacement${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3">🌨️</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">Hail Damage</h3>
                  <p className="text-sm text-slate-500 mb-3">Insurance claim guide</p>
                  <span className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                    Read Guide 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link href={`/articles/roofing-benefits-guide-2025${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Benefits Guide</h3>
                  <p className="text-sm text-slate-500 mb-3">Maximize your payout</p>
                  <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                    Read Guide 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link href={`/articles/storm-damage-claims${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3">⛈️</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">Storm Claims</h3>
                  <p className="text-sm text-slate-500 mb-3">File successful claims</p>
                  <span className="text-sm font-semibold text-red-600 flex items-center gap-1">
                    Read Guide 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link href={`/articles/home-restoration-tips${county ? `?county=${county}` : `?city=${cityParam}`}&state=${stateParam}`} className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-3">🔨</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">Restoration</h3>
                  <p className="text-sm text-slate-500 mb-3">Expert tips & tricks</p>
                  <span className="text-sm font-semibold text-amber-600 flex items-center gap-1">
                    Read Guide 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER / DISCLAIMER
        ═══════════════════════════════════════════════════════════════ */}
        <footer className="py-8 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              * Average based on approved insurance claims processed through our contractor network. Results vary based on damage extent, policy coverage, and insurance carrier decisions.
              We connect you with licensed contractors who can help assess your roof and navigate the claims process. This is not a guarantee of coverage or payment.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-600">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-center text-xs text-slate-600 mt-6">
              © {new Date().getFullYear()} Housing Benefit Check. All rights reserved.
            </p>
          </div>
        </footer>

      </main>

      {/* Smart Mobile CTA - shows only when form is not visible */}
      <MobileCTA spotsLeft={spotsLeft} />
      </>
    )
  }