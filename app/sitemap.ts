import { MetadataRoute } from 'next'

// NOTE: City pages are auto-indexed by Google via:
// 1. generateStaticParams() pre-renders ALL 15k+ city pages at build
// 2. Vercel's automatic sitemap generation detects all static routes
// 3. State pages link to all cities for internal linking
// This file only needs core pages for manual sitemap.xml

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://housingbenefitcheck.org'
  
  // Static pages
  const staticPages = [
    '',
    '/home',
    '/benefitform',
    '/articles',
    '/privacy',
    '/terms',
    '/contact',
    '/about',
  ]

  // State pages
  const states = [
    'texas',
    'colorado',
    'oklahoma',
    'kansas',
    'nebraska',
    'missouri',
    'florida',
    'minnesota',
    'illinois',
  ]

  // Article pages
  const articles = [
    'free-roof-inspection-guide',
    'hail-damage-roof-replacement',
    'roofing-benefits-guide-2025',
    'storm-damage-claims',
    'home-restoration-tips',
  ]

  // Generate sitemap entries
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' || page === '/home' ? 1 : 0.8,
  }))

  const stateEntries = states.map((state) => ({
    url: `${baseUrl}/state/${state}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/articles/${article}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...stateEntries, ...articleEntries]
}
