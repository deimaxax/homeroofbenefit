"use client"

import usePlacesAutocomplete, { getGeocode, getZipCode } from "use-places-autocomplete"
import { MapPin, Loader2 } from "lucide-react"
import { useState, useRef, useMemo, useEffect } from "react"

interface AddressAutocompleteProps {
  onSelect: (address: string, zip: string, city: string, state: string) => void
  defaultValue?: string
  biasLocation?: google.maps.LatLngLiteral | null 
  zipCode?: string 
}

export default function AddressAutocomplete({ onSelect, defaultValue, biasLocation, zipCode }: AddressAutocompleteProps) {
  
  // Track if user has selected from dropdown
  const hasSelectedRef = useRef(false)
  
  // Create a unique key for the hook based on location
  // This forces the Autocomplete service to completely reset when the Zip Location changes
  const serviceCacheKey = useMemo(() => {
    return biasLocation 
      ? `${biasLocation.lat.toFixed(4)}-${biasLocation.lng.toFixed(4)}` 
      : "global-search"
  }, [biasLocation])

  // Google Places Hook
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "us" },
      types: ["address"],
      // If we have a Zip Location, prioritize it HEAVILY with a tight 5km radius
      ...(biasLocation ? {
        locationBias: {
          center: biasLocation,
          radius: 5000, // 5km / 3 miles (Tight radius fixes the "Wrong State" issue)
        },
      } : {}),
    },
    defaultValue: defaultValue ?? "",
    debounce: 300, 
    initOnMount: true,
    cacheKey: serviceCacheKey, // Crucial: forces hook to re-init on new zip
  })

  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(defaultValue || null)

  // 3. Selection Logic
  const handleSelect = async (address: string) => {
    // 1. UI Updates (Instant)
    setValue(address, false)
    clearSuggestions()
    setSelectedAddress(address)
    hasSelectedRef.current = true
    setIsLoading(true)

    // 2. CRITICAL FIX: Tell parent form "We have a valid address string" IMMEDIATELY.
    // This prevents the "Please select valid address" error while waiting for data.
    onSelect(address, "", "", "")

    try {
      // 3. Fetch Details (Async)
      const results = await getGeocode({ address })
      const zip = await getZipCode(results[0], false) || ""
      
      const addressComponents = results[0].address_components
      let city = ""
      let state = ""

      addressComponents.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name
        }
      })

      // 4. Update Parent again with full details
      console.log("Details loaded:", { address, zip, city, state })
      onSelect(address, zip, city, state)
      
    } catch (error) {
      console.error("Geocoding error: ", error)
      // Even if detailed geocoding fails, keep the valid string
      onSelect(address, "", "", "")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    
    // If user modifies the selected address, clear the selection state
    if (selectedAddress && newValue !== selectedAddress) {
      hasSelectedRef.current = false
      setSelectedAddress(null)
      // Notify parent that selection is no longer valid
      onSelect(newValue, "", "", "") 
    }
  }

  // Prevent "Enter" from submitting form if menu is open
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && status === "OK") {
        e.preventDefault()
    }
  }

  const isValidSelection = selectedAddress && value === selectedAddress

  // 4. Rendering
  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className={`absolute left-4 top-3.5 w-5 h-5 z-10 transition-colors ${isValidSelection ? 'text-emerald-500' : 'text-slate-500'}`} />
        <input
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={!ready}
          placeholder={biasLocation ? "Select exact address..." : "Start typing address..."}
          className={`w-full bg-[#0f172a] border rounded-lg py-3 pl-11 text-white text-lg focus:border-emerald-500 outline-none placeholder:text-slate-600 transition-all shadow-inner ${
            isValidSelection ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-slate-700'
          }`}
          autoComplete="off"
        />
        {isLoading && (
            <div className="absolute right-4 top-3.5">
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
            </div>
        )}
      </div>

      {status === "OK" && data.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-lg shadow-2xl max-h-60 overflow-auto scrollbar-hide animate-in fade-in zoom-in-95 duration-150">
          {data.map(({ place_id, description, structured_formatting }) => (
            <li
              key={place_id}
              // Use onMouseDown to trigger before input blur
              onMouseDown={(e) => {
                e.preventDefault() 
                handleSelect(description)
              }}
              className="px-4 py-3 hover:bg-emerald-900/20 cursor-pointer border-b border-slate-700/50 last:border-0 transition-colors flex flex-col items-start group"
            >
              <span className="text-white font-medium text-sm group-hover:text-emerald-400 transition-colors">
                {structured_formatting.main_text}
              </span>
              <span className="text-slate-400 text-xs">
                {structured_formatting.secondary_text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}