import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Partner Network | Home Roof Program',
  description: 'Learn about our network of licensed, insured roofing contractors who may contact you.',
}

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/benefitform" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-8">
          ← Back to Eligibility Check
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-6">Our Partner Network</h1>
        <p className="text-slate-500 mb-12">Last Updated: November 26, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Who May Contact You</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you submit your information through Home Roof Program, you may be contacted by one or more 
              licensed roofing contractors from our partner network. These contractors are:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li><strong>Licensed</strong> – Hold valid contractor licenses in your state</li>
              <li><strong>Insured</strong> – Carry liability insurance and workers' compensation</li>
              <li><strong>Experienced</strong> – Specialize in storm damage and insurance claims</li>
              <li><strong>Local</strong> – Operate in your geographic area</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How Partner Matching Works</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Based on your location and the information you provide, we share your contact details with 
              contractors in our network who service your area. The matching process considers:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li>Your ZIP code and service area coverage</li>
              <li>Type of property issues you reported</li>
              <li>Contractor availability and capacity</li>
              <li>Contractor expertise in your specific needs</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              You may receive contact from <strong>up to 3 contractors</strong> who are interested in helping 
              with your roof inspection and potential insurance claim.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What to Expect</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              After submitting your information:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700">
              <li><strong>Within 2 hours</strong> (business hours) – You may receive a call or text from a contractor</li>
              <li><strong>Free inspection offer</strong> – Contractors will offer a no-cost roof assessment</li>
              <li><strong>No obligation</strong> – You are not required to hire any contractor who contacts you</li>
              <li><strong>Your choice</strong> – You decide if and when to proceed with any services</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
              <li><strong>Opt out</strong> – Request to be removed from our system at any time</li>
              <li><strong>Decline</strong> – Say no to any contractor who contacts you</li>
              <li><strong>Verify</strong> – Ask contractors for their license number and insurance certificate</li>
              <li><strong>Report</strong> – Contact us if a contractor behaves unprofessionally</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Important Disclaimers</h2>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong>No guarantee:</strong> We do not guarantee that you will qualify for any insurance 
                  claim or receive any specific benefit amount.
                </li>
                <li>
                  <strong>Independent contractors:</strong> Partner contractors are independent businesses. 
                  We are not responsible for their work quality, pricing, or conduct.
                </li>
                <li>
                  <strong>Not an endorsement:</strong> Being in our network does not constitute an endorsement 
                  or recommendation of any specific contractor.
                </li>
                <li>
                  <strong>Verify independently:</strong> We encourage you to verify contractor credentials, 
                  read reviews, and get multiple quotes before making decisions.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Stop Communications</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              To stop receiving calls and messages:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-slate-700 mb-2">
                <strong>Email:</strong> support@homeroofprogram.com
              </p>
              <p className="text-slate-700">
                <strong>Subject line:</strong> "STOP - [Your Phone Number]"
              </p>
              <p className="text-slate-500 text-sm mt-4">
                Opt-out requests are processed within 24-48 hours. You may also tell any contractor 
                who calls to remove you from their list.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
