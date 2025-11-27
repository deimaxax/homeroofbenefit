import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shared deterministic helpers for funding/slots/etc.
export function getCityHash(city: string, state?: string) {
  const s = `${city || ''}${state || ''}`
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getFundingUsed(hash: number) {
  return 67 + (hash % 18)
}

export function getSlotsRemaining(hash: number) {
  return 12 + (hash % 20)
}

export function getApprovedCount(hash: number) {
  return 23 + (hash % 36)
}

export function getAvgBenefit(hash: number) {
  return 12400 + (hash % 4) * 800
}

export function getBaseViewing(hash: number) {
  return 3 + (hash % 5)
}

export function formatDisplayState(state?: string) {
  if (!state || state === 'Your State') return ''
  if (state.length === 2) return state.toUpperCase()
  return state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()
}

