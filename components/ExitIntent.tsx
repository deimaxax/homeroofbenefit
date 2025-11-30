// components/ExitIntent.tsx - Exit intent popup with quick capture form

'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Phone, ArrowRight, CheckCircle2, Clock, Users, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExitIntentProps {
  maxBenefit?: number
}

export default function ExitIntent({ maxBenefit = 18000 }: ExitIntentProps) {
  const [show, setShow] = useState(false)
  const [triggered, setTriggered] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Trigger popup function
  const triggerPopup = useCallback(() => {
    if (!triggered) {
      setShow(true)
      setTriggered(true)
    }
  }, [triggered])

  useEffect(() => {
    // === DESKTOP: Mouse leave detection ===
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        triggerPopup()
      }
    }

    // === MOBILE: Back button / scroll up aggressively ===
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // User scrolling UP aggressively from below fold
      if (currentScrollY < lastScrollY - 100 && lastScrollY > 300) {
        triggerPopup()
      }
      lastScrollY = currentScrollY
    }

    // === MOBILE: Visibility change (tab switch) ===
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User switching tabs - might not come back
        // We'll show popup when they return
      }
      if (document.visibilityState === 'visible' && !triggered) {
        // They came back! Show popup after small delay
        setTimeout(triggerPopup, 500)
      }
    }

    // Delay - 5 seconds
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('scroll', handleScroll, { passive: true })
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }, 25000)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [triggered, triggerPopup])



  // Phone formatting: (512) 555-1234
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter your name')
      return
    }
    
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    if (!consent) {
      setError('Please agree to be contacted to proceed')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: '', // Optional for exit intent
          source: 'exit_intent',
          consent: true,
          consent_ts: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => setShow(false), 4000)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (err) {
      setIsSubmitted(true)
      setTimeout(() => setShow(false), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 z-10 text-white/80 hover:text-white transition bg-black/20 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            {isSubmitted ? (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  Spot Secured! 🎉
                </h3>
                <p className="text-gray-600">
                  A benefit specialist will call you within <strong>2 hours</strong> to discuss your savings.
                </p>
                <p className="text-sm text-gray-400 mt-3">
                  Check your phone for a text confirmation
                </p>
              </div>
            ) : (
              /* Form State - HIGH CONVERTING */
              <>
                {/* Header - LOSS AVERSION HEAVY */}
                <div className="bg-gradient-to-br from-red-700 via-red-600 to-orange-500 text-white p-5 text-center relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-red-300 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}} />
                  </div>

                  <div className="relative z-10">
                    <p className="text-yellow-300 text-sm font-black uppercase tracking-wider mb-2 animate-pulse">
                      🚨 STOP! Don't Leave Money Behind
                    </p>
                    <h3 className="text-2xl md:text-3xl font-black mb-3">
                      You're About to Lose<br/>
                      <span className="text-yellow-300">Up to $18,425.50</span>
                    </h3>
                    <div className="bg-black/30 backdrop-blur rounded-lg px-4 py-2 inline-block">
                      <p className="text-white font-bold text-sm">
                        Your neighbor just claimed a roof replacement.
                      </p>
                    </div>
                  </div>
                </div>                {/* Urgency bar */}
                <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
                  <p className="text-xs text-amber-800 font-semibold flex items-center justify-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Only a few inspection slots left for today
                  </p>
                </div>

                {/* Form */}
                <div className="p-5">
                  <p className="text-center text-gray-700 mb-4 text-sm font-medium">
                    Get a <span className="text-green-600 font-bold">FREE callback</span> in under 2 hours:
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name field */}
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        setError('')
                      }}
                      className="w-full h-12 px-4 text-base rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition"
                    />
                    
                    {/* Phone field */}
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => {
                          setPhone(formatPhone(e.target.value))
                          setError('')
                        }}
                        className={`w-full h-12 pl-12 pr-4 text-base rounded-xl border-2 ${
                          error && error.includes('phone') ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        } focus:border-blue-500 focus:outline-none transition`}
                      />
                    </div>

                    {/* TCPA Consent */}
                    <label className="flex items-start gap-2 cursor-pointer bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked)
                          setError('')
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-[10px] text-gray-500 leading-relaxed">
                        I agree to receive calls/texts from Home Roof Program and partner contractors via automated technology. 
                        Consent not required for services. 
                        <a href="/privacy" target="_blank" className="underline text-blue-600 ml-0.5">Privacy</a> · 
                        <a href="/terms" target="_blank" className="underline text-blue-600 ml-0.5">Terms</a>
                      </span>
                    </label>
                    
                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 disabled:opacity-70 text-white font-black py-4 px-6 rounded-xl shadow-xl shadow-red-500/40 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] animate-pulse"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⏳
                          </motion.span>
                          Securing Your Spot...
                        </span>
                      ) : (
                        <>
                          🚨 YES! SAVE MY SPOT NOW
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                  
                  <button
                    onClick={() => setShow(false)}
                    className="w-full mt-3 text-xs text-gray-400 hover:text-gray-500 transition py-2"
                  >
                    No thanks, I'd rather pay $18,425.50+ out of pocket
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}