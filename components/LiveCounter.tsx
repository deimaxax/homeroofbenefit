'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CounterProps {
  label: string
  value: string
  icon: React.ReactNode
  color: 'green' | 'blue' | 'purple'
}

function Counter({ label, value, icon, color }: CounterProps) {
  const colorMap = {
    green: 'from-green-600 to-emerald-600',
    blue: 'from-blue-600 to-indigo-600',
    purple: 'from-purple-600 to-pink-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="text-center"
    >
      <div className={`inline-block bg-gradient-to-br ${colorMap[color]} rounded-3xl p-8 shadow-2xl border-4 border-white`}>
        <div className="text-white mb-3">
          {icon}
        </div>
        <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
          {value}
        </div>
        <div className="text-lg md:text-xl font-bold text-white/90">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function LiveCounter() {
  const [helped, setHelped] = useState(47821)
  const [recovered, setRecovered] = useState(2800000)

  useEffect(() => {
    const helpInterval = setInterval(() => {
      setHelped(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 4000)

    const recoverInterval = setInterval(() => {
      setRecovered(prev => prev + Math.floor(Math.random() * 25000) + 10000)
    }, 5000)

    return () => {
      clearInterval(helpInterval)
      clearInterval(recoverInterval)
    }
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M+`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k+`
    }
    return num.toString()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12">
      <Counter
        label="Homeowners Helped"
        value={formatNumber(helped)}
        icon={<svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>}
        color="green"
      />

      <Counter
        label="In Benefits Recovered"
        value={formatNumber(recovered)}
        icon={<svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>}
        color="blue"
      />

      <Counter
        label="Approval Rate"
        value="90%"
        icon={<svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>}
        color="purple"
      />
    </div>
  )
}
