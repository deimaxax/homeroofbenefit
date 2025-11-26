// components/BenefitForm.tsx - HIGH CONVERSION (2 STEPS ONLY)

"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle2, Home, Building, Umbrella, AlertTriangle, 
  ArrowRight, ArrowLeft, Shield, Lock, Zap, Clock
} from 'lucide-react'
import AnalysisLoader from './AnalysisLoader'

interface BenefitFormProps {
  defaultState?: string
  defaultCity?: string
}

// Estimate range calculation (honest - based on typical claims)
const calculateEstimateRange = (issues: string[]): { min: number; max: number } => {
  const baseMin = 6500
  const baseMax = 12000
  const issueBonus = issues.length * 2000
  return { 
    min: baseMin + issueBonus, 
    max: Math.min(baseMax + issueBonus, 18000) 
  }
}

export default function BenefitForm({ defaultState, defaultCity }: BenefitFormProps) {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [propertyIssues, setPropertyIssues] = useState<string[]>([])
  
  // Lead capture state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', zipCode: '' })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ONLY 2 STEPS NOW! (was 4)
  const totalSteps = 2
  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => Math.max(1, s - 1))

  // Estimate range (honest)
  const estimateRange = useMemo(() => 
    calculateEstimateRange(propertyIssues), 
    [propertyIssues]
  )
  const benefitAmount = estimateRange.max

  // Formatted city name
  const displayCity = useMemo(() => {
    if (!defaultCity) return 'Your Area'
    return defaultCity.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }, [defaultCity])

  const toggleIssue = (issue: string) => {
    setPropertyIssues(prev => 
      prev.includes(issue) 
        ? prev.filter(i => i !== issue) 
        : [...prev, issue]
    )
  }

  const startAnalysis = () => setIsAnalyzing(true)
  const handleAnalysisComplete = () => {
    setIsAnalyzing(false)
    setIsEligible(true)
    setStep(3)
  }

  // Phone formatting
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  // ZIP formatting
  const formatZip = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 5)
  }

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name'
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (formData.zipCode.length !== 5) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code'
    }

    if (!consent) {
      newErrors.consent = 'You must agree to be contacted to proceed'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Collect attribution
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
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'USD',
        })
      }

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Roofing Benefit Form',
          content_category: 'Lead Generation',
          value: benefitAmount,
        })
      }

    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SUBMITTED STATE
  // ═══════════════════════════════════════════════════════════════
  if (isSubmitted) {
    return (
      <div className="w-full text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
        </motion.div>
        <h2 className="text-lg md:text-xl font-black text-gray-900 mb-2">
          Request Received!
        </h2>
        <p className="text-gray-600 mb-4 text-sm max-w-sm mx-auto">
          A licensed contractor will call you within <span className="font-bold">2 hours</span> (during business hours) at{' '}
          <span className="font-semibold text-gray-900">{formData.phone}</span>
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 max-w-xs mx-auto">
          <p className="text-xs text-blue-800">
            <span className="font-bold">📞 Next Step:</span> Answer the call from a local contractor to schedule your free roof inspection.
          </p>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // FINAL STEP – LEAD CAPTURE (HIGH CONVERTING!)
  // ═══════════════════════════════════════════════════════════════
  if (isEligible && step === 3) {
    return (
      <div className="w-full">
        {/* 🎉 URGENCY + VALUE CELEBRATION HEADER */}
        <div className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 text-white rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-center relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-yellow-300 rounded-full blur-2xl animate-pulse delay-300" />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-yellow-300 text-[10px] sm:text-xs uppercase tracking-wider font-black mb-0.5 sm:mb-1 animate-pulse">
                🎉 CONGRATS! 🎉
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-1 sm:mb-2">
                Pre-Qualified!
              </h2>
            </motion.div>            {/* BIG BENEFIT NUMBER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-white/10 backdrop-blur rounded-lg p-3 mb-2"
            >
              <p className="text-green-100 text-[10px] sm:text-xs mb-0.5 sm:mb-1">
                Estimated benefit:
              </p>
              <p className="text-3xl md:text-4xl font-black text-white">
                ${estimateRange.min.toLocaleString()} - ${estimateRange.max.toLocaleString()}
              </p>
              <p className="text-green-200 text-[10px] mt-1">
                Based on {propertyIssues.length > 0 ? propertyIssues.length : 'typical'} issue{propertyIssues.length !== 1 ? 's' : ''} reported • Final amount varies by inspection
              </p>
            </motion.div>

            {/* URGENCY NUDGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 text-yellow-200 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
              </span>
              <span className="font-semibold">Complete below to lock in your spot</span>
            </motion.div>
          </div>
        </div>

        {/* Lead Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-3"
          data-analytics-id="lead_capture_form"
        >
          {/* Name */}
          <div>
            <Input 
              placeholder="Full Name" 
              value={formData.name}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, name: e.target.value }))
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
              }}
              className={`h-12 sm:h-11 text-base rounded-lg ${
                errors.name 
                  ? 'border-2 border-red-500 bg-red-50' 
                  : 'border-2 border-gray-200 focus:border-emerald-500'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Input 
              placeholder="Phone Number" 
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))
                if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
              }}
              className={`h-12 sm:h-11 text-base rounded-lg ${
                errors.phone 
                  ? 'border-2 border-red-500 bg-red-50' 
                  : 'border-2 border-gray-200 focus:border-emerald-500'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* ZIP Code - SINGLE FIELD (Email removed for higher conversion) */}
          <div>
            <Input
              placeholder="ZIP Code"
              inputMode="numeric"
              autoComplete="postal-code"
              value={formData.zipCode}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, zipCode: formatZip(e.target.value) }))
                if (errors.zipCode) setErrors(prev => ({ ...prev, zipCode: '' }))
              }}
              className={`h-12 sm:h-11 text-lg rounded-lg text-center font-bold tracking-wider ${
                errors.zipCode
                  ? 'border-2 border-red-500 bg-red-50' 
                  : 'border-2 border-gray-200 focus:border-emerald-500'
              }`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.zipCode}
              </p>
            )}
          </div>          {/* TCPA Consent - COMPLIANT */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0 -mt-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked)
                    if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }))
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-600 leading-relaxed">
                By checking this box, I consent to receive calls and text messages from Housing Benefit Check and its 
                <a href="/partners" target="_blank" className="underline text-blue-600 mx-0.5">network of licensed contractors</a> 
                at the phone number provided, including via automated technology and prerecorded messages. 
                I understand this consent is not required to receive services. Message & data rates may apply. 
                View our <a href="/privacy" target="_blank" className="underline text-blue-600">Privacy Policy</a> and <a href="/terms" target="_blank" className="underline text-blue-600">Terms of Service</a>.
              </span>
            </label>
          </div>
          {errors.consent && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.consent}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 sm:h-14 text-base sm:text-lg font-black bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 disabled:opacity-70 rounded-xl shadow-xl shadow-red-500/40 active:scale-[0.98] transition-transform"
            data-analytics-id="submit_lead"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Securing...
              </span>
            ) : (
              <>
                🚨 GET FREE INSPECTION
                <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </Button>

          <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secure & private • No spam
          </p>
        </motion.form>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // ANALYZING
  // ═══════════════════════════════════════════════════════════════
  if (isAnalyzing) {
    return (
      <AnalysisLoader 
        onComplete={handleAnalysisComplete} 
        city={displayCity}
        state={defaultState}
      />
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // MAIN FORM STEPS (ONLY 2 NOW!)
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span>Step {step} of {totalSteps}</span>
          <span className="font-semibold text-emerald-600">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* ═══════════════════════════════════════════════════════════════
            STEP 1 – ROOF ISSUES (VALUE-FIRST!)
        ═══════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <motion.div 
            key="issues" 
            initial={{ opacity: 0, x: 15 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.15 }}
          >
            <h3 className="text-base md:text-lg font-black text-gray-900 text-center mb-1">
              What roof issues do you have?
            </h3>
            <p className="text-gray-500 text-center mb-4 text-xs">
              Select all that apply to increase your benefit estimate
            </p>
            
            <div className="space-y-2 mb-4">
              {[
                { id: 'storm-damage', icon: Umbrella, text: "Undetected Hail/Wind Damage", sub: "Silent Coverage Loss" },
                { id: 'old-roof', icon: Clock, text: "Manufacturer's Warranty EXPIRED", sub: "Aging or worn shingles" },
                { id: 'leaks', icon: AlertTriangle, text: "Attic Mold & Structural Rot", sub: "Family Health Risk" },
                { id: 'high-bills', icon: Zap, text: "Heating/Cooling Leaks", sub: "Throwing Cash Out the Window" }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center p-3 sm:p-3 border-2 rounded-xl cursor-pointer transition-all active:scale-[0.98] min-h-[52px] ${
                    propertyIssues.includes(item.id)
                      ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                      : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-center w-7 h-7 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0">
                    <input 
                      type="checkbox" 
                      checked={propertyIssues.includes(item.id)}
                      onChange={() => toggleIssue(item.id)}
                      className="w-5 h-5 sm:w-5 sm:h-5 text-emerald-600 rounded" 
                    />
                  </div>
                  <item.icon className={`w-5 h-5 mr-2 sm:mr-3 flex-shrink-0 ${
                    propertyIssues.includes(item.id) ? 'text-emerald-600' : 'text-slate-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">{item.text}</div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 truncate">{item.sub}</div>
                  </div>
                  {propertyIssues.includes(item.id) && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </label>
              ))}
            </div>

            {/* Dynamic estimate preview */}
            {propertyIssues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-center"
              >
                <p className="text-xs text-emerald-700 mb-1">Estimated benefit for {propertyIssues.length} issue{propertyIssues.length > 1 ? 's' : ''}:</p>
                <p className="text-xl font-black text-emerald-600">
                  ${estimateRange.min.toLocaleString()} - ${estimateRange.max.toLocaleString()}
                </p>
              </motion.div>
            )}

            <Button
              onClick={nextStep}
              disabled={propertyIssues.length === 0}
              className="w-full h-14 sm:h-12 text-base sm:text-base font-black bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 disabled:bg-gray-300 disabled:shadow-none rounded-xl shadow-lg shadow-red-500/40 active:scale-[0.98] transition-transform"
              data-analytics-id="form_step_1_next"
            >
              FIGHT THE INSURANCE COMPANY NOW →
            </Button>
            <p className="text-center text-[10px] text-gray-400 mt-2">
              Select at least one issue
            </p>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            STEP 2 – HOMEOWNER CONFIRMATION
        ═══════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <motion.div 
            key="owner" 
            initial={{ opacity: 0, x: 15 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.15 }}
          >
            <button onClick={prevStep} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs mb-2 min-h-[44px] -ml-2 px-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h3 className="text-lg sm:text-lg font-black text-gray-900 text-center mb-1">
              Do you own this home?
            </h3>
            <p className="text-gray-500 text-center mb-3 text-xs">
              Free inspections available for homeowners only
            </p>
            
            <div className="space-y-3">
              <button
                onClick={startAnalysis}
                className="w-full p-4 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-400 rounded-xl hover:border-red-500 hover:from-orange-100 hover:to-red-100 transition-all flex items-center gap-3 sm:gap-4 group shadow-lg min-h-[72px] active:scale-[0.98]"
                data-analytics-id="form_step_2_yes_owner"
              >
                <div className="w-12 h-12 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-300 flex-shrink-0">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">Yes, I Own It ✓</div>
                  <div className="text-[11px] sm:text-xs text-green-600 font-semibold">→ See my benefit</div>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-500 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
              
              <button 
                disabled 
                className="w-full p-3 sm:p-4 bg-gray-50 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed flex items-center gap-3 sm:gap-4 min-h-[64px]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-bold text-gray-500 text-sm sm:text-base">No, Renting</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Contact landlord</div>
                </div>
              </button>
            </div>

            {/* Trust badges inline */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                Licensed
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                Free
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                No obligation
              </span>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
