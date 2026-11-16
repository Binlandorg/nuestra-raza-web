import { z } from 'zod'
import { addDaysIso, isSaturday, parseIsoDate } from '@/shared/lib/format'
import { normalizePhone } from '@/shared/lib/whatsapp'
import {
  RESERVATION_EXPERIENCE_IDS,
  type ReservationFormValues,
  type ReservationRequest,
} from './reservation.types'

export interface ReservationSchemaOptions {
  /** Visitor's "today" (YYYY-MM-DD); `null` while prerendering (date bounds skipped). */
  today: string | null
  maxDaysAhead: number
  /** Saturdays marked as sold out. */
  soldOutDates: readonly string[]
}

const PHONE_CHARACTERS = /^[+\d\s().-]+$/
const TIME = /^\d{2}:\d{2}$/

/** Validation rules for the reservation form (Spanish messages, shown inline). */
export function createReservationSchema({ today, maxDaysAhead, soldOutDates }: ReservationSchemaOptions) {
  const lastDay = today ? addDaysIso(today, maxDaysAhead) : null

  const fields = z.object({
    experience: z.enum(RESERVATION_EXPERIENCE_IDS),
    name: z
      .string()
      .trim()
      .min(2, 'Escribe tu nombre (mínimo 2 letras).')
      .max(80, 'El nombre es demasiado largo.'),
    phone: z
      .string()
      .trim()
      .min(1, 'Necesitamos tu número de WhatsApp para confirmarte.')
      .regex(PHONE_CHARACTERS, 'Usa solo números, espacios o el signo +.')
      .refine((value) => {
        const digits = normalizePhone(value).length
        return digits >= 8 && digits <= 15
      }, 'Revisa el número. Si no es de Perú, incluye el código de país (ej. +54…).'),
    date: z
      .string()
      .min(1, 'Elige una fecha.')
      .refine((value) => parseIsoDate(value) !== null, 'La fecha no es válida.')
      .refine((value) => today === null || value >= today, 'Elige una fecha a partir de hoy.')
      .refine(
        (value) => lastDay === null || value <= lastDay,
        `Recibimos solicitudes con hasta ${maxDaysAhead} días de anticipación.`,
      )
      .refine((value) => !soldOutDates.includes(value), 'Ese sábado ya no tiene cupos. Prueba con otra fecha.'),
    time: z.string().refine((value) => value === '' || TIME.test(value), 'La hora no es válida.'),
    guests: z.string().min(1, 'Indica cuántas personas vienen.'),
    comments: z.string().trim().max(500, 'Máximo 500 caracteres.'),
  })

  const dateAndExperience = fields.pick({ date: true, experience: true })

  return fields.refine((values) => values.experience !== 'asado-de-sabado' || isSaturday(values.date), {
    path: ['date'],
    message: 'El Asado de Sábado se realiza solo los sábados: elige un sábado.',
    // Cross-field rule: evaluate as soon as date + experience are valid on their own.
    when: (payload) => dateAndExperience.safeParse(payload.value).success,
  })
}

/** Form values → normalized request. */
export function toReservationRequest(values: ReservationFormValues): ReservationRequest {
  const comments = values.comments.trim()
  return {
    experience: values.experience,
    name: values.name.trim(),
    phone: values.phone.trim(),
    date: values.date,
    time: values.time || null,
    guests: values.guests,
    comments: comments ? comments : null,
  }
}
