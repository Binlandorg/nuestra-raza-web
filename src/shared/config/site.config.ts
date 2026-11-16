import type { SiteConfig } from './site.types'

/**
 * ─────────────────────────────────────────────────────────────
 *  NUESTRA RAZA · Información del negocio
 * ─────────────────────────────────────────────────────────────
 *  Único lugar para editar los datos del negocio que aparecen en
 *  el sitio (cabecera, pie, contacto, reservas, SEO y datos
 *  estructurados de Google).
 *
 *  ⚠️  Todo valor `null` (o lista vacía) está PENDIENTE DE CONFIRMAR.
 *      El sitio muestra "Por confirmar" y oculta enlaces rotos;
 *      nunca inventa direcciones, teléfonos ni horarios.
 * ─────────────────────────────────────────────────────────────
 */
export const siteConfig: SiteConfig = {
  brand: {
    name: 'Nuestra Raza',
    tagline: 'El fuego nos reúne.',
    shortDescription:
      'Asado de inspiración argentina y largas sobremesas en Arequipa, Perú. Buena carne, fuego lento, vino y amigos alrededor de la mesa.',
    messages: ['Buena carne.', 'Fuego lento.', 'Largas sobremesas.'],
    values: ['Tradición', 'Encuentro', 'Amistad'],
    // PENDIENTE: activar solo si la marca está registrada en INDECOPI.
    showRegisteredMark: false,
  },

  location: {
    city: 'Arequipa',
    region: 'Arequipa',
    country: 'Perú',
    countryCode: 'PE',
    streetAddress: null, // PENDIENTE: dirección exacta (ej. "Calle …, 123")
    district: null, // PENDIENTE: distrito (ej. "Yanahuara")
    reference: null, // PENDIENTE: referencia opcional
    mapsUrl: null, // PENDIENTE: enlace de Google Maps "Cómo llegar"
    mapEmbedUrl: null, // PENDIENTE: URL de inserción de Google Maps
    geo: null, // PENDIENTE: { latitude: -16.39, longitude: -71.53 }
  },

  contact: {
    whatsapp: null, // PENDIENTE: ej. '51XXXXXXXXX' (sin "+", sin espacios)
    whatsappDisplay: null, // PENDIENTE: ej. '+51 9XX XXX XXX'
    email: null, // PENDIENTE: ej. 'reservas@dominio.pe'
  },

  social: {
    instagram: null, // PENDIENTE: URL completa del perfil
    facebook: null,
    tiktok: null,
  },

  // PENDIENTE: horario de atención. Ejemplo:
  // [{ label: 'Sábados', days: ['Saturday'], opens: '12:00', closes: '18:00' }]
  hours: [],

  reservations: {
    maxPartySize: 12,
    maxDaysAhead: 90,
  },

  content: {
    // Cambiar a `false` cuando todas las fotos sean propias de Nuestra Raza.
    photosAreReferential: true,
  },
}
