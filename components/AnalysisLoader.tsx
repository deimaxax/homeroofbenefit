// components/AnalysisLoader.tsx  ← PATOBULINTA VERSIJA (MAX CONVERSION)

"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Shield, Users, Zap } from 'lucide-react'

interface AnalysisLoaderProps {
  onComplete: () => void
  city?: string
  state?: string
}

const steps = [
  "Verifying address in federal database...",
  "Analyzing storm damage records (2023–2025)...",
  "Checking property eligibility criteria...",
  "Calculating maximum benefit amount..."
]

// Fake FOMO vardai
const fakeNames = ["Michael", "Sarah", "David", "Jennifer", "Robert", "Lisa", "James", "Maria", "John", "Emily"]
const fakeCities = ["Houston", "Dallas", "Austin", "Phoenix", "Denver", "Atlanta", "Miami", "Orlando", "Tampa", "Charlotte"]

export default function AnalysisLoader({ onComplete, city, state }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [fomoMessage, setFomoMessage] = useState<string | null>(null)

  // Personalizuotas pavadinimas
  const locationText = useMemo(() => {
    if (city && state) return `${city}, ${state}`
    if (state) return state
    return "Your Area"
  }, [city, state])

  // Žingsniai – 900ms (greičiau!)
  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 900)
      return () => clearTimeout(timer)
    } else {
      setTimeout(onComplete, 800)
    }
  }, [currentStep, onComplete])

  // FOMO popup kas 2 sekundes
  useEffect(() => {
    const showFomo = () => {
      const name = fakeNames[Math.floor(Math.random() * fakeNames.length)]
      const fomoCity = city || fakeCities[Math.floor(Math.random() * fakeCities.length)]
      setFomoMessage(`${name} from ${fomoCity} just qualified!`)
      setTimeout(() => setFomoMessage(null), 2500)
    }

    const timer = setTimeout(showFomo, 1500)
    return () => clearTimeout(timer)
  }, [city])

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="w-full max-w-2xl mx-auto py-4 md:py-8">
      
      {/* FOMO Popup – viršuje */}
      <AnimatePresence>
        {fomoMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs md:text-base font-bold"
          >
            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />
            {fomoMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header su personalizacija */}
      <div className="mb-4 md:mb-8 text-center">
        <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
          <Shield className="w-5 h-5 md:w-8 md:h-8 text-blue-700" />
          <span className="text-xs md:text-sm font-bold text-blue-700 uppercase tracking-wide">
            Secure Analysis
          </span>
        </div>
        <h2 className="text-xl md:text-3xl font-black text-blue-900 mb-1 md:mb-2">
          Analyzing Your Eligibility
        </h2>
        <p className="text-sm md:text-lg text-slate-600 font-semibold">
          📍 {locationText}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 md:mb-8">
        <div className="relative h-7 md:h-10 bg-gray-200 rounded-full overflow-hidden border-3 md:border-4 border-gray-300 shadow-inner">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg md:text-2xl font-black text-white drop-shadow-md">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Žingsniai */}
      <div className="space-y-2.5 md:space-y-4">
        {steps.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: index * 0.15, duration: 0.3 }
            }}
            className={`flex items-start gap-2 md:gap-3 p-2.5 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 ${
              index < currentStep 
                ? 'bg-green-50 border-green-300' 
                : index === currentStep 
                  ? 'bg-blue-50 border-blue-400 shadow-md' 
                  : 'bg-gray-50 border-gray-200'
            }`}
          >
            {/* Ikona */}
            <div className="flex-shrink-0 mt-0.5">
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 text-green-600" />
                </motion.div>
              ) : index === currentStep ? (
                <Loader2 className="w-5 h-5 md:w-8 md:h-8 text-blue-600 animate-spin" />
              ) : (
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-full border-2 md:border-3 border-gray-300 bg-gray-100" />
              )}
            </div>

            {/* Tekstas */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs md:text-base font-bold leading-tight md:leading-normal transition-colors duration-300 ${
                index < currentStep ? 'text-green-700' : 
                index === currentStep ? 'text-blue-800' : 
                'text-gray-400'
              }`}>
                {text}
              </p>
              {index < currentStep && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] md:text-sm text-green-600 font-semibold"
                >
                  ✓ Complete
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pabaigos žinutė */}
      <AnimatePresence>
        {currentStep === steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 md:mt-8"
          >
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-green-100 text-green-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-base">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
              Analysis Complete – Loading Results...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust indicator apačioje */}
      <div className="mt-4 md:mt-8 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-slate-500">
        <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span><strong>2,847</strong> homeowners checked today</span>
      </div>
    </div>
  )
}