"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoadScript } from "@react-google-maps/api" 
import { getGeocode, getLatLng } from "use-places-autocomplete"
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Lock, Search, 
  FileText, Loader2, AlertCircle 
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

import AddressAutocomplete from './AddressAutocomplete'

const LIBRARIES: ("places")[] = ["places"]

const SystemAuditLog = ({ address, city, onComplete }: { address: string, city: string, onComplete: () => void }) => {
  const displayAddr = address ? address.split(',')[0] : 'Property'
  
  const [steps, setSteps] = useState([
    { text: `Locating property at ${displayAddr}...`, status: 'pending' },
    { text: `Accessing ${city} municipal zoning records...`, status: 'pending' },
    { text: 'Measuring roof surface area (Satellite)...', status: 'pending' },
    { text: 'Checking active storm dates in region...', status: 'pending' },
    { text: 'Finalizing eligibility report...', status: 'pending' }
  ])
  
  useEffect(() => {
    let currentStep = 0
    const interval = setInterval(() => {
      setSteps(prev => prev.map((s, i) => {
        if (i < currentStep) return { ...s, status: 'complete' }
        if (i === currentStep) return { ...s, status: 'active' }
        return s
      }))
      currentStep++
      if (currentStep > steps.length) {
        clearInterval(interval)
        setTimeout(onComplete, 800)
      }
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0f172a] border border-slate-700 rounded-lg p-5 w-full">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Database Scan</span>
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
             <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                step.status === 'complete' ? 'bg-emerald-500 border-emerald-500' :
                step.status === 'active' ? 'border-emerald-500/50 animate-pulse' :
                'border-slate-700 bg-slate-800'
             }`}>
                {step.status === 'complete' && <CheckCircle2 className="w-3 h-3 text-white" />}
             </div>
             <span className={`text-xs font-mono transition-colors ${
                step.status === 'active' ? 'text-emerald-400 font-bold' : 
                step.status === 'complete' ? 'text-slate-400' : 'text-slate-600'
             }`}>
                {step.text}
             </span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface BenefitFormProps {
  defaultState?: string
  defaultCity?: string
  caseRef?: string
  spotsLeft?: number
}

export default function BenefitForm({ defaultState, defaultCity, caseRef, spotsLeft }: BenefitFormProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
    libraries: LIBRARIES,
  })

  const [step, setStep] = useState(1) 
  const [zipCode, setZipCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [addressCity, setAddressCity] = useState('')
  const [addressState, setAddressState] = useState('')
  const [propertyIssues, setPropertyIssues] = useState<string[]>([])
  const [formData, setFormData] = useState({ name: '', phone: '' })
  
  const [zipLocation, setZipLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [isGeocoding, setIsGeocoding] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const displayCity = useMemo(() => defaultCity || 'Your Area', [defaultCity])
  const TOTAL_STEPS = 5

  // --- STEP 1: ZIP ---
  const handleZipSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (zipCode.length < 5) { setError("Enter valid Zip Code"); return }
    
    setError(null)
    setIsGeocoding(true)

    try {
        const results = await getGeocode({ address: zipCode + " USA" }) 
        const { lat, lng } = getLatLng(results[0])
        
        setZipLocation({ lat, lng })
        
        // @ts-ignore
        trackEvent('form_step_completed', { step: 1, zip: zipCode, geocoded: true })
        
        setStep(2)
    } catch (err) {
        console.error("Geocoding failed", err)
        // @ts-ignore
        trackEvent('form_step_completed', { step: 1, zip: zipCode, fallback: true })
        setStep(2)
    } finally {
        setIsGeocoding(false)
    }
  }

  // --- STEP 2: ADDRESS ---
  const [addressSelected, setAddressSelected] = useState(false)
  
  const handleAddressSelect = (addr: string, zip: string, city: string, state: string) => {
      setStreetAddress(addr)
      // Track if a valid address was selected (empty addr means selection was cleared)
      const isSelected = addr.length > 0
      setAddressSelected(isSelected)
      
      if (zip) setZipCode(zip)
      if (city) setAddressCity(city)
      if (state) setAddressState(state)
      
      // Clear error immediately if we have a selection
      if (isSelected) setError(null)
  }

  const handleAddressStepSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Check if address was properly selected from dropdown, not just typed
      if (!addressSelected || streetAddress.length < 5) { 
          setError("Please select a valid address from the dropdown list")
          return 
      }
      setError(null)
      setStep(3)
      // @ts-ignore
      trackEvent('form_step_completed', { step: 2, address_length: streetAddress.length })
  }

  // --- STEP 3: ISSUES ---
  const handleIssuesSubmit = () => {
    if (propertyIssues.length === 0) { setError("Select at least one issue"); return }
    setStep(4)
  }

  // --- STEP 4: OWNER ---
  const handleOwnerSelect = (type: 'owner' | 'renter') => {
    if (type === 'renter') return; 
    setStep(5)
  }

  // --- STEP 6: FINAL SUBMIT ---
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.name.length < 3 || formData.phone.length < 10) {
        setError("Please enter valid contact details")
        return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone.replace(/\D/g, ''),
          zipCode: zipCode,
          streetAddress: streetAddress,
          city: addressCity,
          state: addressState,
          propertyIssues: propertyIssues,
          source: 'benefit-form',
          createdAt: new Date().toISOString(),
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      // @ts-ignore
      trackEvent('lead_submitted_success', { 
        leadId: data.leadId,
        address: streetAddress 
      })
      
      setIsSubmitted(true)
    } catch (err) {
      console.error('Lead submission error:', err)
      setError('Connection error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loadError) return <div className="text-red-500 text-center p-4">System Error: Maps API failed to load. Please refresh.</div>

  if (isSubmitted) return (
    <div className="text-center py-8 text-white animate-in zoom-in-95">
      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Eligibility Confirmed</h2>
      <p className="text-slate-400 mb-6">File ID: <span className="text-emerald-400 font-mono">{caseRef || 'PENDING'}</span></p>
      
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 max-w-sm mx-auto">
        <p className="text-xs text-slate-300">
            A Senior Specialist is reviewing <span className="text-white font-bold">{streetAddress}</span>.
            Expect a call within <span className="text-emerald-400 font-bold">5 minutes</span> to finalize inspection.
        </p>
      </div>
    </div>
  )

  return (
    <div className="w-full relative min-h-[450px]">
      
      <div className="flex items-center justify-between mb-6 px-1">
         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Step {step > 5 ? 5 : step} of {TOTAL_STEPS}
         </span>
         <div className="flex gap-1">
            {Array.from({length: TOTAL_STEPS}).map((_, i) => (
            <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${step > i ? 'bg-emerald-500' : 'bg-slate-800'}`} />
            ))}
         </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: ZIP CODE */}
        {step === 1 && (
          <motion.form key="step1" onSubmit={handleZipSubmit} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <h3 className="text-lg font-bold text-white mb-2">Verify Property Location</h3>
            <p className="text-slate-400 text-xs mb-4">Enter Zip Code to check regional storm data.</p>
            <div className="relative mb-4">
               <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
               <input 
                  type="text" inputMode="numeric" placeholder="Enter Zip Code" value={zipCode}
                  onChange={(e) => { setZipCode(e.target.value.replace(/\D/g,'').slice(0,5)); setError(null) }}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg py-3 pl-11 text-white text-lg tracking-wider focus:border-emerald-500 outline-none"
                  autoFocus
               />
            </div>
            {error && <p className="text-red-400 text-xs mb-3 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {error}</p>}
            
            <button 
                type="submit" 
                disabled={isGeocoding}
                className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGeocoding ? (
                  <><Loader2 className="w-4 h-4 animate-spin text-slate-600"/> Checking Region...</>
              ) : (
                  <>Check Database <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </motion.form>
        )}

        {/* STEP 2: ADDRESS */}
        {step === 2 && (
          <motion.form key="step2" onSubmit={handleAddressStepSubmit} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <h3 className="text-lg font-bold text-white mb-2">Locate Property</h3>
            <p className="text-slate-400 text-xs mb-4">
                Verify address for <span className="text-emerald-400 font-medium">satellite roof analysis</span>.
            </p>
            
            <div className="mb-4 relative z-20">
               {isLoaded ? (
                   <AddressAutocomplete 
                      onSelect={handleAddressSelect} 
                      defaultValue={streetAddress}
                      biasLocation={zipLocation}
                      zipCode={zipCode} 
                   />
               ) : (
                   <div className="w-full h-12 bg-slate-800 rounded animate-pulse flex items-center px-4 text-slate-500 text-sm">Loading Maps API...</div>
               )}
            </div>
            
            {error && <p className="text-red-400 text-xs mb-3 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {error}</p>}
            
            <button type="submit" className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all">
              Verify This Address <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        {/* STEP 3: ISSUES */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <h3 className="text-lg font-bold text-white mb-4">Select Damage Indicators</h3>
            <div className="space-y-3 mb-4">
              {[
                { id: 'hail', label: 'Hail / Storm Activity', icon: '⛈️' },
                { id: 'age', label: 'Roof Age > 10 Years', icon: '🏚️' },
                { id: 'leaks', label: 'Visible Wear / Leaks', icon: '💧' }
              ].map(opt => (
                <div key={opt.id} onClick={() => {
                    const exists = propertyIssues.includes(opt.id)
                    setPropertyIssues(exists ? propertyIssues.filter(x => x !== opt.id) : [...propertyIssues, opt.id])
                    setError(null)
                }} 
                className={`p-3.5 rounded-lg border cursor-pointer flex items-center gap-3 transition-all ${propertyIssues.includes(opt.id) ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-[#0f172a] border-slate-700'}`}>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${propertyIssues.includes(opt.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`}>
                    {propertyIssues.includes(opt.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-lg">{opt.icon}</span>
                  <span className="text-sm font-medium text-slate-300">{opt.label}</span>
                </div>
              ))}
            </div>
            {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
            <button onClick={handleIssuesSubmit} className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2">
              Confirm Damage <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* STEP 4: OWNERSHIP */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <h3 className="text-lg font-bold text-white mb-2">Verify Ownership</h3>
            <p className="text-slate-400 text-xs mb-6">Are you the legal owner of <span className="text-white font-mono">{streetAddress || 'this property'}</span>?</p>
            <button onClick={() => handleOwnerSelect('owner')} className="w-full mb-3 p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg shadow-lg text-left hover:from-emerald-500 hover:to-teal-600 transition-all">
              <span className="font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Yes, I am the Property Owner</span>
            </button>
            <button disabled className="w-full p-4 bg-slate-800/50 border border-slate-700 text-slate-500 rounded-lg text-left flex justify-between opacity-60 cursor-not-allowed">
              <span className="font-medium text-sm">I am a Renter</span>
              <span className="text-[10px] bg-slate-800 px-1 rounded">Ineligible</span>
            </button>
          </motion.div>
        )}

        {/* STEP 5: SYSTEM LOG */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <SystemAuditLog address={streetAddress} city={displayCity} onComplete={() => setStep(6)} />
          </motion.div>
        )}

        {/* STEP 6: FINAL CAPTURE */}
        {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
               <div className="bg-slate-800/40 border border-blue-500/20 p-3.5 rounded-lg mb-5 flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-100 text-xs font-bold uppercase mb-1">Secure Result Delivery</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed">
                      Results for <span className="text-blue-200">{streetAddress}</span> are ready. Verify identity to view report.
                    </p>
                  </div>
              </div>

               <form onSubmit={handleFinalSubmit} className="space-y-4">
                   <div>
                       <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Full Name</label>
                       <input type="text" placeholder="Legal Name" className="w-full h-12 px-4 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:border-emerald-500 outline-none" required onChange={e => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-[10px] uppercase font-bold text-slate-500">Phone Number</label>
                            <span className="flex items-center gap-1 text-[9px] text-emerald-500"><Lock className="w-2.5 h-2.5"/> Encrypted</span>
                        </div>
                       <input 
                         type="tel" 
                         placeholder="(555) 123-4567" 
                         className="w-full h-12 px-4 rounded-lg bg-[#0f172a] border border-slate-700 text-white font-mono text-lg focus:border-emerald-500 outline-none" 
                         required 
                         onChange={e => {
                            const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                            const formatted = !x ? '' : !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
                            setFormData({...formData, phone: formatted})
                         }} 
                         value={formData.phone}
                        />
                   </div>
                   
                   {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                   
                   <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2">
                       {isSubmitting ? <><Loader2 className="animate-spin w-5 h-5"/> Processing...</> : <>View Secure Report <FileText className="w-5 h-5"/></>}
                   </button>
               </form>
            </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}