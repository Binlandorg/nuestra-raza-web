import { useMutation } from '@tanstack/react-query'
import type { ReservationRequest } from '../domain/reservation.types'
import { getReservationGateway } from '../gateways'

/** TanStack Query mutation wrapping the active reservation gateway. */
export function useReservationRequest() {
  return useMutation({
    mutationKey: ['reservations', 'request'],
    mutationFn: (request: ReservationRequest) => getReservationGateway().submit(request),
  })
}
