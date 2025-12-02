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
  const descSuffix = locationName ? ` Learn what ${locationName} homeowners should expect.` : ''
  
  return {
    title: `Free Roof Inspection Guide 2025${titleSuffix} | What to Expect & How to Qualify`,
    description: `Get a professional roof inspection at no cost. Complete guide: what inspectors check, how to qualify, red flags to avoid, and what it reveals about storm damage.${descSuffix}`,
    keywords: `free roof inspection, roof inspection checklist, how to get free roof inspection, roof inspection cost, professional roof inspection, storm damage inspection, hail damage inspection, roof inspection guide ${locationName}`,
    openGraph: {
      title: `Free Roof Inspection Guide 2025${titleSuffix}`,
      description: `Professional roof inspection at no cost. Learn qualification requirements, inspection process, and what to expect.${descSuffix}`,
      url: `https://homeroofprogram.com/articles/free-roof-inspection-guide`,
      siteName: 'Home Roof Program',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-free-inspection.png',
          width: 1200,
          height: 630,
          alt: 'Free Roof Inspection Guide'
        }
      ],
      publishedTime: '2025-11-26T00:00:00Z',
      modifiedTime: '2025-11-26T00:00:00Z',
      section: 'Free Services',
      tags: ['roof inspection', 'free services', 'storm damage', 'homeowner guide']
    },
    twitter: {
      card: 'summary_large_image',
      title: `Free Roof Inspection Guide 2025${titleSuffix}`,
      description: `Get professional inspection at no cost. Complete checklist and qualification guide.`,
      images: ['/og-free-inspection.png']
    },
    alternates: {
      canonical: `https://homeroofprogram.com/articles/free-roof-inspection-guide`
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

export default function FreeRoofInspectionGuide({ searchParams }: { searchParams: { state?: string, city?: string, county?: string } }) {
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
    "headline": `Free Roof Inspection Guide 2025${locationName ? ` - ${locationName}` : ''}`,
    "description": "Get a professional roof inspection at no cost. Complete guide: what inspectors check, how to qualify, red flags to avoid, and what it reveals about storm damage.",
    "image": "https://homeroofprogram.com/og-free-inspection.png",
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
    "datePublished": "2025-11-26T00:00:00Z",
    "dateModified": "2025-11-26T00:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://homeroofprogram.com/articles/free-roof-inspection-guide"
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
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
              <p className="text-blue-900 font-semibold">
                🏠 {locationName} Homeowners: Free roof inspection available in your area
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              Free Inspection
            </span>
            <span className="text-slate-400">November 26, 2025</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">10 min read</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Free Roof Inspection Guide {locationName ? `for ${locationName}` : '2025'}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Get a professional roof inspection at no cost{locationName ? ` in ${locationName}` : ''}. Learn what to expect, how to qualify, and why it could save you thousands in unexpected repairs.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200 mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4">💰 Key Takeaways</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <span><strong>100% Free:</strong> No hidden costs, no obligation to hire</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <span><strong>Licensed Contractors:</strong> State-certified roofing professionals only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <span><strong>Insurance Assistance:</strong> Help filing claims if damage is found</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <span><strong>Average Savings:</strong> Homeowners save $3,200 by catching issues early</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Why Free Roof Inspections Exist</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            You might wonder: &quot;If it&apos;s truly free, what&apos;s the catch?&quot; Here&apos;s the truth: roofing contractors offer free inspections because <strong>most homeowners don&apos;t realize they have claimable damage</strong>.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <p className="text-amber-900 font-semibold mb-2">📊 Industry Statistics:</p>
            <ul className="text-amber-900 space-y-2">
              <li>• 68% of roofs have hail damage invisible from ground level</li>
              <li>• 84% of homeowners don't file claims they're entitled to</li>
              <li>• Average insurance claim for roof damage: $11,500</li>
            </ul>
          </div>

          <p className="text-slate-700 leading-relaxed mb-6">
            Contractors profit when they discover legitimate damage and help you file an insurance claim. <strong>It's a win-win:</strong> you get a new roof covered by insurance, they get paid by your insurance company.
          </p>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">What Happens During a Free Roof Inspection{locationName ? ` in ${locationName}` : ''}</h2>
          
          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 1: Initial Assessment (15-20 minutes)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The inspector walks your property perimeter, looking for:
          </p>
          <ul className="list-disc pl-8 text-slate-700 space-y-2 mb-6">
            <li><strong>Visible damage:</strong> Missing shingles, sagging areas, debris accumulation</li>
            <li><strong>Storm indicators:</strong> Dents on gutters, siding, or AC units (proves hail impact)</li>
            <li><strong>Age assessment:</strong> Estimated remaining roof lifespan</li>
            <li><strong>Ventilation check:</strong> Proper attic airflow prevents premature aging</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 2: Roof Surface Inspection (30-45 minutes)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The inspector climbs onto your roof (weather permitting) to check:
          </p>
          <ul className="list-disc pl-8 text-slate-700 space-y-2 mb-6">
            <li><strong>Hail damage:</strong> Bruising on shingles (looks like dimples on a golf ball)</li>
            <li><strong>Wind damage:</strong> Lifted shingles, exposed nails, missing granules</li>
            <li><strong>Wear patterns:</strong> Uneven deterioration, blistering, cracking</li>
            <li><strong>Flashing condition:</strong> Seals around chimneys, vents, valleys</li>
          </ul>

          <div className="bg-blue-50 rounded-2xl p-6 my-8 border-2 border-blue-200">
            <h4 className="text-xl font-bold text-blue-900 mb-3">🔍 What Inspectors Look For:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700">
              <div>
                <p className="font-semibold text-blue-900">Hail Damage Signs:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Granule loss (black spots)</li>
                  <li>Shingle bruising/dimpling</li>
                  <li>Cracked or split shingles</li>
                  <li>Dented metal flashing</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-900">Wind Damage Signs:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Lifted/creased shingles</li>
                  <li>Missing shingles</li>
                  <li>Exposed underlayment</li>
                  <li>Displaced ridge caps</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Step 3: Interior Inspection (Optional, 10-15 minutes)</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            If accessible, the inspector checks your attic for:
          </p>
          <ul className="list-disc pl-8 text-slate-700 space-y-2 mb-6">
            <li><strong>Water stains:</strong> Proof of past or active leaks</li>
            <li><strong>Mold/mildew:</strong> Indicates moisture intrusion</li>
            <li><strong>Insulation condition:</strong> Proper R-value for energy efficiency</li>
            <li><strong>Structural integrity:</strong> Sagging rafters, damaged decking</li>
          </ul>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Who Qualifies for a Free Roof Inspection?</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Almost everyone qualifies</strong>, but these factors make you a priority candidate:
          </p>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 my-8">
            <h4 className="text-xl font-bold text-slate-900 mb-4">✓ High-Priority Candidates:</h4>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">1.</span>
                <span><strong>Recent Storm Activity:</strong> Hail, tornadoes, or 60+ mph winds in last 12 months</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">2.</span>
                <span><strong>Roof Age 10+ Years:</strong> Older roofs have higher damage susceptibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">3.</span>
                <span><strong>Visible Issues:</strong> Water stains, missing shingles, curling edges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">4.</span>
                <span><strong>Neighbor Claims:</strong> If neighbors filed successful claims, you likely qualify too</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">5.</span>
                <span><strong>Pre-Sale Inspection:</strong> Required for home buyers/sellers</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Free Inspection vs. Insurance Adjuster: Key Differences</h2>
          
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Criteria</th>
                  <th className="p-4 text-left">Free Contractor Inspection</th>
                  <th className="p-4 text-left">Insurance Adjuster</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">Cost</td>
                  <td className="p-4 text-green-600">$0</td>
                  <td className="p-4">$0 (but you pay deductible if claim approved)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">Who They Work For</td>
                  <td className="p-4">You (the homeowner)</td>
                  <td className="p-4">Insurance company</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">Motivation</td>
                  <td className="p-4">Find all damage (increases claim size)</td>
                  <td className="p-4">Minimize payout (reduces company loss)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">Expertise</td>
                  <td className="p-4">Roofing specialist (installs roofs daily)</td>
                  <td className="p-4">Generalist (assesses all property types)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">When to Use</td>
                  <td className="p-4"><strong>FIRST</strong> – before filing claim</td>
                  <td className="p-4"><strong>SECOND</strong> – after claim is filed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-lg">
            <p className="text-red-900 font-bold mb-2">⚠️ Critical Mistake to Avoid:</p>
            <p className="text-red-900">
              <strong>Never call your insurance company before getting a free contractor inspection.</strong> If the adjuster comes first and says "no damage," your claim is denied and you can't reopen it. Get the contractor's documentation first, then file a strong claim with photo evidence.
            </p>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">What to Expect After the Inspection</h2>
          
          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Scenario 1: No Damage Found (30% of inspections)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Result:</strong> Peace of mind. You'll receive a written report confirming your roof's condition and estimated lifespan.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>What's next:</strong> Nothing. No pressure, no follow-up calls. Keep the report for future reference.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Scenario 2: Minor Damage Found (40% of inspections)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Result:</strong> The contractor finds damage but it's below your deductible ($500-$2,500 typically).
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>What's next:</strong> You can pay out-of-pocket for repairs (~$300-$1,500) or monitor and address before it worsens.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Scenario 3: Insurance-Worthy Damage (30% of inspections)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            <strong>Result:</strong> Contractor documents damage exceeding your deductible (typically $8,000-$20,000 in repairs).
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>What's next:</strong> They provide:
          </p>
          <ul className="list-disc pl-8 text-slate-700 space-y-2 mb-6">
            <li><strong>Photo evidence:</strong> Close-ups of every damaged area</li>
            <li><strong>Written estimate:</strong> Itemized repair/replacement costs</li>
            <li><strong>Claim assistance:</strong> Help filing with your insurance company</li>
            <li><strong>Scope of work:</strong> Detailed description for the adjuster</li>
          </ul>

          <div className="bg-green-50 rounded-2xl p-6 my-8 border-2 border-green-200">
            <h4 className="text-xl font-bold text-green-900 mb-3">💰 Average Insurance Payout Breakdown:</h4>
            <div className="space-y-3 text-slate-700">
              <div className="flex justify-between items-center border-b border-green-200 pb-2">
                <span>Full Roof Replacement:</span>
                <span className="font-bold text-green-700">$11,500 - $18,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-green-200 pb-2">
                <span>Your Deductible:</span>
                <span className="font-bold text-red-600">-$1,000 - $2,500</span>
              </div>
              <div className="flex justify-between items-center border-b border-green-200 pb-2">
                <span>Upgraded Materials (optional):</span>
                <span className="font-bold text-blue-600">$2,000 - $4,000</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">You Receive:</span>
                <span className="font-bold text-green-700 text-xl">$10,500 - $15,500</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Common Questions About Free Roof Inspections</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Q: Is it really 100% free?</h4>
              <p className="text-slate-700">
                <strong>A:</strong> Yes. Reputable contractors never charge for inspections. If someone asks for upfront payment, walk away immediately.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Q: Do I have to hire them if they find damage?</h4>
              <p className="text-slate-700">
                <strong>A:</strong> No. You can use their inspection report and get quotes from 3-5 other contractors. Most homeowners do comparison shop.
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Q: Will an inspection affect my insurance rates?</h4>
              <p className="text-slate-700">
                <strong>A:</strong> No. The inspection itself doesn't involve your insurance. Only filing a claim might affect rates (but replacing a damaged roof prevents far more expensive issues).
              </p>
            </div>

            <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Q: How long does it take?</h4>
              <p className="text-slate-700">
                <strong>A:</strong> 45-75 minutes for a thorough inspection. You'll receive the report within 24-48 hours.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Red Flags: Avoid These "Free Inspection" Scams</h2>
          
          <div className="bg-red-50 rounded-2xl p-6 my-8 border-2 border-red-200">
            <h4 className="text-xl font-bold text-red-900 mb-4">🚨 Warning Signs of Untrustworthy Contractors:</h4>
            <ul className="space-y-3 text-red-900">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">✗</span>
                <span><strong>No license/insurance:</strong> Always verify state contractor license</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">✗</span>
                <span><strong>Pressure tactics:</strong> "This deal expires today" or "I can only inspect now"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">✗</span>
                <span><strong>Cash-only offers:</strong> Legitimate contractors accept insurance assignments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">✗</span>
                <span><strong>Ask you to file a false claim:</strong> Insurance fraud is illegal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl flex-shrink-0">✗</span>
                <span><strong>Require upfront payment:</strong> Never pay for an "inspection"</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Take Action: Schedule Your Free Inspection Today</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Don't wait for a leak to discover roof damage. <strong>Proactive inspections save homeowners an average of $3,200</strong> by catching issues before they escalate into interior damage, mold, or structural problems.
          </p>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white my-12 text-center">
            <h3 className="text-3xl font-black mb-4">Ready to Check Your Roof?</h3>
            <p className="text-xl mb-6 text-blue-100">
              {locationName ? `Connect with licensed contractors in ${locationName}` : 'Connect with licensed contractors in your area'}
            </p>
            <Link href={backLink || '/benefitform'}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-xl font-bold rounded-xl shadow-2xl">
                Get Free Inspection →
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
