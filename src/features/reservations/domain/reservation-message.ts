import { siteConfig } from '@/shared/config/site.config'
import { formatDateLong, formatTime } from '@/shared/lib/format'
import { RESERVATION_EXPERIENCES, type ReservationRequest } from './reservation.types'

const guestsLabel = (guests: string) =>
  guests.endsWith('+') ? `Más de ${guests.slice(0, -1)} personas` : `${guests} ${guests === '1' ? 'persona' : 'personas'}`

/** Pre-formatted WhatsApp message the visitor sends to the business. */
export function buildReservationMessage(request: ReservationRequest): string {
  const lines = [
    `Hola, ${siteConfig.brand.name} 🔥`,
    'Quisiera solicitar una reserva:',
    '',
    `• Experiencia: ${RESERVATION_EXPERIENCES[request.experience]}`,
    `• Nombre: ${request.name}`,
    `• Fecha: ${formatDateLong(request.date, { withYear: true })}`,
    `• Hora preferida: ${request.time ? formatTime(request.time) : 'Sin preferencia'}`,
    `• Personas: ${guestsLabel(request.guests)}`,
    `• WhatsApp de contacto: ${request.phone}`,
  ]

  if (request.comments) lines.push(`• Comentarios: ${request.comments}`)

  lines.push('', 'Quedo a la espera de su confirmación. ¡Gracias!')
  return lines.join('\n')
}

export { guestsLabel }
