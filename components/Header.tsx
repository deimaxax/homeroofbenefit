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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        
        {/* Logo - Premium Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all">
            <span className="text-white font-black text-base">HBC</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-slate-900 text-base tracking-tight">Housing</span>
            <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-wider -mt-1">Benefit Check</span>
          </div>
        </Link>

        {/* Right Side - Minimal */}
        <div className="flex items-center gap-6">
          
          {/* Phone - Desktop only */}
          <a 
            href="tel:+18005551234" 
            className="hidden md:block text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            
          </a>

          {/* CTA Button - Clean */}

        </div>

      </div>
    </header>
  )
}