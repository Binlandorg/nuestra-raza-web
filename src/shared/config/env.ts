const optional = (value: string | undefined): string | null => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

/**
 * Typed access to public environment variables (see `.env.example`).
 * Only `VITE_*` variables are exposed to the browser — never put secrets here.
 */
export const env = {
  siteUrl: (optional(import.meta.env.VITE_SITE_URL) ?? 'http://localhost:3000').replace(/\/+$/, ''),
  whatsappNumber: optional(import.meta.env.VITE_WHATSAPP_NUMBER),
  reservationsEndpoint: optional(import.meta.env.VITE_RESERVATIONS_ENDPOINT),
  contactEndpoint: optional(import.meta.env.VITE_CONTACT_ENDPOINT),
} as const

/** Absolute URL for a site path (canonical, Open Graph, structured data). */
export const absoluteUrl = (path = '/'): string =>
  `${env.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
