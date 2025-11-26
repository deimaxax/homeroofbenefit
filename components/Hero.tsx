import { headers } from 'next/headers'
import BenefitForm from '@/components/BenefitForm'

export default function Hero() {
  const headersList = headers()
  const city = headersList.get('x-user-city') || 'Your Area'
  const region = headersList.get('x-user-region') || 'US'

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
      
      {/* Dynamic Social Proof */}
      <div className="mb-8 animate-fade-in-up">
        <div className="bg-green-100/80 backdrop-blur-sm text-green-800 px-4 py-1.5 rounded-full text-sm font-medium border border-green-200 flex items-center gap-2 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Program Active in {city}, {region}
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 text-center mb-6 tracking-tight max-w-3xl leading-tight">
        Check Your Eligibility for <br className="hidden md:block" />
        <span className="text-blue-600">2025 Restoration Benefits</span>
      </h1>

      <p className="text-slate-500 text-lg md:text-xl text-center mb-10 max-w-2xl leading-relaxed">
        Verify your address in <span className="font-bold text-slate-700">{city}</span> to see if your property qualifies for state-approved storm restoration incentives.
      </p>

      <div className="w-full">
        <BenefitForm defaultCity={city} defaultState={region} />
      </div>

      <div className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        {/* Trust Badges / Logos */}
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Trusted By</div>
        {/* Placeholder for logos */}
      </div>

    </section>
  )
}
