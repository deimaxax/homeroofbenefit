// lib/analytics.ts - TRACKING UTILITY

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    clarity?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export type EventName = 
  | 'form_step_completed'
  | 'insurance_selected'
  | 'roof_age_selected'
  | 'issue_selected'
  | 'homeowner_status_selected'
  | 'lead_form_submitted'
  | 'lead_submitted_success'
  | 'lead_submission_error'
  | 'form_abandoned'
  | 'cta_clicked'
  | 'phone_clicked'
  | 'scroll_depth'
  | 'exit_intent_triggered'
  | 'mobile_cta_clicked'
  | 'zip_auto_detected'

export interface EventData {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track custom events to Google Analytics & Microsoft Clarity
 */
export const trackEvent = (eventName: EventName, eventData?: EventData) => {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      timestamp: new Date().toISOString()
    })
  }

  // Microsoft Clarity custom tags
  if (window.clarity) {
    window.clarity('set', eventName, JSON.stringify(eventData || {}))
  }

  // Console log for debugging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventData)
  }
}

/**
 * Track page views
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_ID || '', {
      page_path: url,
      page_title: title
    })
  }
}

/**
 * Track conversion (lead submission success)
 */
export const trackConversion = (value?: number) => {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your Google Ads conversion
      value: value || 0,
      currency: 'USD'
    })
  }
}

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return

  const thresholds = [25, 50, 75, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold)
        trackEvent('scroll_depth', { depth: threshold })
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}
