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
  const descSuffix = locationName ? ` ${locationName} programs detailed.` : ''
  
  return {
    title: `Roofing Benefits Guide 2025${titleSuffix} | Maximize Your Restoration Benefits`,
    description: `Complete guide to roofing restoration benefits: eligibility requirements, application process, benefit maximization, state programs, and claim navigation.${descSuffix}`,
    keywords: `roofing benefits 2025, housing restoration benefits, roof replacement benefits, state roofing programs, how to claim roofing benefits, maximize roof benefits, roofing assistance programs ${locationName}`,
    openGraph: {
      title: `Roofing Benefits Guide 2025${titleSuffix}`,
      description: `Maximize your roofing restoration benefits. Complete eligibility guide and claim navigation.${descSuffix}`,
      url: `https://homeroofprogram.com/articles/roofing-benefits-guide-2025`,
      siteName: 'Home Roof Program',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-benefits-guide.png',
          width: 1200,
          height: 630,
          alt: 'Roofing Benefits Guide 2025'
        }
      ],
      publishedTime: '2025-11-24T00:00:00Z',
      modifiedTime: '2025-11-26T00:00:00Z',
      section: 'Benefits',
      tags: ['housing benefits', 'roofing benefits', 'restoration programs', 'eligibility guide']
    },
    twitter: {
      card: 'summary_large_image',
      title: `Roofing Benefits Guide 2025${titleSuffix}`,
      description: `Discover how to maximize roofing restoration benefits and navigate claims successfully.`,
      images: ['/og-benefits-guide.png']
    },
    alternates: {
      canonical: `https://homeroofprogram.com/articles/roofing-benefits-guide-2025`
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

export default function RoofingBenefitsGuide({ searchParams }: { searchParams: { state?: string, city?: string, county?: string } }) {
  const state = searchParams.state
  const city = searchParams.city
  const county = searchParams.county

  // Format location name
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
    "headline": `Roofing Benefits Guide 2025${locationName ? ` - ${locationName}` : ''}`,
    "description": "Complete guide to roofing restoration benefits: eligibility requirements, application process, benefit maximization, state programs, and claim navigation.",
    "image": "https://homeroofprogram.com/og-benefits-guide.png",
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
    "datePublished": "2025-11-24T00:00:00Z",
    "dateModified": "2025-11-26T00:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://homeroofprogram.com/articles/roofing-benefits-guide-2025"
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href={backLink} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-6">
            ← Back to {locationName || 'Articles'}
          </Link>
          
          {locationName && (
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
              <p className="text-blue-900 font-semibold">
                📍 {locationName} Homeowners: This guide is tailored for your area
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              Roofing
            </span>
            <span className="text-slate-400">November 24, 2025</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">8 min read</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Complete Guide to Roofing Benefits in 2025
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Everything you need to know about maximizing your roofing restoration benefits and navigating the claim process successfully.
          </p>
        </div>

        {/* Featured Image Placeholder */}
        <div className="bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl p-20 mb-12 flex items-center justify-center text-8xl">
          🏠
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Understanding Roofing Benefits</h2>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            In 2025, homeowners across the United States have access to unprecedented roofing restoration benefits. These programs, designed to help property owners recover from storm damage and maintain their homes, can provide substantial financial assistance for roof repairs and replacements.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Whether you've experienced recent storm damage or simply have an aging roof, understanding your eligibility for these benefits is crucial. Many homeowners are unaware that they qualify for assistance programs that could save them thousands of dollars.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Who Qualifies for Roofing Benefits?</h2>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            Eligibility for roofing benefits varies by state and program, but generally includes:
          </p>

          <ul className="list-disc pl-6 mb-8 space-y-3 text-slate-700">
            <li className="leading-relaxed">
              <strong>Storm Damage Victims:</strong> Properties that have sustained damage from hail, wind, or other severe weather events
            </li>
            <li className="leading-relaxed">
              <strong>Aging Roofs:</strong> Homes with roofs that are nearing the end of their expected lifespan (typically 15-25 years)
            </li>
            <li className="leading-relaxed">
              <strong>Geographic Location:</strong> Residents in designated high-risk weather zones or disaster-declared areas
            </li>
            <li className="leading-relaxed">
              <strong>Insurance Coverage:</strong> Homeowners with active property insurance policies
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
            <p className="text-blue-900 font-semibold mb-2">💡 Pro Tip:</p>
            <p className="text-blue-800 leading-relaxed">
              Even if you're not sure whether you qualify, it's worth checking your eligibility. Many homeowners are surprised to discover they're eligible for benefits they didn't know existed.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">The Claim Process: Step by Step</h2>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Initial Assessment</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The first step is to have your roof professionally inspected. A qualified roofing contractor can identify damage that may not be visible to the untrained eye, including:
          </p>
          
          <ul className="list-disc pl-6 mb-8 space-y-2 text-slate-700">
            <li>Hail impact damage</li>
            <li>Wind-related shingle loss</li>
            <li>Structural compromises</li>
            <li>Water infiltration points</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Documentation</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Proper documentation is critical for a successful claim. This includes:
          </p>
          
          <ul className="list-disc pl-6 mb-8 space-y-2 text-slate-700">
            <li>Detailed photographs of all damage</li>
            <li>Professional inspection reports</li>
            <li>Historical weather data for your area</li>
            <li>Maintenance records showing proper upkeep</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Filing Your Claim</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Once you have your documentation, you'll need to file a claim with your insurance provider. Be sure to:
          </p>
          
          <ul className="list-disc pl-6 mb-8 space-y-2 text-slate-700">
            <li>Report damage promptly (most policies have time limits)</li>
            <li>Keep detailed records of all communications</li>
            <li>Request a copy of your policy to understand coverage limits</li>
            <li>Consider working with a public adjuster if needed</li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Maximizing Your Benefits</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            To get the most out of your roofing benefits:
          </p>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h4 className="text-xl font-bold text-green-900 mb-4">Best Practices:</h4>
            <ul className="space-y-3 text-green-900">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Act quickly after discovering damage - delays can complicate claims</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Work with licensed, insured contractors who have experience with insurance claims</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Get multiple estimates to ensure fair pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Review all paperwork carefully before signing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Keep copies of all documents related to your claim</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">State-Specific Programs</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Many states offer additional assistance programs beyond standard insurance coverage. These can include:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-3">Texas</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enhanced hail damage programs and wind mitigation incentives for qualifying homeowners.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-3">Florida</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hurricane preparedness grants and storm-resistant roofing material subsidies.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-3">Colorado</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mountain region weather damage assistance and energy-efficient roofing upgrades.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 mb-3">Oklahoma</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tornado recovery programs and severe weather restoration benefits.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Common Mistakes to Avoid</h2>

          <div className="bg-red-50 rounded-xl p-6 mb-8">
            <h4 className="text-xl font-bold text-red-900 mb-4">Watch Out For:</h4>
            <ul className="space-y-3 text-red-900">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Waiting too long to file a claim after damage occurs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Accepting the first settlement offer without negotiation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Hiring unlicensed or uninsured contractors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Making permanent repairs before the insurance adjuster inspects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>Failing to document all damage thoroughly</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Conclusion</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Understanding and accessing roofing benefits in 2025 doesn't have to be complicated. By following the steps outlined in this guide, documenting damage properly, and working with qualified professionals, you can maximize your benefits and ensure your home receives the repairs it needs.
          </p>

          <p className="text-slate-700 leading-relaxed mb-8">
            Remember, the key to success is acting promptly, staying organized, and being persistent throughout the claims process. Don't leave money on the table - check your eligibility today and take the first step toward restoring your roof.
          </p>
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center mt-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Check Your Eligibility?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find out if you qualify for roofing restoration benefits in your area. It takes less than 2 minutes.
          </p>
          <Link href="/benefitform">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Check Eligibility Now →
            </Button>
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/articles/storm-damage-claims" className="group">
              <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  How to File Storm Damage Claims Successfully
                </h4>
                <p className="text-slate-600 text-sm">
                  Learn the step-by-step process to file and win storm damage claims.
                </p>
              </div>
            </Link>
            <Link href="/articles/home-restoration-tips" className="group">
              <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Essential Home Restoration Tips for 2025
                </h4>
                <p className="text-slate-600 text-sm">
                  Expert advice on restoring your home after storm damage.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
