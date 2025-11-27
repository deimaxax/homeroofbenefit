'use client'

import { useState, useEffect } from 'react'

interface MobileCTAProps {
  spotsLeft?: number
}

export default function MobileCTA({ spotsLeft = 7 }: MobileCTAProps) {
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    // Find the form element
    const formElement = document.getElementById('eligibility-form')
    if (!formElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Hide CTA when form is visible, show when not visible
        entries.forEach((entry) => {
          setShowCTA(!entry.isIntersecting)
        })
      },
      {
        root: null,
        rootMargin: '-100px 0px 0px 0px', // Add some buffer
        threshold: 0.1
      }
    )

    observer.observe(formElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  if (!showCTA) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-red-700/50 z-40 shadow-2xl animate-slide-up">
      <div className="px-4 py-3">
        <a
          href="#eligibility-form"
          data-analytics-id="cta_sticky_mobile"
          className="block w-full text-center bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-red-500/30 transition-all"
        >
          CONFIRM MY $0$ PAYOUT ELIGIBILITY
        </a>
        <p className="text-center text-slate-400 text-[10px] mt-1.5 flex items-center justify-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
          </span>
          Only {spotsLeft} spots left today
        </p>
      </div>
    </div>
  )
}
