import { formatDateParts } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { AsadoDate } from '../domain/saturday-asado.types'
import styles from './DateBlock.module.css'

/**
 * Large editorial date ("24 / MAY") from the homepage mockup.
 * Without a confirmed date it shows the weekly recurrence instead — never an invented date.
 */
export function DateBlock({ date, className }: { date: AsadoDate | null; className?: string }) {
  const parts = date ? formatDateParts(date.date) : null

  if (parts) {
    return (
      <p className={cn(styles.block, className)}>
        <span className={cn(text.label, styles.weekday)}>{parts.weekday}</span>
        <span className={styles.day}>{parts.day}</span>
        <span className={styles.month}>{parts.month}</span>
      </p>
    )
  }

  return (
    <p className={cn(styles.block, className)}>
      <span className={cn(text.label, styles.weekday)}>Cada semana</span>
      <span className={styles.recurring}>Sáb.</span>
      <span className={styles.recurrence}>Todos los sábados</span>
    </p>
  )
}
