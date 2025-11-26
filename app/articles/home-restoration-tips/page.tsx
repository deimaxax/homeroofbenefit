import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export async function generateMetadata({ searchParams }: { searchParams: { state?: string, city?: string, county?: string } }): Promise<Metadata> {
  const state = searchParams.state
  const city = searchParams.city
  const county = searchParams.county
  
  const locationName = county
    ? `${county.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} County`
    : city
    ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : state
    ? state.charAt(0).toUpperCase() + state.slice(1)
    : ''
  
  const titleSuffix = locationName ? ` for ${locationName}` : ''
  const descSuffix = locationName ? ` ${locationName} contractor recommendations included.` : ''
  
  return {
    title: `Home Restoration Tips 2025${titleSuffix} | Expert Storm Damage Recovery Advice`,
    description: `Expert home restoration tips after storm damage: contractor selection, material choices, timeline management, benefit maximization, and quality control.${descSuffix}`,
    keywords: `home restoration tips, storm damage restoration, home repair after storm, restoration contractor, home restoration guide, storm recovery, restoration benefits, quality restoration ${locationName}`,
    openGraph: {
      title: `Home Restoration Tips 2025${titleSuffix}`,
      description: `Expert advice on restoring your home after storm damage and maximizing your benefits.${descSuffix}`,
      url: `https://housingbenefitcheck.org/articles/home-restoration-tips`,
      siteName: 'Housing Benefit Check',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-restoration-tips.png',
          width: 1200,
          height: 630,
          alt: 'Home Restoration Tips 2025'
        }
      ],
      publishedTime: '2025-11-15T00:00:00Z',
      modifiedTime: '2025-11-26T00:00:00Z',
      section: 'Restoration',
      tags: ['home restoration', 'storm recovery', 'contractor selection', 'restoration guide']
    },
    twitter: {
      card: 'summary_large_image',
      title: `Home Restoration Tips 2025${titleSuffix}`,
      description: `Expert restoration advice: contractor selection, timelines, benefit maximization, and quality control.`,
      images: ['/og-restoration-tips.png']
    },
    alternates: {
      canonical: `https://housingbenefitcheck.org/articles/home-restoration-tips`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  }
}

export default function HomeRestorationTips({ searchParams }: { searchParams: { state?: string, city?: string, county?: string } }) {
  const state = searchParams.state
  const city = searchParams.city
  const county = searchParams.county

  const locationName = county
    ? `${county.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} County`
    : city 
    ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : state
    ? state.charAt(0).toUpperCase() + state.slice(1)
    : null
    
  const backLink = county && city && state
    ? `/state/${state}/${city}/county`
    : city && state
    ? `/state/${state}/${city}`
    : state
    ? `/state/${state}`
    : '/articles'
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Home Restoration Tips 2025${locationName ? ` - ${locationName}` : ''}`,
    "description": "Expert home restoration tips after storm damage: contractor selection, material choices, timeline management, benefit maximization, and quality control.",
    "image": "https://housingbenefitcheck.org/og-restoration-tips.png",
    "author": {
      "@type": "Organization",
      "name": "Housing Benefit Check"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Housing Benefit Check",
      "logo": {
        "@type": "ImageObject",
        "url": "https://housingbenefitcheck.org/logo.png"
      }
    },
    "datePublished": "2025-11-15T00:00:00Z",
    "dateModified": "2025-11-26T00:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://housingbenefitcheck.org/articles/home-restoration-tips"
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href={backLink} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-6">
            ← Back to {locationName || 'Articles'}
          </Link>
          
          {locationName && (
            <div className="bg-amber-50 border-l-4 border-amber-600 p-4 mb-6 rounded-r-lg">
              <p className="text-amber-900 font-semibold">
                🔨 {locationName} Restoration: Expert tips for your region
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              Restoration
            </span>
            <span className="text-slate-400">November 15, 2025</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">10 min read</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Essential Home Restoration Tips for 2025
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Expert advice on restoring your home after storm damage and maximizing your benefits.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-slate-100 rounded-2xl p-20 mb-12 flex items-center justify-center text-8xl">
          🔨
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-slate-700 leading-relaxed mb-6">
            This article is coming soon. Check back later for expert restoration tips and advice.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center mt-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Check Your Eligibility?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find out if you qualify for home restoration benefits in your area.
          </p>
          <Link href="/benefitform">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl shadow-lg">
              Check Eligibility Now →
            </Button>
          </Link>
        </div>
      </article>
    </main>
  )
}
