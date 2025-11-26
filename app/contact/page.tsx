import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Housing Benefit Check',
  description: 'Get in touch with our team for questions about housing restoration benefits.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link href="/home" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-8">
          ← Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Have questions about housing restoration benefits? Our team is here to help you navigate the process.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <a href="mailto:support@housingbenefitcheck.org" className="text-blue-600 hover:text-blue-700">
                    support@housingbenefitcheck.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                  <a href="tel:1-800-BENEFITS" className="text-blue-600 hover:text-blue-700">
                    1-800-BENEFITS
                  </a>
                  <p className="text-slate-500 text-sm mt-1">Monday - Friday, 8am - 8pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Address</h3>
                  <p className="text-slate-600">
                    123 Main Street, Suite 100<br />
                    Your City, ST 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/benefitform" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → Check Your Eligibility
                </Link>
                <Link href="/articles" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → Browse Articles
                </Link>
                <Link href="/privacy" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → Privacy Policy
                </Link>
                <Link href="/terms" className="block text-blue-600 hover:text-blue-700 font-medium">
                  → Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a topic</option>
                  <option value="eligibility">Eligibility Question</option>
                  <option value="claim">Claim Assistance</option>
                  <option value="contractor">Contractor Referral</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>

              <p className="text-sm text-slate-500 text-center">
                We typically respond within 24 hours
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How long does the eligibility check take?</h3>
              <p className="text-slate-600 leading-relaxed">
                Our eligibility check takes less than 2 minutes to complete. You'll receive instant preliminary results.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Is there a fee for your service?</h3>
              <p className="text-slate-600 leading-relaxed">
                No, our eligibility check and referral service is completely free for homeowners.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What states do you serve?</h3>
              <p className="text-slate-600 leading-relaxed">
                We currently serve Texas, Colorado, Oklahoma, Kansas, Nebraska, Missouri, Florida, Minnesota, and Illinois.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Do you guarantee claim approval?</h3>
              <p className="text-slate-600 leading-relaxed">
                We cannot guarantee claim approval, but we connect you with experienced professionals who maximize your chances of success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
