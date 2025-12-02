// components/MobileCTA.tsx

'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, AlertTriangle } from 'lucide-react'

export default function MobileCTA({ spotsLeft }: { spotsLeft: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Rodyti tik tada, kai vartotojas prascrolina Hero sekciją (pvz., 400px)
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 450)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#0B1120] via-[#0B1120] to-transparent pb-6 pt-8 animate-in slide-in-from-bottom-10 duration-300">
      
      {/* Urgency Badge virš mygtuko */}
      <div className="flex justify-center mb-2">
         <div className="bg-amber-500/10 border border-amber-500/20 backdrop-blur-md px-3 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide">
                Deadline Approaching
            </span>
         </div>
      </div>

      <button 
        onClick={() => {
          document.getElementById('eligibility-form')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-between px-6 border-t border-white/10 active:scale-[0.98] transition-transform"
      >
        <span className="flex flex-col items-start leading-none">
            <span className="text-[10px] text-emerald-200 uppercase font-medium mb-1">Status: Pending</span>
            <span className="text-lg tracking-wide">CHECK ELIGIBILITY</span>
        </span>
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  )
}