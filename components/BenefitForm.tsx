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
  const baseMin = 8700
  const baseMax = 16500
  const issueBonus = issues.length * 2500
  return { 
    min: baseMin + issueBonus, 
    max: Math.min(baseMax + issueBonus, 23500) 
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
  const [showError, setShowError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const totalSteps = 2
  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => Math.max(1, s - 1))

  // LIVE COUNTER - Social proof
  const [recentClaim, setRecentClaim] = useState('')
  
  useEffect(() => {
    // Fake recent claims for social proof
    const names = ['Michael R.', 'Sarah T.', 'James L.', 'Jennifer M.', 'Robert K.', 'Lisa H.']
    const amounts = ['$15,400', '$19,200', '$18,800', '$18,500', '$16,300', '$21,900']
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
    // Clear error kada user pasirenka
    if (showError) setShowError(false)
  }

  const handleNextStep = () => {
    if (propertyIssues.length === 0) {
      // Shake + error
      setIsShaking(true)
      setShowError(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    setShowError(false)
    nextStep()
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
        <h2 className="text-xl font-bold text-slate-900 mb-2">SUCCESS! Your Property is Pre-Qualified.</h2>
        <p className="text-slate-600 text-sm mb-4">
          A Senior Claims Specialist is reviewing your file RIGHT NOW to confirm your potential payout.
        </p>
        <p className="text-xs text-slate-400">You will receive a call from in a few minutes.</p>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // LEAD CAPTURE (Step 3)
  // ═══════════════════════════════════════════════════════════════
  if (isEligible && step === 3) {
    return (
      <div className="w-full">
        {/* Progress Bar - 85% Complete */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-slate-700">Pending Final Verification...</p>
            <span className="text-xs font-semibold text-slate-500">85%</span>
          </div>
          <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              {/* Completed 85% */}
              <div className="w-[85%] bg-gradient-to-r from-emerald-500 to-teal-600" />
              {/* Pulsing final 15% */}
              <div className="w-[15%] bg-amber-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Success Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            You Pre-Qualify!
          </div>
          
          {/* Benefit Amount - Hero */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-2xl p-6 shadow-xl shadow-emerald-600/20">
            <p className="text-sm opacity-90 mb-1">Your Estimated Benefit</p>
            <p className="text-4xl sm:text-5xl font-black">
              ${estimateRange.min.toLocaleString()} – ${estimateRange.max.toLocaleString()}
            </p>
            <p className="text-emerald-100 text-sm mt-2">in roof restoration coverage</p>
          </div>
        </div>

        {/* Urgency Badge - Inline */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-sm text-amber-700 font-medium">
            Only <span className="font-bold">{spotsLeft} spots</span> left this week
          </span>
        </div>

        {/* Clean Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input 
              placeholder="Full Name" 
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }))
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
              }}
              className={`h-14 text-base bg-white rounded-xl ${errors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <p className="text-xs text-slate-600 font-medium mb-2"></p>
            <Input 
              placeholder="Mobile Number (For Eligibility Report)" 
              type="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
              }}
              className={`h-14 text-base bg-white rounded-xl ${errors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'}`}
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
              className={`h-14 text-base bg-white rounded-xl ${errors.zipCode ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'}`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>

          {/* TCPA Consent - Cleaner */}
          <label className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${
            consent ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}>
            <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              consent ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'
            }`}>
              {consent && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </div>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }))
              }}
              className="sr-only"
            />
            <span className="text-[9.5px] text-slate-400 leading-relaxed">
              I agree to receive calls/texts from Housing Benefit Check and 
              <a href="/partners" className="underline mx-0.5 hover:text-slate-700">partners</a> 
              at this number. Consent not required to purchase. 
              <a href="/privacy" className="underline mx-0.5 hover:text-slate-700">Privacy</a> • 
              <a href="/terms" className="underline mx-0.5 hover:text-slate-700">Terms</a>
            </span>
          </label>
          {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Confirming...
              </span>
            ) : (
              <>Unlock My Claim Estimate <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          {/* Trust footer - minimal */}
          <div className="flex items-center justify-center gap-5 pt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Secure
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Free
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 15min response
            </span>
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
      {/* Premium Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>1</div>
          <div className={`w-12 h-1 rounded-full transition-all ${step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>2</div>
        </div>
        <span className="text-xs text-slate-400 font-medium">Step {step} of 2</span>
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
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Does Insurance Owe You a New Roof?
            </h3>
            <p className="text-slate-500 text-sm mb-5">Select all that apply to your home</p>
            
            <div className="space-y-2.5 mb-5">
              {[
                { id: 'storm-damage', text: "Storm or hail damage", icon: "⛈️", popular: true },
                { id: 'old-roof', text: "Roof is 10+ years old", icon: "🏠" },
                { id: 'leaks', text: "Leaks or water stains", icon: "💧" },
                { id: 'high-bills', text: "High energy bills", icon: "⚡" }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    propertyIssues.includes(item.id)
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={propertyIssues.includes(item.id)}
                    onChange={() => toggleIssue(item.id)}
                    className="sr-only" 
                  />
                  <span className="text-xl">{item.icon}</span>
                  <span className={`font-semibold flex-1 ${propertyIssues.includes(item.id) ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {item.text}
                  </span>
                  {'popular' in item && item.popular && !propertyIssues.includes(item.id) && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold uppercase">Most Common</span>
                  )}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    propertyIssues.includes(item.id)
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-slate-300'
                  }`}>
                    {propertyIssues.includes(item.id) && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* Live Estimate Card */}
            <div className={`rounded-2xl p-5 mb-5 text-center transition-all ${
              propertyIssues.length > 0 
                ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {propertyIssues.length > 0 ? (
                <>
                  <p className="text-sm opacity-90 mb-1">Your estimated benefit</p>
                  <p className="text-3xl sm:text-4xl font-black">${estimateRange.min.toLocaleString()} – ${estimateRange.max.toLocaleString()}</p>
                  <p className="text-xs opacity-75 mt-2">Based on {propertyIssues.length} issue{propertyIssues.length > 1 ? 's' : ''} selected</p>
                </>
              ) : (
                <p className="text-sm py-2">TAP ONE TO REVEAL PAYOUT</p>
              )}
            </div>

            {showError && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-red-600 text-sm font-semibold">⚠️ Please select at least one issue above</p>
              </div>
            )}

            <button
              onClick={handleNextStep}
              className={`w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 ${
                isShaking ? 'animate-shake' : ''
              }`}
            >
              CONFIRM $0 PAYOUT <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
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
            <button onClick={prevStep} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-sm mb-5 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {/* Value reminder - compact */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mb-5 text-center">
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Your Potential Benefit</p>
              <p className="text-2xl font-black text-emerald-700">${estimateRange.min.toLocaleString()} – ${estimateRange.max.toLocaleString()}</p>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Do you own your home?</h3>
            <p className="text-slate-500 text-sm mb-5">This program is exclusively for homeowners</p>
            
            <div className="space-y-3">
              <button
                onClick={startAnalysis}
                className="w-full p-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all text-left shadow-lg shadow-emerald-600/25 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg block">Yes, I own my home</span>
                    <span className="text-sm text-emerald-100 mt-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Proceed to Final Step
                    </span>
                  </div>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button disabled className="w-full p-4 bg-slate-100 text-slate-400 rounded-xl cursor-not-allowed text-left">
                <span className="font-medium">No, I'm renting</span>
                <span className="block text-xs mt-0.5">Program is for homeowners only</span>
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-5 mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Licensed</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>2 min</span>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
