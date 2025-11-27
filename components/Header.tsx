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
        
        {/* Logo - Clean & Simple */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HBC</span>
          </div>
          <span className="hidden sm:block font-semibold text-slate-900">+</span>
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