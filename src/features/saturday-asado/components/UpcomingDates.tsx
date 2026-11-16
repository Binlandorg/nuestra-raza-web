import { Badge, type BadgeVariant } from '@/shared/components/atoms'
import { formatDateLong } from '@/shared/lib/format'
import { AVAILABILITY_LABELS } from '../domain/saturday-asado.selectors'
import type { AsadoDate, DateAvailability } from '../domain/saturday-asado.types'
import { useUpcomingDates } from '../hooks/useUpcomingDates'
import styles from './UpcomingDates.module.css'

const BADGES: Record<DateAvailability, BadgeVariant> = {
  available: 'olive',
  'few-spots': 'terracotta',
  'sold-out': 'outline',
}

/** Confirmed upcoming Saturdays with their availability, or an honest "por confirmar". */
export function UpcomingDates({ dates }: { dates: readonly AsadoDate[] }) {
  const { upcoming } = useUpcomingDates(dates)

  if (upcoming.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={styles.panelTitle}>Próximas fechas por confirmar</p>
        <p className={styles.panelText}>
          Estamos preparando el calendario. Envíanos tu solicitud con el sábado que prefieras y te confirmaremos la
          disponibilidad por WhatsApp.
        </p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {upcoming.map((entry) => (
        <li
          key={entry.date}
          className={styles.item}
        >
          <span className={styles.dateCol}>
            <span className={styles.date}>{formatDateLong(entry.date)}</span>
            {entry.note ? <span className={styles.note}>{entry.note}</span> : null}
          </span>
          <Badge variant={BADGES[entry.availability]}>{AVAILABILITY_LABELS[entry.availability]}</Badge>
        </li>
      ))}
    </ul>
  )
}
