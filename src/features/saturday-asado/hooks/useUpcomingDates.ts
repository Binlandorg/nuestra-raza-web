import { useMemo } from 'react'
import { useToday } from '@/shared/hooks/useToday'
import { selectNextOpenDate, selectUpcomingDates } from '../domain/saturday-asado.selectors'
import type { AsadoDate } from '../domain/saturday-asado.types'

/**
 * Upcoming dates relative to the visitor's real "today" (the static HTML was
 * generated at build time, so past dates are hidden again on the client).
 */
export function useUpcomingDates(dates: readonly AsadoDate[]) {
  const today = useToday()
  return useMemo(
    () => ({ upcoming: selectUpcomingDates(dates, today), next: selectNextOpenDate(dates, today) }),
    [dates, today],
  )
}
