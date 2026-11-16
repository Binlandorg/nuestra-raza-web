import { Accent, Heading, SectionLabel, TextLink, TornEdge } from '@/shared/components/atoms'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { ReservationSection } from './components/ReservationSection'
import type { ReservationExperience } from './domain/reservation.types'
import styles from './ReservationPage.module.css'

export interface ReservationPageProps {
  experience: ReservationExperience
  soldOutDates: readonly string[]
  eventStartTime: string | null
}

/** /reservar — focused, distraction-free reservation request page. */
export function ReservationPage({ experience, soldOutDates, eventStartTime }: ReservationPageProps) {
  return (
    <>
      <section data-tone="dark" className={cn(styles.hero, surfaces.charcoal)}>
        <div className={cn(layout.container, styles.heroInner)}>
          <SectionLabel tone="dark">Reservas</SectionLabel>
          <Heading as="h1" size="h1" tone="dark">
            Reserva tu <Accent tone="dark">lugar en la mesa.</Accent>
          </Heading>
          <p className={cn(text.lead, styles.intro)}>
            Envíanos tu solicitud y te confirmaremos la disponibilidad por WhatsApp. Sin apuro, como se hacen las cosas
            alrededor del fuego.
          </p>
        </div>
        <TornEdge color="cream" />
      </section>

      <ReservationSection
        title={
          <>
            Cómo <Accent>reservar.</Accent>
          </>
        }
        label="Paso a paso"
        defaultExperience={experience}
        soldOutDates={soldOutDates}
        eventStartTime={eventStartTime}
      />

      <div className={styles.more}>
        <TextLink to="/asado-de-sabado">Conoce cómo es el Asado de Sábado</TextLink>
      </div>
    </>
  )
}
