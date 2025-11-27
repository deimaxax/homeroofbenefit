'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      }
      
      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
      visible ? 'top-0' : '-top-20'
    } ${
      scrolled 
        ? 'bg-white shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        
        {/* Logo - Premium Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/25 group-hover:shadow-xl group-hover:shadow-emerald-600/35 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-black text-base sm:text-lg tracking-tight">HBC</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[7px] font-black text-white">✓</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 text-sm sm:text-base tracking-tight leading-tight">Housing</span>
            <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold uppercase tracking-wider leading-tight">Benefit Check</span>
          </div>
        </Link>

        {/* Right Side - Trust Badges */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Google Reviews Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-amber-500 text-xs sm:text-sm">★</span>
                <span className="text-slate-900 font-bold text-xs sm:text-sm">4.9</span>
              </div>
              <span className="text-slate-500 text-[8px] sm:text-[10px] leading-tight hidden sm:block">120+ Reviews</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-6 sm:h-8 bg-slate-200"></div>

          {/* BBB Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#005A8C] rounded flex items-center justify-center">
              <span className="text-white font-black text-[8px] sm:text-[10px] leading-none">BBB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-bold text-xs sm:text-sm">A+</span>
              <span className="text-slate-500 text-[8px] sm:text-[10px] leading-tight hidden sm:block">Accredited</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  )
}