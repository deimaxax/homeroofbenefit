import { redirect } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: {
    state: string
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

// SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!validSlugs.includes(params.slug)) {
    return { title: 'Article Not Found' }
  }
  
  const stateName = formatStateName(params.state)
  
  const titles: Record<string, string> = {
    'free-roof-inspection-guide': `Free Roof Inspection Guide for ${stateName} (2025)`,
    'hail-damage-roof-replacement': `Hail Damage Roof Replacement in ${stateName}`,
    'roofing-benefits-guide-2025': `${stateName} Roofing Benefits Guide 2025`,
    'storm-damage-claims': `Storm Damage Claims in ${stateName}`,
    'home-restoration-tips': `Home Restoration Tips for ${stateName}`,
  }
  
  const descriptions: Record<string, string> = {
    'free-roof-inspection-guide': `Get a free professional roof inspection in ${stateName}. Complete guide.`,
    'hail-damage-roof-replacement': `${stateName} hail damage roof replacement guide. Insurance claims.`,
    'roofing-benefits-guide-2025': `2025 roofing benefits for ${stateName} homeowners.`,
    'storm-damage-claims': `File storm damage claims for your ${stateName} roof.`,
    'home-restoration-tips': `Expert home restoration tips for ${stateName} homeowners.`,
  }
  
  return {
    title: titles[params.slug],
    description: descriptions[params.slug],
    alternates: {
      canonical: `https://homeroofprogram.com/articles/${params.slug}?state=${params.state}`
    },
    robots: { index: true, follow: true }
  }
}

// Pre-generate for all states
export async function generateStaticParams() {
  const states = ['texas', 'colorado', 'oklahoma', 'kansas', 'nebraska', 'missouri', 'florida', 'minnesota', 'illinois']
  const params: Array<{ state: string; slug: string }> = []
  
  states.forEach(state => {
    validSlugs.forEach(slug => {
      params.push({ state, slug })
    })
  })
  
  return params
}

// REDIRECT to real article with state param
export default function StateArticlePage({ params }: PageProps) {
  if (!validSlugs.includes(params.slug)) {
    redirect('/articles')
  }
  
  redirect(`/articles/${params.slug}?state=${params.state}`)
}
