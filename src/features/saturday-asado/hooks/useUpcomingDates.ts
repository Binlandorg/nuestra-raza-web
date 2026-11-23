import { useMemo } from 'react'
import { useToday } from '@/shared/hooks/useToday'
import { selectNextOpenDate, selectUpcomingDates } from '../domain/saturday-asado.selectors'
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'

/**
 * Upcoming dates relative to the visitor's real "today" (the static HTML was
 * generated at build time, so past dates are hidden again on the client).
 * When the asado runs every Saturday there is no single "next date": the
 * weekly recurrence is the message, so `next` is `null`.
 */
export function useUpcomingDates({ upcomingDates, openEverySaturday }: SaturdayAsadoEvent) {
  const today = useToday()
  return useMemo(
    () => ({
      upcoming: selectUpcomingDates(upcomingDates, today),
      next: openEverySaturday ? null : selectNextOpenDate(upcomingDates, today),
    }),
    [upcomingDates, openEverySaturday, today],
  )
}
