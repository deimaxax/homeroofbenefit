// components/AnalysisLoader.tsx - AUTHORITY GRADE (Server Terminal Style)

"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, ShieldCheck, Server, Database, Lock } from 'lucide-react'

interface AnalysisLoaderProps {
  onComplete: () => void
  city?: string
  state?: string
}

const steps = [
  { id: 1, text: "Authenticating secure session...", icon: Lock },
  { id: 2, text: "Querying National Weather Service (NOAA) database...", icon: Database },
  { id: 3, text: "Cross-referencing regional policy allowances...", icon: Server },
  { id: 4, text: "Generating eligibility report...", icon: ShieldCheck }
]

export default function AnalysisLoader({ onComplete, city, state }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  // SYSTEM LOGS - Tai sukuria "realaus darbo" iliuziją
  useEffect(() => {
    const randomLogs = [
      `> TLS 1.3 Handshake established...`,
      `> GET /api/geo-data/${city?.toLowerCase() || 'local'} [200 OK]`,
      `> Analyzing hail patterns (2023-2025)...`,
      `> Wind velocity data: MATCH FOUND`,
      `> Carrier coverage maps: UPDATED`,
      `> Calculating deductibles...`,
      `> Optimization engine: ACTIVE`,
      `> Finalizing estimate range...`
    ]

    let logIndex = 0
    const logInterval = setInterval(() => {
      if (logIndex < randomLogs.length) {
        setLogs(prev => [...prev.slice(-4), randomLogs[logIndex]]) // Rodyti tik paskutines 5 eilutes
        logIndex++
      }
    }, 450)

    return () => clearInterval(logInterval)
  }, [city])

  // PROGRESS LOGIC - Tikslus laikas (3.5s total)
  useEffect(() => {
    if (currentStep < steps.length) {
      const stepTime = currentStep === 1 ? 1200 : 800 // NOAA žingsnis ilgiausias (atrodo sunkiausias)
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), stepTime)
      return () => clearTimeout(timer)
    } else {
      setTimeout(onComplete, 600)
    }
  }, [currentStep, onComplete])

  const progress = Math.min(((currentStep + 1) / steps.length) * 100, 100)

  return (
    <div className="w-full max-w-xl mx-auto py-6">
      
      {/* HEADER - Technical & Secure */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded text-[10px] font-mono text-emerald-400 mb-3 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            SYSTEM PROCESSING
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Verifying Eligibility
        </h2>
        <p className="text-sm text-slate-500 font-mono">
          Ref ID: <span className="text-slate-300">REQ-{Math.floor(Math.random()*9000)+1000}</span> • {city ? `${city}, ${state}` : 'Your Area'}
        </p>
      </div>

      {/* PROGRESS BAR - Slim & Precise */}
      <div className="mb-8 relative">
        <div className="flex justify-between text-[10px] font-mono text-emerald-400 mb-1 px-1">
            <span>START</span>
            <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* MAIN STEPS - Visualizing the "Work" */}
      <div className="space-y-3 mb-8">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          const Icon = step.icon

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-300 ${
                isActive 
                  ? 'bg-emerald-900/10 border-emerald-500/30 shadow-lg shadow-emerald-900/20' 
                  : isCompleted
                  ? 'bg-slate-800/30 border-slate-700/50 opacity-60'
                  : 'bg-transparent border-transparent opacity-30'
              }`}
            >
              <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                isActive ? 'bg-emerald-500/20 text-emerald-400' : 
                isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 
                'bg-slate-800 text-slate-600'
              }`}>
                {isCompleted ? (
                   <CheckCircle2 className="w-5 h-5" />
                ) : isActive ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                   <Icon className="w-4 h-4" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {step.text}
                </p>
                {isActive && (
                    <p className="text-[10px] text-emerald-500/70 mt-0.5 font-mono animate-pulse">
                        Processing...
                    </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* THE "TERMINAL" - The Authority Trigger */}
      {/* Tai rodo "kodą", todėl vartotojas tiki, kad sistema tikra */}
      <div className="bg-[#0B1120] rounded-lg border border-slate-800 p-4 font-mono text-[10px] sm:text-xs leading-relaxed overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2 border-b border-slate-800 pb-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <span className="ml-2 text-slate-500">System Activity Log</span>
        </div>
        <div className="space-y-1 h-24 flex flex-col justify-end">
            {logs.map((log, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-400 truncate"
                >
                    <span className="text-emerald-500 mr-2">$</span>
                    {log}
                </motion.div>
            ))}
             <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-emerald-500 inline-block align-middle ml-1"
             />
        </div>
      </div>

    </div>
  )
}