import Link from 'next/link'
import { Button } from '@/components/ui/button'

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Home Roof Program",
  "url": "https://homeroofprogram.com",
  "logo": "https://homeroofprogram.com/logo.png",
  "description": "Helping homeowners discover and claim their eligible restoration benefits",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street, Suite 100",
    "addressLocality": "Your City",
    "addressRegion": "ST",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-BENEFITS",
    "contactType": "customer service",
    "email": "support@homeroofprogram.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://facebook.com/homeroofprogram",
    "https://twitter.com/homeroofprogram"
  ],
  "areaServed": [
    "Texas", "Colorado", "Oklahoma", "Kansas", "Nebraska", 
    "Missouri", "Florida", "Minnesota", "Illinois"
  ]
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Subtle Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/30 to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-bold border border-green-600 shadow-md">
                  ✓ Trusted by 50,000+ Homeowners Nationwide
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
                Check Your Eligibility for
                <span className="block text-blue-900 mt-2">
                  2025 Housing Benefits
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Discover if your property qualifies for <span className="font-bold text-blue-900">state-approved restoration
                incentives</span> and storm damage assistance programs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/benefitform">
                  <Button
                    size="lg"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-7 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Check Eligibility Now →
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-10 py-7 text-xl font-bold rounded-xl border-4 border-gray-300 hover:border-blue-700 hover:bg-blue-50 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white border-y-2 border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-4">
              Why Choose Home Roof Program?
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
              We make it simple and secure to discover your eligibility for government-approved restoration programs.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border-4 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  Fast & Easy Process
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Complete our simple eligibility form in under 2 minutes and receive instant
                  results on your qualification status.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border-4 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  100% Secure & Private
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Your personal information is protected with 256-bit SSL encryption and
                  never shared without your explicit consent.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border-4 border-indigo-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  Nationwide Coverage
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We partner with state-approved programs across multiple states to find the best
                  restoration benefits for your property.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Our Impact in Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-black mb-3">$2.4B+</div>
                <div className="text-blue-100 text-lg font-semibold">Total Benefits Claimed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-black mb-3">50K+</div>
                <div className="text-blue-100 text-lg font-semibold">Happy Homeowners</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-black mb-3">9 States</div>
                <div className="text-blue-100 text-lg font-semibold">Currently Serving</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-black mb-3">24/7</div>
                <div className="text-blue-100 text-lg font-semibold">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center text-gray-900 mb-4">
              Trusted & Verified
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
              We work with state-approved programs to ensure you receive legitimate benefits.
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-4xl font-black text-blue-900">HB</span>
                </div>
                <p className="text-sm font-bold text-gray-700">Home Roof Program</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-5xl font-bold shadow-lg">✓</div>
                <p className="text-sm font-bold text-gray-700">Verified Program</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-black text-3xl shadow-lg">5★</div>
                <p className="text-sm font-bold text-gray-700">5-Star Rated</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-700">SSL Secured</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white border-t-4 border-blue-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
              Join thousands of homeowners who have already discovered their
              eligibility for <span className="font-bold text-blue-900">restoration benefits</span>.
            </p>
            <Link href="/benefitform">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white px-14 py-8 text-2xl font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Check Your Eligibility Now →
              </Button>
            </Link>
            <p className="mt-8 text-sm text-gray-500">
              Free • No Credit Check Required • Takes Less Than 2 Minutes
            </p>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <section className="py-8 px-4 bg-gray-100 border-t border-gray-300">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-600">
              Home Roof Program is a private service that helps homeowners identify potential eligibility for restoration programs. 
              We are not affiliated with any government agency. All benefits are subject to program terms and conditions.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}