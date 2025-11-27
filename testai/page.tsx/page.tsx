import { headers } from 'next/headers'
import BenefitForm from '@/components/BenefitForm'

export default function BenefitFormPage() {
  const headersList = headers()
  const city = headersList.get('x-user-city') || 'Your Area'
  const region = headersList.get('x-user-region') || 'US'

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-4 pt-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Dynamic Social Proof */}
        <div className="mb-8 animate-fade-in-up flex justify-center">
          <div className="bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 flex items-center gap-3 shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Program Active in {city}, {region}
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center mb-6 tracking-tight max-w-4xl leading-tight mx-auto">
          Check Your Eligibility for <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 text-transparent bg-clip-text animate-pulse">2025 Restoration Benefits</span>
        </h1>

        <p className="text-slate-300 text-lg md:text-xl text-center mb-12 max-w-2xl leading-relaxed mx-auto">
          Verify your address in <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">{city}</span> to see if your property qualifies for state-approved storm restoration incentives.
        </p>

        <div className="w-full">
          <BenefitForm defaultCity={city} defaultState={region} />
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6">
          {/* Trust Badges */}
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trusted & Verified By</div>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-lg">
              <div className="text-white font-bold text-sm">🏛️ State Approved</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-lg">
              <div className="text-white font-bold text-sm">🔒 Secure & Private</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-lg">
              <div className="text-white font-bold text-sm">✓ BBB Accredited</div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-8 flex items-center gap-12 flex-wrap justify-center text-center">
            <div>
              <div className="text-3xl font-bold text-white">47,000+</div>
              <div className="text-sm text-slate-400 mt-1">Properties Verified</div>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div>
              <div className="text-3xl font-bold text-white">$2.8M+</div>
              <div className="text-sm text-slate-400 mt-1">Benefits Secured</div>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div>
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-sm text-slate-400 mt-1">Homeowner Rating</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}