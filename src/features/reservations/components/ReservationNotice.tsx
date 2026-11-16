import { Hourglass } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import styles from './ReservationNotice.module.css'

/** Makes explicit that a request is NOT an automatic confirmation. */
export function ReservationNotice({ channel, className }: { channel: 'whatsapp' | 'api'; className?: string }) {
  return (
    <p className={cn(styles.notice, className)}>
      <Hourglass aria-hidden="true" strokeWidth={1.5} className={styles.icon} />
      <span>
        <strong className={styles.strong}>Tu reserva aún no está confirmada.</strong>{' '}
        {channel === 'whatsapp'
          ? 'Al enviar se abrirá WhatsApp con tu solicitud lista: envíala y te confirmaremos la disponibilidad por ese medio.'
          : 'Revisaremos la disponibilidad y te confirmaremos por WhatsApp.'}
      </span>
    </p>
  )
}
