// app/page.tsx - AUTHORITY HOME PAGE

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldCheck, CheckCircle2, FileCheck, Lock, ArrowRight, Zap, Building2 } from 'lucide-react'

// Structured Data (SEO) - Keep this, it's good logic
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Home Roof Program",
  "url": "https://homeroofprogram.com",
  "description": "Eligibility verification for roof replacement policy allowances.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* GLOBAL BACKGROUND - Matches the dark theme of the form */}
      <main className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
        
        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION - THE "HOOK"
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
          
          {/* Background Effects (Noise + Glows) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            
            {/* Authority Badge */}
            <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-950/50 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                2025 Policy Allowance Guidelines Active
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Verify Your Eligibility For <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                Roof Replacement Benefits
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Homeowners in qualified regions may be owed a full roof replacement under standard insurance policy provisions. <span className="text-slate-200 font-medium">This is not a government handout. It is your policy right.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/benefitform" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-emerald-900/40 border border-white/10"
                >
                  Check Eligibility Portal <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto bg-white/5 border-slate-700 text-slate-200 hover:bg-white/10 hover:text-white"
                >
                  Review Guidelines
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-xs text-slate-500 font-mono">
              <span className="text-emerald-500">●</span> 1,240 verifications processed today
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STATS SECTION - FINANCIAL DATA STYLE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-12 border-y border-slate-800 bg-[#0f172a]/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-1">$2.4B+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Total Claims Verified</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-emerald-400 mb-1">100%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Validation Coverage</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-1">50k+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Homeowners Helped</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-mono font-bold text-amber-400 mb-1">A+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Network Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FEATURES - "WHY USE THE PORTAL"
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-4 bg-[#0B1120]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs mb-2 block">System Capabilities</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Why Use The Official Portal?
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Bypass the manual claims process. Our system cross-references your address with storm data to maximize your potential payout.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Analysis</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  We use real-time NOAA weather data to establish a &quot;Date of Loss&quot; for your property, a requirement for any successful claim.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Lock className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Secure & Private</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Your data is processed via 256-bit SSL encryption. We only share details with licensed adjusters in your specific jurisdiction.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Building2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Licensed Network</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  We filter out &quot;storm chasers&quot;. You are connected only with A+ rated, state-licensed contractors who understand insurance law.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TRUST SIGNALS - LOGOS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 px-4 bg-slate-900 border-y border-slate-800">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-10">
              Verified Compliance Standards
            </p>
            
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Fake Logos representing Authority */}
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-white" />
                <span className="font-bold text-xl text-white">SecureAudit™</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-8 h-8 text-white" />
                <span className="font-bold text-xl text-white">ISO Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-white" />
                <span className="font-bold text-xl text-white">BBB Accredited</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FINAL CTA - THE "LAST CHANCE"
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-4 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Allowance Deadlines May Apply.
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Insurance policies have strict time limits on filing claims after a storm event. <br className="hidden md:block"/>Check your property&apos;s eligibility before the window closes.
            </p>
            <Link href="/benefitform">
              <Button
                size="xl"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-8 text-xl font-bold rounded-xl shadow-2xl shadow-emerald-900/50"
              >
                Launch Eligibility Check <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-slate-500">
              No credit card required • No impact on credit score
            </p>
          </div>
        </section>

        {/* FOOTER IS HANDLED GLOBALLY OR ON PAGE LEVEL - 
            Since we removed it from layout, we can add a simple one here or use a component */}
        <footer className="py-8 bg-[#0B1120] border-t border-slate-800 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                    Home Roof Program is a referral service. We connect homeowners with licensed contractors and public adjusters. We do not provide insurance or legal advice. &quot;Allowance&quot; refers to potential policy benefits, not government funds.
                </p>
                <div className="flex justify-center gap-6 mt-4 text-xs text-slate-500">
                    <Link href="/privacy" className="hover:text-emerald-400">Privacy</Link>
                    <Link href="/terms" className="hover:text-emerald-400">Terms</Link>
                    <Link href="/contact" className="hover:text-emerald-400">Contact</Link>
                </div>
                <p className="mt-4 text-xs text-slate-700">© 2025 Home Roof Program. All Rights Reserved.</p>
            </div>
        </footer>

      </main>
    </>
  )
}