'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Zap } from 'lucide-react'

export default function UrgencyBar() {
  const [spotsLeft, setSpotsLeft] = useState(12)
  const [pulsing, setPulsing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsing(true)
      setSpotsLeft(prev => Math.max(1, prev - Math.floor(Math.random() * 3)))
      setTimeout(() => setPulsing(false), 500)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-4 shadow-2xl border-b-4 border-red-800">
      {/* Animated background wave */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 animate-pulse">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <span className="font-black text-lg md:text-xl">⚡ LIMITED TIME</span>
          </div>

          <span className="hidden md:inline text-white/80">•</span>

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <span className={`font-black text-xl md:text-2xl transition-all duration-500 ${
              pulsing ? 'scale-110 text-yellow-200' : 'text-white'
            }`}>
              ONLY {spotsLeft} ASSESSMENT SPOTS LEFT
            </span>
          </div>

          <span className="hidden md:inline text-white/80">•</span>

          <div className="hidden md:flex items-center gap-2 text-yellow-200 font-black text-lg">
            🔥 2-Hour Decision Window
          </div>
        </div>

        {/* Subtext */}
        <div className="text-center text-sm md:text-base text-white/90 font-semibold mt-2">
          Remaining availability: <span className="font-black text-yellow-200">{spotsLeft} assessments</span> before waitlist
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse"></div>
    </div>
  )
}
