import { redirect } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: {
    state: string
    city: string
    slug: string
  }
}

// Valid article slugs
const validSlugs = [
  'free-roof-inspection-guide',
  'hail-damage-roof-replacement',
  'roofing-benefits-guide-2025',
  'storm-damage-claims',
  'home-restoration-tips',
]

// State name formatting
function formatStateName(state: string): string {
  return state.charAt(0).toUpperCase() + state.slice(1)
}

function formatCityName(city: string): string {
  return city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// SEO metadata for canonical URLs
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!validSlugs.includes(params.slug)) {
    return { title: 'Article Not Found' }
  }
  
  const cityName = formatCityName(params.city)
  const stateName = formatStateName(params.state)
  
  // Article titles for SEO
  const titles: Record<string, string> = {
    'free-roof-inspection-guide': `Free Roof Inspection Guide for ${cityName}, ${stateName} (2025)`,
    'hail-damage-roof-replacement': `Hail Damage Roof Replacement in ${cityName}, ${stateName}`,
    'roofing-benefits-guide-2025': `${cityName}, ${stateName} Roofing Benefits Guide 2025`,
    'storm-damage-claims': `Storm Damage Claims in ${cityName}, ${stateName}`,
    'home-restoration-tips': `Home Restoration Tips for ${cityName}, ${stateName}`,
  }
  
  const descriptions: Record<string, string> = {
    'free-roof-inspection-guide': `Get a free professional roof inspection in ${cityName}, ${stateName}. Complete guide for homeowners.`,
    'hail-damage-roof-replacement': `${cityName} hail damage roof replacement guide. Insurance claims and costs.`,
    'roofing-benefits-guide-2025': `2025 roofing benefits for ${cityName}, ${stateName} homeowners. Programs and savings.`,
    'storm-damage-claims': `File storm damage claims for your ${cityName} roof. Step-by-step guide.`,
    'home-restoration-tips': `Expert home restoration tips for ${cityName}, ${stateName} homeowners.`,
  }
  
  return {
    title: titles[params.slug],
    description: descriptions[params.slug],
    alternates: {
      canonical: `https://homeroofprogram.com/articles/${params.slug}?state=${params.state}&city=${params.city}`
    },
    robots: { index: true, follow: true }
  }
}

// ISR - generate top cities only
export async function generateStaticParams() {
  const topCities = [
    { state: 'texas', city: 'houston' },
    { state: 'texas', city: 'dallas' },
    { state: 'texas', city: 'austin' },
    { state: 'colorado', city: 'denver' },
    { state: 'florida', city: 'miami' },
    { state: 'florida', city: 'tampa' },
  ]
  
  const params: Array<{ state: string; city: string; slug: string }> = []
  
  topCities.forEach(({ state, city }) => {
    validSlugs.forEach(slug => {
      params.push({ state, city, slug })
    })
  })
  
  return params
}

export const dynamicParams = true
export const revalidate = 86400

// REDIRECT to real article with query params
export default function CityArticlePage({ params }: PageProps) {
  // Validate slug
  if (!validSlugs.includes(params.slug)) {
    redirect('/articles')
  }
  
  // Redirect to actual article with location params
  redirect(`/articles/${params.slug}?state=${params.state}&city=${params.city}`)
}
