import { absoluteUrl } from '@/shared/config/env'
import { siteConfig } from '@/shared/config/site.config'

export interface PageSeo {
  /** Page title without the brand suffix. Omit for the home page. */
  title?: string
  description: string
  /** Route path, used for the canonical URL. */
  path: string
  /** Open Graph image path inside /public (1200×630). */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

const DEFAULT_OG_IMAGE = '/og/nuestra-raza.jpg'
const DEFAULT_OG_ALT = 'Costillar dorándose sobre el fuego de la parrilla — Nuestra Raza, Arequipa'

/**
 * Builds the `head()` payload for a TanStack route:
 * unique title + description, canonical URL, Open Graph and Twitter cards.
 */
export function buildPageHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
  type = 'website',
  noindex = false,
}: PageSeo) {
  const brand = siteConfig.brand.name
  const fullTitle = title ? `${title} · ${brand}` : `${brand} · Asado argentino en Arequipa — ${siteConfig.brand.tagline}`
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: brand },
      { property: 'og:locale', content: 'es_PE' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
