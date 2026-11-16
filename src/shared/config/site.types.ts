/**
 * Business configuration types.
 *
 * Convention: `null` (or an empty array) means "not confirmed yet".
 * The UI renders a discreet "Por confirmar" state instead of inventing data.
 */

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export interface OpeningHours {
  /** Human label shown on the site, e.g. "Sábados". */
  label: string
  /** Days covered by this entry (used for schema.org structured data). */
  days: DayOfWeek[]
  /** 24 h format "HH:MM". */
  opens: string
  /** 24 h format "HH:MM". */
  closes: string
}

export interface SiteConfig {
  brand: {
    name: string
    tagline: string
    shortDescription: string
    /** Brand messages: "Buena carne.", "Fuego lento."… */
    messages: readonly string[]
    values: readonly string[]
    /** Muestra "®" junto al logotipo. Activar solo si la marca está registrada (INDECOPI). */
    showRegisteredMark: boolean
  }
  location: {
    city: string
    region: string
    country: string
    /** ISO 3166-1 alpha-2 */
    countryCode: string
    streetAddress: string | null
    district: string | null
    /** Short indication, e.g. "A 5 minutos de la plaza de Yanahuara". */
    reference: string | null
    /** "Cómo llegar" link (Google Maps share URL). */
    mapsUrl: string | null
    /** Google Maps embed URL (https://www.google.com/maps/embed?pb=…). */
    mapEmbedUrl: string | null
    geo: { latitude: number; longitude: number } | null
  }
  contact: {
    /** International format without "+" or spaces, e.g. "51XXXXXXXXX". */
    whatsapp: string | null
    /** Human-friendly version for display, e.g. "+51 9XX XXX XXX". */
    whatsappDisplay: string | null
    email: string | null
  }
  social: {
    instagram: string | null
    facebook: string | null
    tiktok: string | null
  }
  /** Empty array = hours not confirmed yet. */
  hours: OpeningHours[]
  reservations: {
    /** Largest party size selectable in the form. Larger groups are routed to "evento privado". */
    maxPartySize: number
    /** How many days ahead a request can be made. */
    maxDaysAhead: number
  }
  content: {
    /** Shows "Imágenes referenciales" while placeholder photography is in use. */
    photosAreReferential: boolean
  }
}
