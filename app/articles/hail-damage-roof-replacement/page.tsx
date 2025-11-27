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
  const descSuffix = locationName ? ` ${locationName} claim filing guide included.` : ''
  
  return {
    title: `Hail Damage Roof Replacement Guide 2025${titleSuffix} | Insurance Claims & Costs`,
    description: `Complete guide to hail damage roof replacement: identify damage, file insurance claims, cost breakdowns, contractor selection, and claim timeline.${descSuffix}`,
    keywords: `hail damage roof replacement, hail damage insurance claim, roof hail damage repair, hail damage roof cost, how to identify hail damage, file hail damage claim, roof replacement insurance ${locationName}`,
    openGraph: {
      title: `Hail Damage Roof Replacement Guide 2025${titleSuffix}`,
      description: `Learn to identify hail damage, file successful insurance claims, and get full roof replacement covered.${descSuffix}`,
      url: `https://housingbenefitcheck.org/articles/hail-damage-roof-replacement`,
      siteName: 'Housing Benefit Check',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-hail-damage.png',
          width: 1200,
          height: 630,
          alt: 'Hail Damage Roof Replacement Guide'
        }
      ],
      publishedTime: '2025-11-26T00:00:00Z',
      modifiedTime: '2025-11-26T00:00:00Z',
      section: 'Hail Damage',
      tags: ['hail damage', 'insurance claims', 'roof replacement', 'storm damage']
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hail Damage Roof Replacement Guide 2025${titleSuffix}`,
      description: `Identify hail damage, file successful claims, get roof replacement covered. Complete guide.`,
      images: ['/og-hail-damage.png']
    },
    alternates: {
      canonical: `https://housingbenefitcheck.org/articles/hail-damage-roof-replacement`
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

