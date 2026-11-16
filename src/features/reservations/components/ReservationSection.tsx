import type { ReactNode } from 'react'
import { BrandIcon, TextAnchor } from '@/shared/components/atoms'
import { SectionHeading, StepList } from '@/shared/components/molecules'
import { cn } from '@/shared/lib/cn'
import { getBusinessWhatsAppUrl } from '@/shared/lib/whatsapp'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import { RESERVATION_STEPS } from '../content/reservation.content'
import { ReservationForm, type ReservationFormProps } from './ReservationForm'
import styles from './ReservationSection.module.css'

export interface ReservationSectionProps extends ReservationFormProps {
  id?: string
  label?: string
  title: ReactNode
  description?: ReactNode
  surface?: 'cream' | 'sand'
  /** Heading level of the section title (h1 on /reservar, h2 when embedded). */
  titleAs?: 'h1' | 'h2'
}

/** "Cómo reservar" steps + the reservation form card. */
export function ReservationSection({
  id,
  label = 'Reservas',
  title,
  description,
  surface = 'cream',
  titleAs = 'h2',
  ...formProps
}: ReservationSectionProps) {
  const whatsappUrl = getBusinessWhatsAppUrl('Hola Nuestra Raza, quisiera hacer una consulta sobre reservas.')
  const titleId = id ? `${id}-titulo` : undefined

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(styles.section, surfaces[surface])}
    >
      <div className={cn(layout.container, styles.grid)}>
        <div className={styles.aside}>
          <SectionHeading id={titleId} titleAs={titleAs} label={label} title={title} description={description} />
          <StepList steps={RESERVATION_STEPS} />
          {whatsappUrl ? (
            <p className={styles.direct}>
              ¿Prefieres escribirnos directamente?{' '}
              <TextAnchor href={whatsappUrl} target="_blank" rel="noopener noreferrer" withArrow={false}>
                <BrandIcon name="whatsapp" className={styles.icon} />
                Abrir WhatsApp
              </TextAnchor>
            </p>
          ) : null}
        </div>

        <div className={styles.formColumn}>
          <div className={styles.card}>
            <ReservationForm {...formProps} />
          </div>
        </div>
      </div>
    </section>
  )
}
