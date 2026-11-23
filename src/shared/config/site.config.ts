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
    // Decisión del negocio: no mostrar "®".
    showRegisteredMark: false,
  },

  location: {
    city: 'Arequipa',
    region: 'Arequipa',
    country: 'Perú',
    countryCode: 'PE',
    streetAddress: 'Nueva Juventud',
    district: 'Santa Rita de Siguas',
    reference: 'A espaldas del jardín inicial',
    // El mapa apunta al distrito (Santa Rita de Siguas), no al local exacto.
    // Para precisarlo, reemplazar por el enlace y la inserción del pin del local.
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Santa+Rita+de+Siguas%2C+Arequipa%2C+Per%C3%BA',
    mapEmbedUrl: 'https://www.google.com/maps?q=Santa+Rita+de+Siguas,+Arequipa,+Per%C3%BA&z=13&output=embed',
    geo: null, // PENDIENTE: coordenadas del local, ej. { latitude: -16.39, longitude: -71.53 }
  },

  contact: {
    whatsapp: '51950070020',
    whatsappDisplay: '+51 950 070 020',
    email: 'asadodesabado@gmail.com',
  },

  // Aún no hay redes sociales: mientras todas sean `null`, el sitio oculta esas secciones.
  social: {
    instagram: null, // URL completa del perfil cuando exista
    facebook: null,
    tiktok: null,
  },

  hours: [{ label: 'Sábados', days: ['Saturday'], opens: '16:00', closes: '21:00' }],

  reservations: {
    maxPartySize: 12,
    maxDaysAhead: 90,
  },

  content: {
    // Cambiar a `false` cuando todas las fotos sean propias de Nuestra Raza.
    photosAreReferential: true,
  },
}
