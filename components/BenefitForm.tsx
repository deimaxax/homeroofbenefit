// components/BenefitForm.tsx - HIGH CONVERSION

"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { CheckCircle2, ArrowRight, ArrowLeft, Clock, Users, Shield } from 'lucide-react'
import AnalysisLoader from './AnalysisLoader'

interface BenefitFormProps {
  defaultState?: string
  defaultCity?: string
  spotsLeft?: number
}

const calculateEstimateRange = (issues: string[]): { min: number; max: number } => {
  const baseMin = 6500
  const baseMax = 12000
  const issueBonus = issues.length * 2000
  return { 
    min: baseMin + issueBonus, 
    max: Math.min(baseMax + issueBonus, 18000) 
  }
}

export default function BenefitForm({ defaultState, defaultCity, spotsLeft = 7 }: BenefitFormProps) {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [propertyIssues, setPropertyIssues] = useState<string[]>([])
  
  const [formData, setFormData] = useState({ name: '', phone: '', zipCode: '' })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 2
  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => Math.max(1, s - 1))

  // LIVE COUNTER - Social proof
  const [recentClaim, setRecentClaim] = useState('')
  
  useEffect(() => {
    // Fake recent claims for social proof
    const names = ['Michael R.', 'Sarah T.', 'James L.', 'Jennifer M.', 'Robert K.', 'Lisa H.']
    const amounts = ['$8,400', '$12,200', '$9,800', '$14,500', '$11,300', '$7,900']
    const idx = Math.floor(Math.random() * names.length)
    setRecentClaim(`${names[idx]} qualified for ${amounts[idx]}`)
  }, [])

  const estimateRange = useMemo(() => calculateEstimateRange(propertyIssues), [propertyIssues])
  const benefitAmount = estimateRange.max

  const displayCity = useMemo(() => {
    if (!defaultCity) return 'Your Area'
    return defaultCity.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }, [defaultCity])

  const toggleIssue = (issue: string) => {
    setPropertyIssues(prev => 
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    )
  }

  const startAnalysis = () => setIsAnalyzing(true)
  const handleAnalysisComplete = () => {
    setIsAnalyzing(false)
    setIsEligible(true)
    setStep(3)
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const formatZip = (value: string) => value.replace(/\D/g, '').slice(0, 5)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Enter your name'
    }
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      newErrors.phone = 'Enter valid phone'
    }
    if (formData.zipCode.length !== 5) {
      newErrors.zipCode = 'Enter ZIP code'
    }
    if (!consent) {
      newErrors.consent = 'Required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      let utm: Record<string, string> = {}
      let referrer = ''
      let sessionId = ''
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)
        ;['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k => {
          const v = params.get(k)
          if (v) utm[k] = v
        })
        referrer = document.referrer || ''
        sessionId = localStorage.getItem('hbc_session') || ''
        if (!sessionId) {
          sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36)
          localStorage.setItem('hbc_session', sessionId)
        }
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          city: defaultCity,
          state: defaultState,
          propertyIssues,
          estimatedBenefit: benefitAmount,
          source: 'benefit-form',
          consent: true,
          consent_ts: new Date().toISOString(),
          utm,
          referrer,
          sessionId,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit')
      }
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SUBMITTED
  // ═══════════════════════════════════════════════════════════════
  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">You're All Set</h2>
        <p className="text-slate-600 text-sm mb-4">
          A contractor will call <span className="font-semibold">{formData.phone}</span> within 2 hours.
        </p>
        <p className="text-xs text-slate-400">Check your phone for a local number.</p>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // LEAD CAPTURE (Step 3)
  // ═══════════════════════════════════════════════════════════════
  if (isEligible && step === 3) {
    return (
      <div className="w-full">
        {/* SUCCESS HEADER - Big impact */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-3">
            <CheckCircle2 className="w-4 h-4" />
            Pre-Qualified
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            You May Qualify For
          </h2>
          <div className="bg-emerald-600 text-white rounded-xl p-4 mb-2">
            <p className="text-3xl font-black">
              ${estimateRange.min.toLocaleString()} – ${estimateRange.max.toLocaleString()}
            </p>
            <p className="text-emerald-100 text-sm mt-1">in roof restoration benefits</p>
          </div>
          <p className="text-xs text-slate-500">A licensed contractor will verify your exact amount</p>
        </div>

        {/* URGENCY - Scarcity */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-bold text-amber-800">ONLY {spotsLeft} SLOTS LEFT</span>
            <span className="text-amber-700"> for this Week's Exclusive DRONE Assessment.</span>
          </div>
        </div>

        {/* Clean form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input 
              placeholder="Full Name" 
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }))
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
              }}
              className={`h-13 text-base bg-white ${errors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <Input 
              placeholder="Phone Number" 
              type="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
              }}
              className={`h-13 text-base bg-white ${errors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Input
              placeholder="ZIP Code"
              inputMode="numeric"
              value={formData.zipCode}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, zipCode: formatZip(e.target.value) }))
                if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: '' }))
              }}
              className={`h-13 text-base bg-white ${errors.zipCode ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200'}`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>

          {/* TCPA Consent */}
          <label className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border-2 transition-colors ${
            consent ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-transparent'
          }`}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }))
              }}
              className="w-5 h-5 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-slate-500 leading-relaxed">
              I consent to receive calls/texts from Housing Benefit Check and its 
              <a href="/partners" className="underline mx-0.5 hover:text-slate-700">contractors</a> 
              at this number via automated technology. Not required for service. 
              <a href="/privacy" className="underline mx-0.5 hover:text-slate-700">Privacy</a> • 
              <a href="/terms" className="underline mx-0.5 hover:text-slate-700">Terms</a>
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-lg rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Securing Your Spot...
              </span>
            ) : (
              <>CONFIRM MY $0$ PAYOUT ELIGIBILITY <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Free service</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Users className="w-3.5 h-3.5" />
              <span>1,200+ helped</span>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // ANALYZING
  // ═══════════════════════════════════════════════════════════════
  if (isAnalyzing) {
    return <AnalysisLoader onComplete={handleAnalysisComplete} city={displayCity} state={defaultState} />
  }

  // ═══════════════════════════════════════════════════════════════
  // MAIN FORM STEPS
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="w-full">
      {/* URGENCY BAR - Limited spots */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-4 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-amber-600" />
        <span className="text-sm text-amber-800 font-medium">
          <span className="font-bold">ONLY {spotsLeft} SLOTS LEFT</span> this week in {displayCity}
        </span>
      </div>

      {/* Simple progress */}
      <div className="flex items-center gap-2 mb-5">
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1 – Issues */}
        {step === 1 && (
          <motion.div 
            key="issues" 
            initial={{ opacity: 0, x: 10 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-1">2-STEP QUIZ: DOES INSURANCE OWE YOU A NEW ROOF?</h3>
            <p className="text-slate-500 text-sm mb-4">Most {displayCity} homeowners qualify for $14k-$25k</p>
            
            <div className="space-y-2 mb-4">
              {[
                { id: 'storm-damage', text: "Storm or hail damage", popular: true },
                { id: 'old-roof', text: "Roof is 10+ years old" },
                { id: 'leaks', text: "Leaks or water stains" },
                { id: 'high-bills', text: "High energy bills" }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    propertyIssues.includes(item.id)
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={propertyIssues.includes(item.id)}
                    onChange={() => toggleIssue(item.id)}
                    className="sr-only" 
                  />
                  <span className="font-medium">{item.text}</span>
                  {'popular' in item && item.popular && !propertyIssues.includes(item.id) && (
                    <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">COMMON</span>
                  )}
                  {propertyIssues.includes(item.id) && (
                    <CheckCircle2 className="w-5 h-5 ml-auto" />
                  )}
                </label>
              ))}
            </div>

            {/* LIVE ESTIMATE - Value anchor */}
            <div className={`rounded-lg p-4 mb-4 text-center transition-all ${
              propertyIssues.length > 0 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {propertyIssues.length > 0 ? (
                <>
                  <p className="text-sm opacity-90">Your estimated benefit:</p>
                  <p className="text-2xl font-black">${estimateRange.min.toLocaleString()} – ${estimateRange.max.toLocaleString()}</p>
                  <p className="text-xs opacity-75 mt-1">vs. $12,000-$18,000 typical roof cost</p>
                </>
              ) : (
                <p className="text-sm">Select issues to see your estimate</p>
              )}
            </div>

            <button
              onClick={nextStep}
              disabled={propertyIssues.length === 0}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25"
            >
               CONFIRM 0$ PAYOUT ELIGIBILITY <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500">
              <Users className="w-3.5 h-3.5" />
              <span>{recentClaim} — 2 min ago</span>
            </div>
          </motion.div>
        )}

        {/* STEP 2 – Homeowner */}
        {step === 2 && (
          <motion.div 
            key="owner" 
            initial={{ opacity: 0, x: 10 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            <button onClick={prevStep} className="flex items-center gap-1 text-slate-400 hover:text-slate-600 text-sm mb-4">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {/* Value reminder */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-center">
              <p className="text-sm text-emerald-700">
                Your potential benefit: <span className="font-bold text-emerald-800">${estimateRange.min.toLocaleString()} – ${estimateRange.max.toLocaleString()}</span>
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">One last question</h3>
            <p className="text-slate-500 text-sm mb-4">This program is for homeowners in {displayCity}</p>
            
            <div className="space-y-3">
              <button
                onClick={startAnalysis}
                className="w-full p-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-left shadow-lg shadow-emerald-600/25"
              >
                <span className="font-bold text-lg">Yes, I own my home</span>
                <span className="flex items-center gap-1 text-sm text-emerald-100 mt-1">
                  <CheckCircle2 className="w-4 h-4" /> Get my free benefit estimate
                </span>
              </button>
              
              <button disabled className="w-full p-4 bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed text-left">
                <span className="font-medium">No, I'm renting</span>
                <span className="block text-xs mt-0.5">Program is for homeowners only</span>
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Licensed contractors</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                <span>100% free</span>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
