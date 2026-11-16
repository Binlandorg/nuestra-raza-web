import { formatPrice, formatTimeRange, isSaturday } from '@/shared/lib/format'
import type { AsadoDate, DateAvailability, SaturdayAsadoEvent } from './saturday-asado.types'

export const AVAILABILITY_LABELS: Record<DateAvailability, string> = {
  available: 'Cupos disponibles',
  'few-spots': 'Últimos cupos',
  'sold-out': 'Agotado',
}

/** Confirmed Saturdays from `today` on, sorted. Invalid (non-Saturday) dates are ignored. */
export function selectUpcomingDates(dates: readonly AsadoDate[], today: string | null): AsadoDate[] {
  return dates
    .filter((entry) => isSaturday(entry.date) && (today === null || entry.date >= today))
    .toSorted((a, b) => a.date.localeCompare(b.date))
}

/** Next Saturday that still accepts requests. */
export function selectNextOpenDate(dates: readonly AsadoDate[], today: string | null): AsadoDate | null {
  return selectUpcomingDates(dates, today).find((entry) => entry.availability !== 'sold-out') ?? null
}

/** Display strings — `null` means "por confirmar". */
export function selectEventFacts(event: SaturdayAsadoEvent) {
  return {
    schedule: event.schedule.startTime ? formatTimeRange(event.schedule.startTime, event.schedule.endTime) : null,
    price: event.pricePerPerson !== null ? formatPrice(event.pricePerPerson) : null,
    capacity: event.capacity !== null ? `Máx. ${event.capacity} personas` : null,
  }
}
