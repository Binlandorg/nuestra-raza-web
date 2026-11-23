import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { PendingValue, type Tone } from '@/shared/components/atoms'
import { InfoItem } from '@/shared/components/molecules'
import { getCityLine } from '@/shared/lib/business'
import { cn } from '@/shared/lib/cn'
import { selectEventFacts } from '../domain/saturday-asado.selectors'
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'
import styles from './EventFacts.module.css'

/** Key facts row: when, schedule, seats, place. Unconfirmed values read "Por confirmar". */
export function EventFacts({ event, tone = 'light', className }: { event: SaturdayAsadoEvent; tone?: Tone; className?: string }) {
  const facts = selectEventFacts(event)

  return (
    <ul className={cn(styles.facts, className)}>
      <li>
        <InfoItem icon={CalendarDays} label="Cuándo" tone={tone}>
          {event.recurrenceLabel}
        </InfoItem>
      </li>
      <li>
        <InfoItem icon={Clock} label="Horario" tone={tone}>
          {facts.schedule ?? <PendingValue tone={tone} />}
        </InfoItem>
      </li>
      <li>
        <InfoItem icon={Users} label="Cupos" tone={tone}>
          {facts.capacity ?? <PendingValue tone={tone}>Limitados · por confirmar</PendingValue>}
        </InfoItem>
      </li>
      <li>
        <InfoItem icon={MapPin} label="Dónde" tone={tone}>
          {getCityLine()}
        </InfoItem>
      </li>
    </ul>
  )
}
