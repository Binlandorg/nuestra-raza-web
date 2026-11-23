import { addDaysIso, formatPrice, formatTimeRange, isSaturday, parseIsoDate } from '@/shared/lib/format'
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
    capacity:
      event.capacity === 'unlimited'
        ? 'Sin límite'
        : event.capacity !== null
          ? `Limitados · Máx. ${event.capacity} personas`
          : null,
  }
}

/**
 * The next `count` Saturdays open for requests, from `fromIso` (inclusive).
 * With `openEverySaturday` they are generated week by week (exceptions in
 * `upcomingDates` override availability/notes); otherwise only confirmed dates.
 */
export function selectOpenSaturdays(event: SaturdayAsadoEvent, fromIso: string, count: number): AsadoDate[] {
  if (!event.openEverySaturday) return selectUpcomingDates(event.upcomingDates, fromIso).slice(0, count)

  const from = parseIsoDate(fromIso)
  if (!from) return []
  const firstSaturday = addDaysIso(fromIso, (6 - from.weekday + 7) % 7)
  const exceptions = new Map(event.upcomingDates.map((entry) => [entry.date, entry]))

  return Array.from({ length: count }, (_, week) => {
    const date = addDaysIso(firstSaturday, week * 7)
    return exceptions.get(date) ?? { date, availability: 'available' as const }
  })
}
