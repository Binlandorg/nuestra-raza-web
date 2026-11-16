import { useSyncExternalStore } from 'react'
import { todayIso } from '@/shared/lib/format'

const noopSubscribe = () => () => {}

/**
 * Visitor's local date ("YYYY-MM-DD"). Returns `null` during prerender and
 * hydration so date-dependent markup never mismatches the static HTML.
 */
export function useToday(): string | null {
  return useSyncExternalStore(noopSubscribe, todayIso, () => null)
}