export default function HailDamageRoofReplacement({ searchParams }: { searchParams: { state?: string, city?: string, county?: string } }) {
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
    "headline": `Hail Damage Roof Replacement Guide 2025${locationName ? ` - ${locationName}` : ''}`,
    "description": "Complete guide to hail damage roof replacement: identify damage, file insurance claims, cost breakdowns, contractor selection, and claim timeline.",
    "image": "https://housingbenefitcheck.org/og-hail-damage.png",
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
    "datePublished": "2025-11-26T00:00:00Z",
    "dateModified": "2025-11-26T00:00:00Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://housingbenefitcheck.org/articles/hail-damage-roof-replacement"
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
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6 rounded-r-lg">
              <p className="text-purple-900 font-semibold">
                🌨️ {locationName} Hail Damage: Get your roof replacement covered by insurance
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              Hail Damage
            </span>
            <span className="text-slate-400">November 26, 2025</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">12 min read</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Hail Damage Roof Replacement{locationName ? `: ${locationName} Guide` : ' Guide 2025'}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Hail storms cause billions in roof damage annually. Learn how to identify hail damage{locationName ? ` in ${locationName}` : ''}, file successful insurance claims, and get a full roof replacement covered—often with ZERO out-of-pocket cost beyond your deductible.
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200 mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-4">⚡ Critical Facts</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-xl flex-shrink-0">▸</span>
                <span><strong>Time Limit:</strong> File claims within 12 months of hail event (varies by state)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-xl flex-shrink-0">▸</span>
                <span><strong>Average Cost:</strong> $14,200 replacement fully covered by homeowners insurance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-xl flex-shrink-0">▸</span>
                <span><strong>Invisible Damage:</strong> 72% of hail damage can't be seen from the ground</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 text-xl flex-shrink-0">▸</span>
                <span><strong>Your Cost:</strong> Only your deductible ($1,000-$2,500 typically)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">What is Hail Damage (and Why It's So Destructive)</h2>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            Hail forms when updrafts in thunderstorms carry water droplets into freezing altitudes. <strong>The result? Ice pellets traveling at 50-100 mph that impact your roof like thousands of tiny hammers.</strong>
          </p>

          <div className="bg-slate-900 text-white rounded-2xl p-8 my-8">
            <h4 className="text-2xl font-bold mb-4">Hail Size = Damage Severity</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🟢</div>
                <div className="font-bold text-green-400 mb-1">Pea Size (0.25")</div>
                <p className="text-sm text-slate-300">Minimal damage. May dislodge granules.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🟡</div>
                <div className="font-bold text-yellow-400 mb-1">Quarter Size (1")</div>
                <p className="text-sm text-slate-300">Moderate damage. Shingle bruising begins.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🔴</div>
                <div className="font-bold text-red-400 mb-1">Golf Ball+ (1.75"+)</div>
                <p className="text-sm text-slate-300">SEVERE. Expect full replacement coverage.</p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Why hail damage is worse than it looks:</strong> Even "minor" hail strikes compromise shingle integrity. The protective granules that shield asphalt from UV rays get knocked off, exposing the underlying mat. This accelerates aging by 5-10 years, leading to premature leaks.
          </p>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">How to Identify Hail Damage on Your Roof</h2>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 my-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">From the Ground (DIY Check)</h3>
            <p className="text-slate-700 mb-4">Look for these secondary indicators that suggest roof damage:</p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span><strong>Dented gutters/downspouts:</strong> If hail dented metal, it damaged shingles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span><strong>AC unit dents:</strong> Outdoor condenser shows hail impact marks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span><strong>Siding damage:</strong> Chips, cracks, or dents on vinyl/aluminum siding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span><strong>Window screen tears:</strong> Holes in window/porch screens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span><strong>Shingle granules in gutters:</strong> Black grit accumulation</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 my-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">On the Roof (Professional Inspection Required)</h3>
            <p className="text-slate-700 mb-4 font-semibold text-amber-900">⚠️ Never climb your roof yourself. Hire a licensed contractor for this.</p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">▸</span>
                <span><strong>Shingle bruising:</strong> Dark spots where hail crushed granules into the mat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">▸</span>
                <span><strong>Circular impact marks:</strong> Visible dimples (like golf ball surface)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">▸</span>
                <span><strong>Cracked shingles:</strong> Splits or tears from large hail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">▸</span>
                <span><strong>Missing granules:</strong> Bald spots exposing black asphalt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">▸</span>
                <span><strong>Dented vents/flashing:</strong> Metal components show clear impact dents</span>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Insurance Claims Process: Step-by-Step</h2>

          <div className="space-y-6 my-8">
            <div className="bg-white border-l-4 border-green-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-lg">1</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Get Professional Documentation</h4>
                  <p className="text-slate-700">Schedule a free roof inspection with a licensed contractor. They'll photograph every damaged area and provide a written estimate. <strong>This happens BEFORE you contact insurance.</strong></p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-lg">2</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">File Insurance Claim</h4>
                  <p className="text-slate-700">Call your insurance company with: (1) Date of hail storm, (2) Contractor's estimate, (3) Photo evidence. Request an adjuster visit within 7-10 days.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-purple-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-lg">3</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Adjuster Inspection (WITH Your Contractor Present)</h4>
                  <p className="text-slate-700"><strong>Critical:</strong> Have your contractor meet the adjuster on-site. They'll ensure all damage gets documented. Adjusters often miss 20-40% of damage when homeowners aren't represented.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-orange-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-lg">4</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Review Settlement Offer</h4>
                  <p className="text-slate-700">Insurance sends an estimate. If it's lower than your contractor's quote, you can: (a) negotiate with more evidence, (b) request re-inspection, or (c) hire a public adjuster.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-red-600 rounded-r-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-lg">5</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Accept Settlement & Schedule Work</h4>
                  <p className="text-slate-700">Once approved, you receive: (1) Initial check for Actual Cash Value (ACV), (2) Final check after work completion for depreciation. Total covers full replacement minus deductible.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 rounded-r-lg">
            <p className="text-red-900 font-bold mb-2">🚨 Claim Denial? Here's Why (And How to Fight It):</p>
            <ul className="text-red-900 space-y-2">
              <li><strong>1. "Pre-existing damage":</strong> Provide maintenance records proving roof was sound before hail</li>
              <li><strong>2. "Normal wear and tear":</strong> Show hail reports from NOAA proving storm occurred</li>
              <li><strong>3. "Insufficient damage":</strong> Get a second opinion/independent inspection</li>
              <li><strong>4. "Outside policy period":</strong> Check your state's statute of limitations (often 1-2 years)</li>
            </ul>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Does Insurance Cover 100% of Hail Damage Roof Replacement?</h2>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Short answer: Yes, minus your deductible.</strong>
          </p>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 my-8">
            <h4 className="text-2xl font-bold text-slate-900 mb-6">Typical Hail Claim Payout Breakdown:</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-slate-700">Full Roof Tear-Off & Replacement</span>
                <span className="font-bold text-slate-900">$12,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-slate-700">Underlayment & Ice Shield</span>
                <span className="font-bold text-slate-900">$1,800</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-slate-700">Ventilation Upgrades</span>
                <span className="font-bold text-slate-900">$600</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-slate-700">Labor & Disposal</span>
                <span className="font-bold text-slate-900">$3,200</span>
              </div>
              <div className="flex justify-between items-center pt-3 text-lg">
                <span className="font-bold text-slate-900">Insurance Pays:</span>
                <span className="font-bold text-green-600">$17,600</span>
              </div>
              <div className="flex justify-between items-center border-t-2 border-red-200 pt-3">
                <span className="text-slate-700">Your Deductible:</span>
                <span className="font-bold text-red-600">-$1,500</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-xl">
                <span className="font-black text-slate-900">You Receive:</span>
                <span className="font-black text-green-700">$16,100</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 my-8 border-2 border-green-200">
            <h4 className="text-xl font-bold text-green-900 mb-3">💡 Pro Tip: Upgrade While Insurance Pays</h4>
            <p className="text-slate-700">
              Most policies cover "like-kind" replacement (basic 3-tab shingles). But you can upgrade to architectural shingles, impact-resistant materials, or higher wind ratings by paying the difference out-of-pocket (~$2,000-$4,000). Since insurance covers labor + tear-off, upgrades cost 60% less than if you paid for the entire roof yourself.
            </p>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">How Long After a Hail Storm Can You File a Claim?</h2>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>It varies by state and policy, but here are general rules:</strong>
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="p-4 text-left">Timeframe</th>
                  <th className="p-4 text-left">Recommendation</th>
                  <th className="p-4 text-left">Risk Level</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">0-30 Days</td>
                  <td className="p-4 text-green-700 font-semibold">IDEAL: File immediately</td>
                  <td className="p-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">No Risk</span></td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">1-6 Months</td>
                  <td className="p-4">Still covered, but document why delay occurred</td>
                  <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">Low Risk</span></td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold">6-12 Months</td>
                  <td className="p-4">May need proof of storm date + NOAA reports</td>
                  <td className="p-4"><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">Medium Risk</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">12+ Months</td>
                  <td className="p-4 text-red-700 font-semibold">Likely DENIED (unless you can prove recent discovery)</td>
                  <td className="p-4"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">High Risk</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <p className="text-blue-900 font-bold mb-2">📅 Most Policies Have a "Reasonable Time" Clause:</p>
            <p className="text-blue-900">
              Your policy may say "file within a reasonable time after discovering damage." Courts have ruled 12-18 months is reasonable IF you didn't know about the damage. But insurance companies will fight you. <strong>Best practice: File within 60 days of the hail event.</strong>
            </p>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Common Mistakes That Cost Homeowners Thousands</h2>

          <div className="space-y-4 my-8">
            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
              <h4 className="text-lg font-bold text-red-900 mb-2">❌ Mistake #1: Making Temporary Repairs Before Filing</h4>
              <p className="text-red-900">
                If you patch your roof before the adjuster sees it, they'll argue the damage was minor. Document everything with photos FIRST, then repair.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
              <h4 className="text-lg font-bold text-red-900 mb-2">❌ Mistake #2: Accepting the First Settlement Offer</h4>
              <p className="text-red-900">
                Initial offers are often 30-50% below actual costs. Always get a contractor's estimate and negotiate.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
              <h4 className="text-lg font-bold text-red-900 mb-2">❌ Mistake #3: Letting the Adjuster Inspect Alone</h4>
              <p className="text-red-900">
                Insurance adjusters work for the insurance company, not you. Have your contractor present to point out all damage.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
              <h4 className="text-lg font-bold text-red-900 mb-2">❌ Mistake #4: Not Documenting the Hail Event</h4>
              <p className="text-red-900">
                Save weather reports, take photos of hail on the ground, note neighbors' damage. Proof of the storm strengthens your claim.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6">Take Action: Get Your Hail Damage Assessed Today</h2>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            Hail damage doesn't heal itself—it only gets worse. <strong>Every day you wait, water infiltration, mold growth, and structural deterioration compound the problem.</strong> Most insurance policies require "prompt" reporting, meaning delays can jeopardize your claim.
          </p>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white my-12 text-center">
            <h3 className="text-3xl font-black mb-4">Free Hail Damage Inspection</h3>
            <p className="text-xl mb-6 text-purple-100">
              {locationName ? `Licensed contractors in ${locationName} ready to assess your roof` : 'Licensed contractors ready to assess your roof damage'}
            </p>
            <Link href={backLink || '/benefitform'}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-6 text-xl font-bold rounded-xl shadow-2xl">
                Schedule Free Inspection →
              </Button>
            </Link>
            <p className="text-sm text-purple-200 mt-4">No obligation • 100% Free • Insurance claim assistance included</p>
          </div>
        </div>
      </article>
    </main>
  )
}
