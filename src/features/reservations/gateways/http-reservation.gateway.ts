import type { ReservationGateway } from '../domain/reservation.types'

/**
 * Future booking backend: POSTs the request as JSON.
 * Expected response: 2xx with optional `{ "reference": "NR-1234" }`.
 */
export function createHttpReservationGateway(endpoint: string): ReservationGateway {
  return {
    channel: 'api',
    async submit(request) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(15_000),
      })

      if (!response.ok) {
        throw new Error(`Reservation endpoint responded ${response.status}`)
      }

      const body: unknown = await response.json().catch(() => null)
      const reference =
        body && typeof body === 'object' && 'reference' in body && typeof body.reference === 'string'
          ? body.reference
          : null

      return { channel: 'api', status: 'pending-confirmation', reference }
    },
  }
}
