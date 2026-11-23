/**
 * ─────────────────────────────────────────────────────────────
 *  ASADO DE SÁBADO · Contenido y configuración del evento
 * ─────────────────────────────────────────────────────────────
 *  Todos los sábados de 4:00 p. m. a 9:00 p. m., sin límite de cupos.
 *  ⚠️ El precio por persona es REFERENCIAL.
 *
 *  Con `openEverySaturday: true` cualquier sábado se puede solicitar y
 *  `upcomingDates` solo registra excepciones (un sábado agotado, una nota):
 *    upcomingDates: [
 *      { date: '2026-11-21', availability: 'available' },
 *      { date: '2026-11-28', availability: 'few-spots', note: 'Con música en vivo' },
 *    ]
 *  availability: 'available' | 'few-spots' | 'sold-out'
 *  Las fechas pasadas se ocultan automáticamente.
 * ─────────────────────────────────────────────────────────────
 */
import { siteConfig } from '@/shared/config/site.config'
import { getStreetAddress } from '@/shared/lib/business'
import { formatPrice } from '@/shared/lib/format'
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'

const address = getStreetAddress()

/** Precio REFERENCIAL por persona (estimado de mercado) hasta tener el real. */
const PRICE_PER_PERSON = 120

export const saturdayAsadoData: SaturdayAsadoEvent = {
  name: 'Asado de Sábado',
  tagline: 'Una tradición que comienza alrededor del fuego.',
  heroDescription: 'Una jornada alrededor del fuego, la buena carne y las largas sobremesas.',
  recurrenceLabel: 'Todos los sábados',

  schedule: { startTime: '16:00', endTime: '21:00' },
  pricePerPerson: PRICE_PER_PERSON,
  priceNote: 'Precio referencial.',
  capacity: 'unlimited',
  openEverySaturday: true,
  upcomingDates: [],

  intro: [
    'El Asado de Sábado es nuestra forma de celebrar la semana: una jornada pensada para llegar sin apuro, recibir la primera copa, ver al parrillero en acción y sentarse a una mesa donde todo se comparte.',
    'Inspirado en el ritual del asado argentino y servido con la calidez de la hospitalidad peruana: cortes a la parrilla, achuras, buen vino, música y una sobremesa que se estira hasta que la noche lo pida.',
  ],

  includes: [
    'Bebida de bienvenida y entradas',
    'Chorizo, morcilla y provoleta',
    'Cortes principales a la parrilla',
    'Acompañamientos y salsas de la casa',
    'Postre y café',
    'Música y sobremesa',
  ],

  flow: [
    {
      title: 'Bienvenida',
      description: 'Una bebida de bienvenida y algo para picar mientras el fuego toma temperatura.',
      time: null,
    },
    {
      title: 'Presentación de los cortes',
      description: 'El parrillero presenta los cortes del día y cuenta cómo los va a cocinar.',
      time: null,
    },
    {
      title: 'Chorizo, morcilla y provoleta',
      description: 'Llegan las primeras achuras y la provoleta: la previa de todo buen asado.',
      time: null,
    },
    {
      title: 'Cortes principales',
      description: 'Tira de asado, vacío, entraña y otros cortes, servidos al punto y para compartir.',
      time: null,
    },
    {
      title: 'Acompañamientos y salsas',
      description: 'Ensaladas, papas y las salsas de la casa: chimichurri y salsa criolla.',
      time: null,
    },
    {
      title: 'Postre y café',
      description: 'Un final dulce y un café para acompañar la conversación.',
      time: null,
    },
    {
      title: 'Música y sobremesa',
      description: 'Folklore, rock nacional y una sobremesa larga, como debe ser.',
      time: null,
    },
  ],

  menu: [
    { course: 'Para empezar', items: ['Empanada criolla', 'Choripán', 'Provoleta'] },
    { course: 'De la parrilla', items: ['Chorizo y morcilla', 'Tira de asado', 'Vacío', 'Entraña'] },
    { course: 'Para acompañar', items: ['Ensaladas y papas', 'Chimichurri y salsa criolla'] },
    { course: 'Para cerrar', items: ['Postre de la casa', 'Café'] },
  ],
  menuNote: 'El menú puede variar según la temporada y la disponibilidad de los cortes.',

  faq: [
    {
      question: '¿Cómo reservo?',
      answer:
        'Completa el formulario con tu nombre, número de WhatsApp, fecha y cantidad de personas. Al enviarlo se abrirá WhatsApp con tu solicitud lista para enviar.',
    },
    {
      question: '¿Mi reserva queda confirmada al enviar la solicitud?',
      answer:
        'No. Toda solicitud está sujeta a disponibilidad: tu lugar queda confirmado únicamente cuando Nuestra Raza te responde por WhatsApp.',
    },
    {
      question: '¿Cuánto cuesta y qué incluye?',
      answer: `El precio referencial es de ${formatPrice(PRICE_PER_PERSON)} por persona e incluye bebida de bienvenida, entradas, achuras, cortes a la parrilla, acompañamientos, postre y café. Al responder tu solicitud te confirmamos el precio y el detalle de ese sábado.`,
    },
    {
      question: '¿Hay opciones para quienes no comen carne?',
      answer:
        'Cuéntanos en el campo de comentarios y te responderemos con las opciones disponibles para esa fecha.',
    },
    {
      question: '¿Puedo reservar para un cumpleaños o un grupo grande?',
      answer: `Sí. Indica la ocasión en tu solicitud. Para más de ${siteConfig.reservations.maxPartySize} personas elige «Evento privado o grupo grande» en el formulario y lo coordinamos contigo.`,
    },
    {
      question: '¿Dónde se realiza?',
      answer: address
        ? `En ${address}, ${siteConfig.location.city}.`
        : `En ${siteConfig.location.city}, ${siteConfig.location.country}. La dirección exacta se publicará muy pronto en esta página.`,
    },
  ],
}
