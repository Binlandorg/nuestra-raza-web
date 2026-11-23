import { Badge, type BadgeVariant } from '@/shared/components/atoms'
import { endSentence, formatDateLong } from '@/shared/lib/format'
import { AVAILABILITY_LABELS, selectEventFacts } from '../domain/saturday-asado.selectors'
import type { AsadoDate, DateAvailability, SaturdayAsadoEvent } from '../domain/saturday-asado.types'
import { useUpcomingDates } from '../hooks/useUpcomingDates'
import styles from './UpcomingDates.module.css'

const BADGES: Record<DateAvailability, BadgeVariant> = {
  available: 'olive',
  'few-spots': 'terracotta',
  'sold-out': 'outline',
}

/**
 * Open every Saturday → the weekly recurrence (plus any exception: sold out, special note).
 * Otherwise → confirmed upcoming Saturdays with their availability, or an honest "por confirmar".
 */
export function UpcomingDates({ event }: { event: SaturdayAsadoEvent }) {
  const { upcoming } = useUpcomingDates(event)
  const { schedule } = selectEventFacts(event)

  if (event.openEverySaturday) {
    return (
      <div className={styles.stack}>
        <div className={styles.panel}>
          <p className={styles.panelTitle}>Abrimos todos los sábados</p>
          <p className={styles.panelText}>
            {schedule ? `${endSentence(`De ${schedule.replace(' – ', ' a ')}`)} ` : null}
            Envíanos tu solicitud con el sábado que prefieras y te confirmaremos la reserva por WhatsApp.
          </p>
        </div>
        {upcoming.length > 0 ? <DateList dates={upcoming} /> : null}
      </div>
    )
  }

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

  return <DateList dates={upcoming} />
}

function DateList({ dates }: { dates: readonly AsadoDate[] }) {
  return (
    <ul className={styles.list}>
      {dates.map((entry) => (
        <li key={entry.date} className={styles.item}>
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
