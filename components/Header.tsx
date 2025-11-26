'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white border-b border-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-12 sm:h-14 md:h-16 flex items-center justify-between">
        
        {/* Logo - Compact on mobile */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            <span className="bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">HB</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-900 transition-colors">Housing Benefit Check</div>
            <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              2025 Program Active
            </div>
          </div>
        </Link>

        {/* Right Side - Trust + CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Trust Indicators - Desktop */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Licensed Contractors</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span>256-bit SSL</span>
            </div>
          </div>

          {/* CTA Button - MOBILE OPTIMIZED - BIG TOUCH TARGET */}
          <Link 
            href="/benefitform"
            className="relative group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95 sm:hover:scale-105"
          >
            <span className="flex items-center gap-1">
              FREE Check
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {/* Pulse effect */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-yellow-400"></span>
            </span>
          </Link>
        </div>

      </div>
    </header>
  )
}