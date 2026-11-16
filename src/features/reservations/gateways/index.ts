import { env } from '@/shared/config/env'
import type { ReservationGateway } from '../domain/reservation.types'
import { createHttpReservationGateway } from './http-reservation.gateway'
import { whatsappReservationGateway } from './whatsapp-reservation.gateway'

/**
 * Picks the reservation channel. Setting `VITE_RESERVATIONS_ENDPOINT` switches
 * the whole site to a booking backend without touching any UI component.
 */
export function getReservationGateway(): ReservationGateway {
  return env.reservationsEndpoint ? createHttpReservationGateway(env.reservationsEndpoint) : whatsappReservationGateway
}
