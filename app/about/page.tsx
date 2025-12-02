import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Home Roof Program',
  description: 'Learn about Home Roof Program and our mission to help homeowners access restoration benefits.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/home" className="text-blue-100 hover:text-white flex items-center gap-2 mb-8">
            ← Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Home Roof Program</h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
            Helping homeowners discover and claim their eligible restoration benefits since 2020.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-xl text-slate-700 leading-relaxed mb-6">
            At Home Roof Program, we believe every homeowner deserves access to the restoration benefits they&apos;ve earned. Our mission is to simplify the complex process of identifying, applying for, and securing housing restoration benefits.
          </p>
          <p className="text-xl text-slate-700 leading-relaxed">
            We&apos;ve helped over 50,000 homeowners across 9 states recover more than $2.4 billion in benefits, making us one of the most trusted names in housing restoration assistance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Home Roof Program was founded in 2020 by a team of insurance professionals, contractors, and technology experts who saw a critical gap in the market. Too many homeowners were unaware of the benefits available to them, or found the claims process too complex to navigate alone.
            </p>
            <p>
              We started with a simple idea: create a free, easy-to-use platform that helps homeowners understand their eligibility and connects them with qualified professionals who can help them through the claims process.
            </p>
            <p>
              Today, we&apos;ve grown into a comprehensive resource for homeowners across the United States, offering eligibility checks, contractor referrals, educational content, and personalized support throughout the entire restoration journey.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Transparency</h3>
              <p className="text-slate-600 leading-relaxed">
                We believe in complete transparency. No hidden fees, no surprises. We clearly explain every step of the process and what you can expect.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Homeowner First</h3>
              <p className="text-slate-600 leading-relaxed">
                Your interests always come first. We only work with vetted, licensed contractors and prioritize your satisfaction above all else.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Education</h3>
              <p className="text-slate-600 leading-relaxed">
                We empower homeowners with knowledge. Our comprehensive resources help you make informed decisions about your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 text-center">Our Expertise</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Our team brings together decades of experience in insurance, construction, and technology to serve you better.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-slate-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Vetted Contractors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-slate-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-slate-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of homeowners who have successfully claimed their benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/benefitform">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl shadow-lg">
                Check Your Eligibility
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
