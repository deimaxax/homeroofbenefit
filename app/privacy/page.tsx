import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Home Roof Program',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/home" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-8">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last Updated: November 24, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Home Roof Program ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-6">Personal Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Fill out our eligibility check form</li>
              <li>Contact us via email or phone</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Property information (address, type, age)</li>
              <li>Insurance information</li>
              <li>Damage descriptions and photos</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Pages viewed and time spent on pages</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Process your eligibility check and provide personalized results</li>
              <li>Connect you with qualified contractors and service providers</li>
              <li>Communicate with you about your inquiry and our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Information Sharing</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li><strong>Service Providers:</strong> Third-party contractors, roofing companies, and insurance professionals who can help with your claim</li>
              <li><strong>Business Partners:</strong> Companies that help us operate our website and provide services</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              We do not sell your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your information</li>
              <li>Request data portability</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Cookies and Tracking</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-slate-700 mb-2"><strong>Email:</strong> support@homeroofprogram.com</p>
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
