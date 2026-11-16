import { absoluteUrl } from '@/shared/config/env'
import { siteConfig } from '@/shared/config/site.config'
import { getSocialLinks } from './business'
import { getBusinessWhatsApp } from './whatsapp'

type JsonLd = Record<string, unknown>

/**
 * `<script type="application/ld+json">` entry for a route's `head().scripts`.
 * "<" is escaped so content can never close the script tag.
 */
export function jsonLdScript(data: JsonLd) {
  return { type: 'application/ld+json', children: JSON.stringify(data).replace(/</g, '\\u003c') }
}

/** Removes null/undefined/empty values so we never publish unconfirmed data. */
export function compactJsonLd<T extends JsonLd>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      if (value === null || value === undefined) return false
      if (Array.isArray(value)) return value.length > 0
      return true
    }),
  ) as T
}

/** schema.org Restaurant (a LocalBusiness subtype) built only from confirmed business data. */
export function buildRestaurantJsonLd(): JsonLd {
  const { brand, location, contact, hours } = siteConfig
  const whatsapp = getBusinessWhatsApp()

  return compactJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': absoluteUrl('/#restaurant'),
    name: brand.name,
    slogan: brand.tagline,
    description: brand.shortDescription,
    url: absoluteUrl('/'),
    image: [absoluteUrl('/og/nuestra-raza.jpg')],
    servesCuisine: ['Parrilla argentina', 'Asado', 'Argentina'],
    acceptsReservations: true,
    menu: absoluteUrl('/carta'),
    address: compactJsonLd({
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.district ?? location.city,
      addressRegion: location.region,
      addressCountry: location.countryCode,
    }),
    geo: location.geo
      ? { '@type': 'GeoCoordinates', latitude: location.geo.latitude, longitude: location.geo.longitude }
      : null,
    hasMap: location.mapsUrl,
    telephone: whatsapp ? `+${whatsapp}` : null,
    email: contact.email,
    sameAs: getSocialLinks().map((link) => link.url),
    openingHoursSpecification: hours.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days.map((day) => `https://schema.org/${day}`),
      opens: entry.opens,
      closes: entry.closes,
    })),
  })
}
