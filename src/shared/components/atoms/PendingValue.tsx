import { cn } from '@/shared/lib/cn'
import styles from './atoms.module.css'
import type { Tone } from './Button'

export interface PendingValueProps {
  /** Defaults to "Por confirmar". */
  children?: string
  tone?: Tone
  className?: string
}

/**
 * Discreet placeholder for business data that has not been confirmed yet
 * (address, hours, prices, dates). Never replace it with invented data.
 */
export function PendingValue({ children = 'Por confirmar', tone = 'light', className }: PendingValueProps) {
  return (
    <span className={cn(styles.pending, tone === 'dark' && styles.pendingDark, className)}>
      {children}
    </span>
  )
}
