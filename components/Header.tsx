'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShieldCheck, Lock } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#0B1120]/95 backdrop-blur-md border-slate-800 py-2 sm:py-3 shadow-lg' 
          : 'bg-[#0B1120]/90 backdrop-blur-sm border-white/5 py-2.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        
        {/* LEFT: AUTHORITY BRANDING */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
             <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-emerald-800 to-emerald-950 rounded border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
             </div>
             <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1120]"></div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-bold text-white text-xs sm:text-sm tracking-tight font-mono leading-none">
              HRP <span className="text-emerald-600 mx-0.5 sm:mx-1">{'///'}</span> PORTAL
            </span>
            <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-medium mt-0.5 sm:mt-1 hidden xs:block">
              Official Review System
            </span>
          </div>
        </Link>

        {/* RIGHT: SUBMISSION WINDOW INDICATOR */}
        <div className="flex items-center gap-2 sm:gap-6">
          
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <span className="hidden sm:inline">Submission Window:</span> Open
                </span>
             </div>
             <span className="text-[9px] text-slate-500 hidden sm:block">
                2025 Guidelines Active
             </span>
          </div>

          {/* Encryption Badge */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded px-3 py-1.5">
            <Lock className="w-3 h-3 text-slate-400" />
            <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold text-slate-300 uppercase">256-Bit SSL</span>
                <span className="text-[8px] text-slate-500 font-medium">ENCRYPTED</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-60"></div>
    </header>
  )
}