// components/ExitIntent.tsx - AUTHORITY / SYSTEM ALERT STYLE

'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Phone, ArrowRight, Save, AlertTriangle, FileWarning, Lock } from 'lucide-react'
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
  
  // Random System ID for authority
  const fileId = `TMP-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`

  const triggerPopup = useCallback(() => {
    // Only trigger if not already triggered and not submitted
    const isLeadsSubmitted = localStorage.getItem('lead_submitted')
    if (!triggered && !isLeadsSubmitted) {
      setShow(true)
      setTriggered(true)
    }
  }, [triggered])

  useEffect(() => {
    // 1. DESKTOP: Mouse leave (Intent to close tab)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerPopup()
      }
    }

    // 2. MOBILE: Scroll Speed / Direction Change
    let lastScrollY = window.scrollY
    let scrollSpeed = 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollSpeed = currentScrollY - lastScrollY
      
      // If user scrolls UP fast (trying to reach URL bar)
      if (scrollSpeed < -50 && currentScrollY < 200) {
        triggerPopup()
      }
      lastScrollY = currentScrollY
    }

    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 5000) // Delay trigger activation to avoid instant annoyance

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [triggered, triggerPopup])

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!name.trim()) {
      setError('Name required for file save')
      return
    }
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      setError('Valid mobile number required')
      return
    }
    if (!consent) {
      setError('Confirmation required')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API
      await new Promise(r => setTimeout(r, 1000))
      
      localStorage.setItem('lead_submitted', 'true')
      setIsSubmitted(true)
      setTimeout(() => setShow(false), 3500)
    } catch (err) {
      setError('System error. Try again.')
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative ring-1 ring-white/10"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 z-10 text-slate-500 hover:text-white transition bg-slate-800/50 hover:bg-slate-700 rounded-full p-1.5"
            >
              <X className="w-4 h-4" />
            </button>
            
            {isSubmitted ? (
              /* STATE: SAVED */
              <div className="p-8 text-center bg-[#0f172a]">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <Save className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">File {fileId} Saved</h3>
                <p className="text-slate-400 text-sm">
                  Your eligibility data has been secured. Our system will contact you shortly to complete verification.
                </p>
              </div>
            ) : (
              /* STATE: FORM (System Alert) */
              <>
                {/* Header: "Session Halted" */}
                <div className="bg-amber-900/20 border-b border-amber-500/20 p-5 flex items-start gap-4">
                   <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <FileWarning className="w-6 h-6 text-amber-500" />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        WAIT! Session Incomplete
                      </h3>
                      <p className="text-xs text-amber-400/80 font-mono mt-1">
                        PENDING FILE: <span className="text-amber-400">{fileId}</span>
                      </p>
                   </div>
                </div>

                <div className="p-6 bg-[#0f172a]">
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    You are navigating away while your <span className="text-emerald-400 font-semibold">Policy Allowance Check</span> is pending. This data will be permanently deleted in 60 seconds.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                       <input
                        type="text"
                        placeholder="Property Owner Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          setError('')
                        }}
                        className="w-full h-11 bg-slate-900 border border-slate-700 rounded-lg px-4 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => {
                          setPhone(formatPhone(e.target.value))
                          setError('')
                        }}
                        className="w-full h-11 bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                      />
                    </div>

                    {/* Minimal Consent */}
                    <label className="flex items-start gap-2 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked)
                          setError('')
                        }}
                        className="mt-0.5 w-3.5 h-3.5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-offset-slate-900"
                      />
                      <span className="text-[10px] text-slate-500 leading-tight">
                        I authorize saving this file and receiving automated status updates via text/call. Reply STOP to cancel.
                      </span>
                    </label>
                    
                    {error && (
                      <div className="flex items-center gap-1.5 text-red-400 text-xs justify-center py-1">
                         <AlertTriangle className="w-3 h-3" /> {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      {isSubmitting ? (
                        <span className="text-sm">Saving...</span>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> SAVE MY ELIGIBILITY
                        </>
                      )}
                    </button>
                  </form>
                  
                  <button
                    onClick={() => setShow(false)}
                    className="w-full mt-4 text-[10px] text-slate-600 hover:text-red-400 transition-colors flex items-center justify-center gap-1"
                  >
                    <X className="w-3 h-3" /> Delete my file and forfeit potential allowance
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