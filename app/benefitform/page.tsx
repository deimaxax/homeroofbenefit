// app/benefitform/page.tsx

import { headers } from 'next/headers'
import BenefitForm from '@/components/BenefitForm'
import ExitIntent from '@/components/ExitIntent'
import MobileCTA from '@/components/MobileCTA'
import LiveTicker from '@/components/LiveTicker'
import Link from 'next/link'
import { ShieldCheck, Lock, Activity, Database, CheckCircle2 } from 'lucide-react'

// 1. IMPORTUOJAME NUOTRAUKĄ (SVARBU)
// ".." reiškia išeiti iš "benefitform" aplanko į "app", tada į "images"
import mapImage from '../images/mapas.png'

export default function BenefitFormPage({ searchParams }: { searchParams?: { city?: string, state?: string, county?: string } }) {
  const headersList = headers()

  // DATA EXTRACTION - Priority: URL params > Headers > Fallback
  const city = searchParams?.city || headersList.get('x-user-city') || 'Your Area'
  const region = searchParams?.state || headersList.get('x-user-region') || 'US'
  
  // REF ID & URGENCY
  const caseRef = `NRN-${new Date().getFullYear()}-${Math.floor(Math.random() * 8999) + 1000}`
  const spotsLeft = Math.floor(Math.random() * 4) + 2
  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(today.getDate() + 2);
  const formattedDeadline = deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <>
      <main className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-emerald-500/30 relative overflow-x-hidden pt-16">
        
        <ExitIntent />

        {/* SYSTEM NOTICE BANNER */}
        <div className="bg-[#1e293b]/90 border-b border-slate-700 py-2 relative z-50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center flex items-center justify-center gap-2">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <p className="text-[10px] sm:text-xs font-mono font-medium text-slate-300 uppercase tracking-widest">
              DATABASE STATUS: {region} REGION UPDATED {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative pt-8 pb-12 lg:pt-24 lg:pb-32 overflow-hidden bg-[#0B1120]">
          
          {/* ================================================================================== */}
          {/* BACKGROUND LAYERS (Sluoksniai) */}
          {/* ================================================================================== */}
          
          {/* 1. Base Grid */}
          <div className="absolute inset-0 opacity-[0.05] z-0" style={{ backgroundImage: `radial-gradient(#475569 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
          
          {/* 2. JŪSŲ MAP NUOTRAUKA (Su importu) */}
          <div className="absolute inset-0 z-0">
             <img 
                src={mapImage.src} 
                alt="Local Map Data" 
                className="w-full h-full object-cover opacity-[0.15] grayscale mix-blend-luminosity"
             />
             {/* Gradientas iš apačios (kad tekstas būtų įskaitomas) */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent"></div>
             {/* Gradientas iš šonų (kad centras būtų ryškiausias) */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/80 via-transparent to-[#0B1120]/80"></div>
          </div>

          {/* 3. Mėlynas švytėjimas (Glow) */}
          <div className="hidden sm:block absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>

          {/* ================================================================================== */}

          <div className="relative container mx-auto px-4 max-w-7xl z-10">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
              
              {/* LEFT: THE AUTHORITY */}
              <div className="lg:col-span-7 pt-4">
                
                {/* HEADLINE */}
                <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-5 drop-shadow-2xl">
                  Verify Available Funding For <br className="hidden sm:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-400">
                    Full Roof Replacement
                  </span>
                </h1>
                
                <p className="text-base sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl drop-shadow-lg">
                  Homeowners in <span className="text-white font-semibold border-b border-emerald-500/50">{city}</span> are currently eligible to check for <strong>unclaimed policy allowances</strong>. 
                  <span className="block mt-2 text-sm text-slate-500">Don&apos;t pay out-of-pocket expenses before verifying your status.</span>
                </p>

                {/* Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-800/40 border border-slate-800/60 rounded-lg overflow-hidden mb-8 shadow-xl backdrop-blur-md">
                    <div className="bg-[#0f1623]/60 p-4 text-center sm:text-left">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-white mb-1">99%</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">PROJECTED COVERAGE</div>
                    </div>
                    <div className="bg-[#0f1623]/60 p-4 text-center sm:text-left">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 mb-1">$17.450+</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Potential Allowance</div>
                    </div>
                    <div className="bg-[#0f1623]/60 p-4 hidden md:block">
                        <div className="text-2xl font-mono font-bold text-white mb-1">100%</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Secure Online</div>
                    </div>
                </div>
              </div>

              {/* RIGHT: FORM */}
              <div id="eligibility-form" className="lg:col-span-5 relative scroll-mt-24">
                <div className="relative bg-[#111827] border border-slate-700 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
                    
                    {/* Header: Portal Look */}
                    <div className="bg-[#1f2937] border-b border-slate-700 p-4 flex justify-between items-center">
                        <div>
                             <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Claim File ID</p>
                             <div className="flex items-center gap-2">
                                <span className="font-mono text-white font-bold tracking-wide bg-black/30 px-2 py-0.5 rounded border border-white/5">{caseRef}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[9px] font-bold text-emerald-400 uppercase">System Ready</span>
                        </div>
                    </div>

                    {/* FORM COMPONENT */}
                    <div className="p-5 sm:p-6 bg-[#111827]">
                        <BenefitForm defaultCity={city} defaultState={region} spotsLeft={spotsLeft} caseRef={caseRef} />
                    </div>

                    {/* Form Footer */}
                    <div className="bg-[#0f172a] border-t border-slate-800 p-3 text-center">
                        <p className="text-[10px] text-slate-500 flex justify-center items-center gap-1.5">
                           <Lock className="w-3 h-3 opacity-60" /> 
                           Information encrypted for verification only.
                        </p>
                    </div>
                </div>

                {/* Deadline Tag */}
                <div className="absolute -top-3 -right-2 sm:-right-4 bg-amber-500 text-[#0f172a] text-[10px] font-bold px-3 py-1 rounded shadow-lg transform rotate-2 border border-amber-400/50 uppercase tracking-wider">
                    Funding Review Deadline: {formattedDeadline}
                </div>
              </div>

            </div>
          </div>
        </section>
        
        <LiveTicker />

        {/* ═══════════════════════════════════════════════════════════════
            PROCESS SECTION
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-[#0f172a] border-t border-slate-800 relative">
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs mb-2 block">Standard Operating Procedure</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">How The Allowance Process Works</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                      This is not a discount or a coupon. We help you trigger the coverage provisions you are already paying for in your homeowner&apos;s policy.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { step: "01", title: "Map Verification", desc: "Complete the secure form. The system cross-references your location with hail impact data." },
                      { step: "02", title: "Licensed Assessment", desc: "A certified inspector documents the damage. This report is required to compel the insurance carrier." },
                      { step: "03", title: "Coverage Release", desc: "Once approved, the insurance carrier authorizes the funds for full restoration." }
                    ].map((item) => (
                      <div key={item.step} className="relative group bg-[#1e293b]/50 border border-slate-700 p-6 rounded-xl hover:border-emerald-500/30 transition-all hover:bg-[#1e293b]">
                          <div className="absolute top-4 right-4 text-slate-700 font-mono text-4xl font-bold opacity-20 group-hover:opacity-40 transition-opacity select-none">{item.step}</div>
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                             <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          </div>
                          <h3 className="font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                </div>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0B1120] border-t border-slate-800 pt-12 pb-24 sm:pb-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8 mb-10 text-xs text-slate-500">
                    <div>
                        <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Legal Disclaimer</h4>
                        <p className="leading-relaxed opacity-70">
                          This portal is a referral service connecting homeowners with licensed independent adjusters and restoration contractors. &quot;Allowance&quot; refers to potential insurance policy benefits. Not a government agency.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-3 uppercase tracking-wider">Privacy & Data Security</h4>
                        <p className="leading-relaxed opacity-70">
                            Your data is encrypted via 256-bit SSL. Information is only shared with verified partners in the {region} area for the purpose of damage assessment.
                        </p>
                    </div>
                </div>
                
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-600">
                    <p>© {new Date().getFullYear()} National Restoration Network. System Version 4.0.2</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>

      </main>
      
      <MobileCTA spotsLeft={spotsLeft} />
    </>
  )
}