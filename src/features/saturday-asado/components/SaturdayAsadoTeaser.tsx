import {
  Accent,
  Badge,
  ButtonLink,
  Heading,
  Illustration,
  PendingValue,
  ResponsivePicture,
  SectionLabel,
  TextLink,
} from '@/shared/components/atoms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { AVAILABILITY_LABELS, selectEventFacts } from '../domain/saturday-asado.selectors'
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'
import { useUpcomingDates } from '../hooks/useUpcomingDates'
import { DateBlock } from './DateBlock'
import { EventMenuList } from './EventMenuList'
import styles from './SaturdayAsadoTeaser.module.css'

/** Homepage section 6 — the Saturday asado gets the strongest emphasis (dark band). */
export function SaturdayAsadoTeaser({ event }: { event: SaturdayAsadoEvent }) {
  const { next } = useUpcomingDates(event.upcomingDates)
  const facts = selectEventFacts(event)

  return (
    <section
      id="asado-de-sabado"
      aria-labelledby="asado-teaser-titulo"
      data-tone="dark"
      className={cn(styles.section, surfaces.charcoal)}
    >
      <Illustration name="sprig" className={styles.sprig} />

      <div className={cn(layout.container, styles.grid)}>
        <div className={styles.mediaCol} data-reveal>
          <div className={styles.media}>
            <ResponsivePicture
              photo={photos.patioLuces}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className={styles.picture}
              imgClassName={styles.image}
            />
            <div aria-hidden="true" className={styles.shade} />
          </div>
          <p aria-hidden="true" className={styles.script}>
            Tradición argentina,
            <br />
            <span className={styles.scriptAccent}>alma peruana.</span>
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <SectionLabel tone="dark">{next ? 'Próximo Asado de Sábado' : event.recurrenceLabel}</SectionLabel>
            <Heading id="asado-teaser-titulo" size="h1" tone="dark">
              Asado de <Accent tone="dark">Sábado.</Accent>
            </Heading>
            <p className={cn(text.lead, styles.tagline)}>{event.tagline}</p>
          </div>

          <div className={styles.details}>
            <div className={styles.dateCol}>
              <DateBlock date={next} />
              <p className={styles.schedule}>
                {facts.schedule ? `Sábado · ${facts.schedule}` : <PendingValue tone="dark">Horario por confirmar</PendingValue>}
              </p>
              {next ? (
                <Badge variant="dark" className={styles.badge}>
                  {AVAILABILITY_LABELS[next.availability]}
                </Badge>
              ) : null}
            </div>
            <div>
              <p className={cn(text.label, styles.menuLabel)}>Menú especial</p>
              <EventMenuList courses={event.menu} compact />
            </div>
          </div>

          <div className={styles.actions}>
            <ButtonLink to="/asado-de-sabado" hash="reservar" withArrow>
              Reservar para el sábado
            </ButtonLink>
            <TextLink to="/asado-de-sabado" tone="dark">
              Conoce la experiencia
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
