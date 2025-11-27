'use client'

import { motion } from 'framer-motion'

interface SealProps {
  icon: string | React.ReactNode
  title: string
  subtitle: string
}

function Seal({ icon, title, subtitle }: SealProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full flex items-center justify-center mb-4 shadow-2xl border-4 border-yellow-500 hover:border-yellow-400 transition-all">
        {typeof icon === 'string' ? (
          <span className="text-5xl md:text-6xl">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <h4 className="font-black text-lg md:text-xl text-gray-900 mb-1">
        {title}
      </h4>
      <p className="text-sm text-gray-600 font-semibold">
        {subtitle}
      </p>
    </motion.div>
  )
}

export default function TrustSeals() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 border-t-4 border-gray-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-center font-black text-3xl md:text-4xl text-gray-900 mb-16">
          Trusted By Thousands of Homeowners
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Seal
            icon="🏆"
            title="BBB Accredited"
            subtitle="A+ Rating"
          />

          <Seal
            icon="🔒"
            title="256-bit SSL"
            subtitle="Bank-Level Encryption"
          />

          <Seal
            icon="✓"
            title="Norton Verified"
            subtitle="Secure Site"
          />

          <Seal
            icon="⭐"
            title="5-Star Rated"
            subtitle="4.9/5.0 Reviews"
          />
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200 rounded-3xl p-8 text-center">
          <p className="text-gray-700 font-semibold mb-2">
            Housing Benefit Check is a private assessment service.
          </p>
          <p className="text-gray-600 text-sm">
            Not affiliated with any government agency. All information is secure and encrypted.
          </p>
        </div>
      </div>
    </div>
  )
}
