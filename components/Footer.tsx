import Link from 'next/link'

const states = [
  { name: 'Texas', slug: 'texas' },
  { name: 'Colorado', slug: 'colorado' },
  { name: 'Oklahoma', slug: 'oklahoma' },
  { name: 'Kansas', slug: 'kansas' },
  { name: 'Nebraska', slug: 'nebraska' },
  { name: 'Missouri', slug: 'missouri' },
  { name: 'Florida', slug: 'florida' },
  { name: 'Minnesota', slug: 'minnesota' },
  { name: 'Illinois', slug: 'illinois' },
]

const blogLinks = [
  { title: 'Roofing Benefits Guide', slug: 'roofing-benefits-guide-2025' },
  { title: 'Storm Damage Claims', slug: 'storm-damage-claims' },
  { title: 'Home Restoration Tips', slug: 'home-restoration-tips' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t-4 border-blue-700">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                HB
              </div>
              <h3 className="text-white text-xl font-black">Home Roof Program</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              We connect homeowners with licensed roofing contractors for free inspections and insurance claim assistance.
            </p>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <p className="text-xs text-gray-400">
                This is an advertising service.
              </p>
            </div>
          </div>

          {/* States We Serve */}
          <div>
            <h4 className="text-white text-lg font-black mb-6">States We Serve</h4>
            <ul className="space-y-2.5">
              {states.map((state) => (
                <li key={state.slug}>
                  <Link 
                    href={`/state/${state.slug}`}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2"
                  >
                    <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                    <span className="font-medium">{state.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-lg font-black mb-6">Resources</h4>
            <ul className="space-y-2.5">
              {blogLinks.map((link) => (
                <li key={link.slug}>
                  <Link 
                    href={`/articles/${link.slug}`}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2"
                  >
                    <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                    <span className="font-medium">{link.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/articles"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2"
                >
                  <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  <span className="font-medium">All Articles</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-lg font-black mb-6">Legal & Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2">
                  <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  <span className="font-medium">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2">
                  <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  <span className="font-medium">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2">
                  <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  <span className="font-medium">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 flex items-center py-1.5 px-2 rounded group -mx-2">
                  <span className="mr-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  <span className="font-medium">About Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer - PROMINENT */}
        <div className="bg-amber-900/30 rounded-xl p-6 mt-12 border-2 border-amber-700/50">
          <p className="text-gray-300 text-sm leading-relaxed text-center">
            <span className="font-bold text-amber-400 text-base block mb-2"> DISCLAIMER</span>
            Home Roof Program is a <strong>private marketing service</strong> that connects homeowners with licensed roofing contractors. 
            <span className="block mt-2 text-amber-200 font-medium">
              We are NOT affiliated with, endorsed by, or connected to any federal, state, or local government agency or program.
            </span>
            <span className="block mt-2 text-gray-400 text-xs">
              Claim amounts vary based on actual damage, insurance policy terms, and carrier decisions. 
              We do not guarantee any specific outcome or benefit amount. Results depend entirely on your individual circumstances.
            </span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © 2025 Home Roof Program. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/sitemap.xml" className="text-gray-500 hover:text-gray-300 transition-colors font-medium">Sitemap</a>
            <span className="text-gray-700">•</span>
            <a href="/privacy#your-rights" className="text-gray-500 hover:text-gray-300 transition-colors font-medium">Do Not Sell My Info</a>
          </div>
        </div>
      </div>
    </footer>
  )
}