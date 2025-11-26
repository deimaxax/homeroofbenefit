'use client'

import { useState, useEffect, useMemo } from 'react'
import { Shield, Phone, CheckCircle2, Star } from 'lucide-react'

interface FomoCountdownProps {
  city: string
  state?: string
}

export default function FomoCountdown({ city, state = 'Your State' }: FomoCountdownProps) {
  const [isClient, setIsClient] = useState(false)
  const [slotsLeft, setSlotsLeft] = useState(7)

  // Format city for display
  const displayCity = useMemo(() => {
    if (!city || city === 'Your City') return 'your area'
    return city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }, [city])

  // Get current season-based message (TRUTHFUL)
  const getSeasonalMessage = () => {
    const now = new Date()
    const month = now.getMonth()
    if (month >= 2 && month <= 10) {
      return "Peak Season"
    } else {
      return "Limited Availability"
    }
  }

  // Initialize client state
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simulate realistic slot decrease (contractors have limited daily capacity)
  useEffect(() => {
    if (!isClient) return
    
    // Start with reasonable number based on time of day
    const hour = new Date().getHours()
    const baseSlots = hour < 12 ? 12 : hour < 17 ? 7 : 4
    setSlotsLeft(baseSlots)
    
    // Decrease slowly (realistic - contractors book up)
    const decreaseInterval = setInterval(() => {
      setSlotsLeft(prev => {
        if (prev <= 2) return 2 // Always show at least 2
        return Math.random() > 0.7 ? prev - 1 : prev
      })
    }, 45000)

    return () => clearInterval(decreaseInterval)
  }, [isClient])

  if (!isClient) return null

  return (
    <div className="space-y-3">
      
      {/* ═══════════════════════════════════════════════════════════════
          UNIFIED URGENCY BAR - Single elegant element (no rainbow vomit)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-3">
          
          {/* Left: Season + Slots */}
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <div className="relative flex-shrink-0">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            
            <div>
              <p className="text-sm font-bold text-white">
                {getSeasonalMessage()} — <span className="text-emerald-400">{slotsLeft} slots</span> left in {displayCity}
              </p>
              <p className="text-xs text-slate-400">
                Licensed contractors • Same-day scheduling available
              </p>
            </div>
          </div>
          
          {/* Right: Slot indicator bars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-5 rounded-full transition-all ${
                  i < Math.min(slotsLeft, 5) 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TRUST BADGES - Clean, monochrome style
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 font-medium shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Free</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 font-medium shadow-sm">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Licensed</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 font-medium shadow-sm">
          <Star className="w-3.5 h-3.5 text-emerald-600" />
          <span>Top Rated</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 font-medium shadow-sm">
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>No Obligation</span>
        </div>
      </div>

    </div>
  )
}