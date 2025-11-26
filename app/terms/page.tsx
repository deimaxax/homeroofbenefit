import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Housing Benefit Check',
  description: 'Terms and conditions for using Housing Benefit Check services.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/home" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-8">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-slate-900 mb-6">Terms of Service</h1>
        <p className="text-slate-500 mb-12">Last Updated: November 24, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              By accessing or using Housing Benefit Check ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Description of Service</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Housing Benefit Check provides:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Eligibility checking for housing restoration benefits</li>
              <li>Connection to qualified contractors and service providers</li>
              <li>Information about state and federal assistance programs</li>
              <li>Educational resources about property restoration</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              We are not an insurance company, government agency, or contractor. We provide information and referral services only.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">User Responsibilities</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              When using our Service, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Not use the Service for any illegal purpose</li>
              <li>Not interfere with or disrupt the Service</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">No Guarantee of Benefits</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We provide information about potential benefits and connect you with service providers. However:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>We do not guarantee that you will qualify for any benefits</li>
              <li>We do not guarantee specific claim amounts or outcomes</li>
              <li>Final eligibility is determined by insurance companies and government agencies</li>
              <li>We are not responsible for the actions of third-party contractors or service providers</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our Service may contain links to third-party websites or services. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>The content or practices of third-party websites</li>
              <li>The quality of work performed by contractors we refer</li>
              <li>Disputes between you and third-party service providers</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              You should independently verify all contractors and service providers before engaging their services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by Housing Benefit Check and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-slate-700 leading-relaxed">
              You may not copy, modify, distribute, sell, or lease any part of our Service without our express written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Warranties of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy or completeness of information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOUSING BENEFIT CHECK SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, data, or goodwill</li>
              <li>Service interruptions or errors</li>
              <li>Actions of third-party contractors or service providers</li>
              <li>Denied claims or benefit applications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Indemnification</h2>
            <p className="text-slate-700 leading-relaxed">
              You agree to indemnify and hold harmless Housing Benefit Check from any claims, damages, losses, liabilities, and expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Termination</h2>
            <p className="text-slate-700 leading-relaxed">
              We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-slate-700 mb-2"><strong>Email:</strong> support@housingbenefitcheck.org</p>
              <p className="text-slate-700 text-sm text-slate-500 mt-2">
                Response time: 1-2 business days
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
