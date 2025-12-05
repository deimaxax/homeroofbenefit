import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// FULL SITEMAP: Includes ALL 15k+ city pages for Google crawling
// Pages are generated on-demand via ISR when crawled
// Build logs stay under 4MB because we don't pre-generate all pages

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://homeroofprogram.com'
  
  // Static pages
  const staticPages = [
    '',
    '/home',
    '/findallowance',
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

  // State name mapping for city generation
  const stateMap: Record<string, string> = {
    'Texas': 'texas',
    'Colorado': 'colorado',
    'Oklahoma': 'oklahoma',
    'Kansas': 'kansas',
    'Nebraska': 'nebraska',
    'Missouri': 'missouri',
    'Florida': 'florida',
    'Minnesota': 'minnesota',
    'Illinois': 'illinois',
  }

  // Generate sitemap entries for static pages
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

  // Article slugs for city/state article pages
  const articleSlugs = [
    'free-roof-inspection-guide',
    'hail-damage-roof-replacement',
    'roofing-benefits-guide-2025',
    'storm-damage-claims',
    'home-restoration-tips',
  ]

  // State-level article pages (9 states × 5 articles = 45 pages)
  const stateArticleEntries: MetadataRoute.Sitemap = []
  states.forEach(state => {
    articleSlugs.forEach(slug => {
      stateArticleEntries.push({
        url: `${baseUrl}/state/${state}/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    })
  })

  // Generate ALL city page URLs from dynamic_cities.json
  let cityEntries: MetadataRoute.Sitemap = []
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'dynamic_cities.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const lines = fileContents.trim().split('\n')
    const allCities = lines.map(line => JSON.parse(line))
    
    const seenCityUrls = new Set<string>()
    const seenCountyUrls = new Set<string>()
    
    allCities.forEach((item: { city: string; state: string; county?: string }) => {
      const stateSlug = stateMap[item.state]
      if (stateSlug && item.city) {
        const citySlug = item.city.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
        
        const cityUrl = `${baseUrl}/state/${stateSlug}/${citySlug}`
        
        // Add city URL (avoid duplicates)
        if (!seenCityUrls.has(cityUrl)) {
          seenCityUrls.add(cityUrl)
          cityEntries.push({
            url: cityUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          })
          
          // Add 5 article pages for each city (8014 cities × 5 = 40,070 article pages)
          articleSlugs.forEach(slug => {
            cityEntries.push({
              url: `${baseUrl}/state/${stateSlug}/${citySlug}/articles/${slug}`,
              lastModified: new Date(),
              changeFrequency: 'monthly' as const,
              priority: 0.5,
            })
          })
        }
        
        // Add county page separately if county exists
        if (item.county) {
          const countyUrl = `${baseUrl}/state/${stateSlug}/${citySlug}/county`
          if (!seenCountyUrls.has(countyUrl)) {
            seenCountyUrls.add(countyUrl)
            cityEntries.push({
              url: countyUrl,
              lastModified: new Date(),
              changeFrequency: 'monthly' as const,
              priority: 0.5,
            })
          }
        }
      }
    })
  } catch (error) {
    // Fallback: return sitemap without cities if file read fails
    console.error('Sitemap: Could not load cities', error)
  }

  return [...staticEntries, ...stateEntries, ...articleEntries, ...stateArticleEntries, ...cityEntries]
}
