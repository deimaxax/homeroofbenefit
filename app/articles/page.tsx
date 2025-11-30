import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Roofing Resources & Guides 2025 | Expert Storm Damage & Benefits Articles',
    description: 'Comprehensive roofing guides: free roof inspections, hail damage claims, storm recovery, insurance benefits, and home restoration tips. Expert advice for homeowners in TX, CO, FL, and more.',
    keywords: 'roofing articles, roof inspection guide, hail damage claims, storm damage recovery, housing benefits, roof replacement guide, insurance claims help, home restoration tips',
    openGraph: {
      title: 'Roofing Resources & Expert Guides 2025',
      description: 'Free roof inspection guides, hail damage claims help, storm recovery tips, and housing benefit resources for homeowners.',
      url: 'https://homeroofprogram.com/articles',
      siteName: 'Home Roof Program',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-articles.png',
          width: 1200,
          height: 630,
          alt: 'Roofing Resources & Guides'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Roofing Resources & Expert Guides 2025',
      description: 'Free roof inspection guides, hail damage claims help, and storm recovery resources.',
      images: ['/og-articles.png']
    },
    alternates: {
      canonical: 'https://homeroofprogram.com/articles'
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

const articles = [
  {
    slug: 'free-roof-inspection-guide',
    title: 'Free Roof Inspection Guide 2025',
    excerpt: 'Get a professional roof inspection at no cost. Learn what to expect, how to qualify, and why it could save you thousands.',
    date: 'November 26, 2025',
    category: 'Free Services',
    readTime: '10 min read',
    image: '🏠'
  },
  {
    slug: 'hail-damage-roof-replacement',
    title: 'Hail Damage Roof Replacement: Complete Guide',
    excerpt: 'Learn how to identify hail damage, file successful insurance claims, and get a full roof replacement covered.',
    date: 'November 26, 2025',
    category: 'Hail Damage',
    readTime: '12 min read',
    image: '🌨️'
  },
  {
    slug: 'roofing-benefits-guide-2025',
    title: 'Complete Guide to Roofing Benefits in 2025',
    excerpt: 'Discover how to maximize your roofing restoration benefits and navigate the claim process with ease.',
    date: 'November 24, 2025',
    category: 'Benefits',
    readTime: '8 min read',
    image: '💰'
  },
  {
    slug: 'storm-damage-claims',
    title: 'How to File Storm Damage Claims Successfully',
    excerpt: 'Learn the step-by-step process to file and win storm damage claims for your property.',
    date: 'November 20, 2025',
    category: 'Claims',
    readTime: '6 min read',
    image: '⛈️'
  },
  {
    slug: 'home-restoration-tips',
    title: 'Essential Home Restoration Tips for 2025',
    excerpt: 'Expert advice on restoring your home after storm damage and maximizing your benefits.',
    date: 'November 15, 2025',
    category: 'Restoration',
    readTime: '10 min read',
    image: '🔨'
  }
]

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Resources & Articles
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
            Expert insights on housing benefits, restoration, and storm damage claims
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article 
                key={article.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-12 flex items-center justify-center text-6xl">
                  {article.image}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-sm">{article.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                    {article.title}
                  </h2>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{article.date}</span>
                    <Link href={`/articles/${article.slug}`}>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Read More →
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Check Your Eligibility?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            See if you qualify for housing restoration benefits in your area
          </p>
          <Link href="/benefitform">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Now →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
