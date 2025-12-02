'use client'

import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'

const generateItems = () => {
  const actions = [
    { text: "ALLOWANCE RELEASED", color: "text-emerald-400" },
    { text: "INSPECTION AUTH", color: "text-blue-400" }, // Sutrumpinta mobiliam
    { text: "FILE VERIFIED", color: "text-slate-300" }
  ]
  
  const amounts = ["$18,420", "$21,150", "$16,890", "$24,005", "$19,300", "$28,750"]
  const locs = ["TX", "FL", "CO", "IL", "OH", "NC", "PA", "GA"]

  return Array.from({ length: 12 }).map((_, i) => { // Padidinau kiekį, kad nebūtų tarpų plačiuose ekranuose
    const action = actions[Math.floor(Math.random() * actions.length)]
    const amount = amounts[Math.floor(Math.random() * amounts.length)]
    const loc = locs[Math.floor(Math.random() * locs.length)]
    const time = Math.floor(Math.random() * 9) + 1 
    const id = Math.floor(Math.random() * 899) + 100 
    
    return {
      id: `REF-${id}`,
      action: action.text,
      color: action.color,
      // Mobile displays less text details but numbers are important
      detail: action.text.includes("RELEASED") ? amount : `Ref #${id}`, 
      loc: loc,
      time: `${time}m` // Sutrumpinta 'ago'
    }
  })
}

export default function LiveTicker() {
  const [items, setItems] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setItems(generateItems())
  }, [])

  if (!isClient) return null

  return (
    <div className="w-full bg-[#050a14] border-y border-slate-800/50 py-2 sm:py-2.5 overflow-hidden relative z-20 select-none">
      
      {/* 1. LABEL: Mobile = Icon Only (Sutaupo 60px vietos) */}
      <div className="absolute left-0 top-0 bottom-0 bg-[#050a14] z-30 px-3 sm:px-4 flex items-center justify-center border-r border-slate-800 shadow-[10px_0_20px_#050a14]">
        <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                Live Feed
            </span>
        </div>
      </div>

      {/* 2. GRADIENTAI: Pritaikyti pagal etiketės plotį */}
      {/* Mobile: Gradientas prasideda nuo 40px (icon width). Desktop: nuo 100px */}
      <div className="absolute inset-y-0 left-10 sm:left-24 w-8 sm:w-16 bg-gradient-to-r from-[#050a14] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#050a14] to-transparent z-20 pointer-events-none"></div>
      
      {/* 3. CONTENT: Sumažinti tarpai ir šriftai */}
      <div className="flex whitespace-nowrap animate-marquee items-center will-change-transform">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center mx-4 sm:mx-8">
            <span className="font-mono text-[9px] text-slate-600 mr-1.5 opacity-75">
              [{item.time}]
            </span>
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mr-1.5 ${item.color}`}>
              {item.action}:
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-200 font-medium">
              {item.detail} <span className="text-slate-500">({item.loc})</span>
            </span>
            <span className="ml-4 sm:ml-8 text-slate-800 text-[8px] opacity-50">{'///'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}