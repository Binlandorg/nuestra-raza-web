export const RESERVATION_EXPERIENCES = {
  'asado-de-sabado': 'Asado de Sábado',
  'evento-privado': 'Evento privado o grupo grande',
} as const

export type ReservationExperience = keyof typeof RESERVATION_EXPERIENCES

export const RESERVATION_EXPERIENCE_IDS = Object.keys(RESERVATION_EXPERIENCES) as [
  ReservationExperience,
  ...ReservationExperience[],
]

export const isReservationExperience = (value: unknown): value is ReservationExperience =>
  typeof value === 'string' && value in RESERVATION_EXPERIENCES

/** Raw values handled by the form (all strings, as typed by the visitor). */
export interface ReservationFormValues {
  experience: ReservationExperience
  name: string
  phone: string
  date: string
  time: string
  guests: string
  comments: string
}

/** Normalized request handed to a reservation gateway (WhatsApp today, booking API tomorrow). */
export interface ReservationRequest {
  experience: ReservationExperience
  name: string
  phone: string
  /** "YYYY-MM-DD" */
  date: string
  /** "HH:MM" or `null` (no preference). */
  time: string | null
  /** Number of guests, or `"13+"`-style large group label. */
  guests: string
  comments: string | null
}

/**
 * A request is never an automatic confirmation: the business confirms
 * availability afterwards. Both channels resolve to "pending-confirmation".
 */
export type ReservationResult =
  | { channel: 'whatsapp'; status: 'pending-confirmation'; whatsappUrl: string; opened: boolean }
  | { channel: 'api'; status: 'pending-confirmation'; reference: string | null }

export interface ReservationGateway {
  readonly channel: ReservationResult['channel']
  submit(request: ReservationRequest): Promise<ReservationResult>
}

/** No reservation channel configured yet (WhatsApp number / endpoint missing). */
export class ReservationChannelUnavailableError extends Error {
  override name = 'ReservationChannelUnavailableError'
}
