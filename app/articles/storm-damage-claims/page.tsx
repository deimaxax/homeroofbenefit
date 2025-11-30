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
  
  const titleSuffix = locationName ? ` in ${locationName}` : ''
  const descSuffix = locationName ? ` ${locationName} claim process explained.` : ''
  
  return {
    title: `Storm Damage Claims Guide 2025${titleSuffix} | File & Win Your Insurance Claim`,
    description: `Step-by-step guide to filing successful storm damage claims: documentation, timelines, adjuster meetings, common mistakes, and maximizing payouts.${descSuffix}`,
    keywords: `storm damage claims, how to file storm damage claim, insurance claim storm damage, wind damage claim, roof storm damage, file insurance claim, storm damage documentation, insurance adjuster ${locationName}`,
    openGraph: {
      title: `Storm Damage Claims Guide 2025${titleSuffix}`,
      description: `Learn the step-by-step process to file and win storm damage claims for your property.${descSuffix}`,
      url: `https://homeroofprogram.com/articles/storm-damage-claims`,
      siteName: 'Home Roof Program',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-storm-claims.png',
          width: 1200,
          height: 630,
          alt: 'Storm Damage Claims Guide'
        }
      ],
      publishedTime: '2025-11-20T00:00:00Z',
      modifiedTime: '2025-11-26T00:00:00Z',
      section: 'Claims',
      tags: ['storm damage', 'insurance claims', 'claim process', 'documentation']
    },
    twitter: {
      card: 'summary_large_image',
      title: `Storm Damage Claims Guide 2025${titleSuffix}`,
      description: `File successful storm damage claims. Step-by-step process, documentation tips, and payout maximization.`,
      images: ['/og-storm-claims.png']
    },
    alternates: {
      canonical: `https://homeroofprogram.com/articles/storm-damage-claims`
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

export default function StormDamageClaims({ searchParams }: { searchParams: { state?: string, city?: string, county?: string } }) {
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
    "headline": `Storm Damage Claims Guide 2025${locationName ? ` - ${locationName}` : ''}`,
    "description": "Step-by-step guide to filing successful storm damage claims: documentation, timelines, adjuster meetings, common mistakes, and maximizing payouts.",
    "image": "https://homeroofprogram.com/og-storm-claims.png",
    "author": {
      "@type": "Organization",
      "name": "Home Roof Program"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Home Roof Program",
      "logo": {
        "@type": "ImageObject",
        "url": "https://homeroofprogram.com/logo.png"
      }
    },
    "datePublished": "2025-11-20T00:00:00Z",
    "dateModified": "2025-11-26T00:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://homeroofprogram.com/articles/storm-damage-claims"
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
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-6">
            ← Back to Articles
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              Claims
            </span>
            <span className="text-slate-400">November 20, 2025</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">6 min read</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            How to File Storm Damage Claims Successfully
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Learn the step-by-step process to file and win storm damage claims for your property.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-slate-100 rounded-2xl p-20 mb-12 flex items-center justify-center text-8xl">
          ⛈️
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-slate-700 leading-relaxed mb-6">
            This article is coming soon. Check back later for comprehensive guidance on filing storm damage claims.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center mt-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Check Your Eligibility?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find out if you qualify for storm damage benefits in your area.
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
