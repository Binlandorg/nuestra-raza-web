/**
 * ─────────────────────────────────────────────────────────────
 *  ASADO DE SÁBADO · Contenido y configuración del evento
 * ─────────────────────────────────────────────────────────────
 *  ⚠️ Horario, precio, cupos y fechas están PENDIENTES.
 *     Mientras sean `null` / [] el sitio muestra "Por confirmar".
 *
 *  Para publicar fechas:
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
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'

const address = getStreetAddress()

export const saturdayAsadoData: SaturdayAsadoEvent = {
  name: 'Asado de Sábado',
  tagline: 'Una tradición que comienza alrededor del fuego.',
  heroDescription: 'Una jornada alrededor del fuego, la buena carne y las largas sobremesas.',
  recurrenceLabel: 'Todos los sábados',

  schedule: { startTime: null, endTime: null }, // PENDIENTE: ej. { startTime: '13:00', endTime: '18:00' }
  pricePerPerson: null, // PENDIENTE: ej. 180
  priceNote: null, // PENDIENTE: ej. 'Incluye bebida de bienvenida, menú completo y postre.'
  capacity: null, // PENDIENTE: ej. 30
  upcomingDates: [], // PENDIENTE: ver ejemplo arriba

  intro: [
    'El Asado de Sábado es nuestra forma de celebrar la semana: una jornada pensada para llegar sin apuro, recibir la primera copa, ver al parrillero en acción y sentarse a una mesa donde todo se comparte.',
    'Inspirado en el ritual del asado argentino y servido con la calidez de la hospitalidad peruana: cortes a la parrilla, achuras, buen vino, música y una sobremesa que se estira hasta que la tarde lo pida.',
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
      answer:
        'Al responder tu solicitud te compartimos el precio por persona y el detalle de lo que incluye la jornada de ese sábado.',
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
