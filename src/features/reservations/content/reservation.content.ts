import type { Step } from '@/shared/components/molecules'

/** "Cómo reservar" — shared by /reservar and /asado-de-sabado. */
export const RESERVATION_STEPS: Step[] = [
  {
    title: 'Envía tu solicitud',
    description: 'Completa el formulario con la fecha, la cantidad de personas y tu número de WhatsApp.',
  },
  {
    title: 'Te confirmamos',
    description: 'Revisamos la disponibilidad y te respondemos por WhatsApp. Tu lugar queda reservado solo con nuestra confirmación.',
  },
  {
    title: 'Te esperamos junto al fuego',
    description: 'Llega con tiempo, sin apuro: la mesa, el vino y el asado te esperan.',
  },
]
