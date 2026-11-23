import { Check } from 'lucide-react'
import {
  Accent,
  ButtonLink,
  Heading,
  Illustration,
  PendingValue,
  ResponsivePicture,
  SectionLabel,
  TextLink,
} from '@/shared/components/atoms'
import { Disclosure, Quote, SectionHeading, StepList } from '@/shared/components/molecules'
import { CtaBand, PageHero, SplitSection } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import { endSentence, formatTime } from '@/shared/lib/format'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { FoodCard, type MenuItem } from '@/features/menu'
import { ReservationSection } from '@/features/reservations'
import { EventFacts } from './components/EventFacts'
import { EventMenuList } from './components/EventMenuList'
import { UpcomingDates } from './components/UpcomingDates'
import { selectEventFacts } from './domain/saturday-asado.selectors'
import type { SaturdayAsadoEvent } from './domain/saturday-asado.types'
import styles from './SaturdayAsadoPage.module.css'

export interface SaturdayAsadoPageProps {
  event: SaturdayAsadoEvent
  /** Signature cuts shown as design-system "tarjetas de corte" (from the menu). */
  featuredCuts: MenuItem[]
}

/** /asado-de-sabado — the key commercial landing page, built to convert. */
export function SaturdayAsadoPage({ event, featuredCuts }: SaturdayAsadoPageProps) {
  const facts = selectEventFacts(event)
  const soldOutDates = event.upcomingDates.filter((d) => d.availability === 'sold-out').map((d) => d.date)

  return (
    <>
      {/* 1 · Hero */}
      <PageHero
        size="lg"
        label={event.recurrenceLabel}
        title={
          <>
            Asado de <Accent tone="dark">Sábado.</Accent>
          </>
        }
        description={event.heroDescription}
        photo={photos.mesaLargaVelas}
        actions={
          <>
            <ButtonLink to="/asado-de-sabado" hash="reservar" size="lg" withArrow>
              Reservar para el sábado
            </ButtonLink>
            <TextLink to="/asado-de-sabado" hash="la-jornada" tone="dark">
              Ver la jornada
            </TextLink>
          </>
        }
      />

      {/* Datos clave */}
      <section aria-label="Datos del evento" className={cn(styles.factsSection, surfaces.cream)}>
        <div className={layout.container}>
          <EventFacts event={event} className={styles.facts} />
        </div>
      </section>

      {/* 2 + 3 · La experiencia y qué incluye */}
      <SplitSection
        photo={photos.asadoAlAsador}
        labelledBy="experiencia-asado-titulo"
        photoOverlay={
          <p
            aria-hidden="true"
            className={styles.photoNote}
          >
            El asado no se apura.
            <br />
            Se comparte.
          </p>
        }
      >
        <div className={styles.experience}>
          <SectionHeading
            id="experiencia-asado-titulo"
            label="La experiencia"
            title={
              <>
                Una tradición que comienza <Accent>alrededor del fuego.</Accent>
              </>
            }
            description={event.intro.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          />
          <div>
            <h3 className={cn(text.label, styles.includesTitle)}>Qué incluye</h3>
            <ul className={styles.includes}>
              {event.includes.map((item) => (
                <li key={item} className={styles.include}>
                  <Check aria-hidden="true" strokeWidth={1.75} className={styles.includeIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SplitSection>

      {/* 5 · La jornada (cronograma) */}
      <section id="la-jornada" aria-labelledby="jornada-titulo" className={cn(styles.journey, surfaces.sand)}>
        <div className={cn(layout.container, styles.twoColumns)}>
          <div className={cn(styles.journeyIntro, styles.span5)}>
            <div className={styles.sticky}>
              <SectionHeading
                id="jornada-titulo"
                label="La jornada"
                title={
                  <>
                    Así se vive <Accent>un sábado.</Accent>
                  </>
                }
                description={
                  facts.schedule ? (
                    <p>
                      {endSentence(`De ${facts.schedule.replace(' – ', ' a ')}`)} Cada momento tiene su ritmo: nadie se
                      apura.
                    </p>
                  ) : (
                    <p>
                      Cada momento tiene su ritmo: nadie se apura. <PendingValue>Horario por confirmar.</PendingValue>
                    </p>
                  )
                }
              />
              <Illustration name="cow" className={styles.cow} />
            </div>
          </div>
          <div className={styles.span7}>
            <StepList
              steps={event.flow.map((step) => ({
                title: step.title,
                description: step.description,
                meta: step.time ? formatTime(step.time) : null,
              }))}
            />
          </div>
        </div>
      </section>

      {/* 4 · Menú especial */}
      <section
        aria-labelledby="menu-especial-titulo"
        data-tone="dark"
        className={cn(styles.menuSection, surfaces.charcoal)}
      >
        <div className={cn(layout.container, styles.menuGrid)}>
          <div className={cn(styles.menuContent, styles.span7)}>
            <div className={styles.menuHeading}>
              <SectionLabel tone="dark">Menú especial</SectionLabel>
              <Heading id="menu-especial-titulo" tone="dark">
                Lo que llega <Accent tone="dark">a la mesa.</Accent>
              </Heading>
            </div>
            <EventMenuList courses={event.menu} />
            <div className={styles.priceRow}>
              <p className={styles.price}>
                <span className={cn(text.label, styles.priceLabel)}>Precio por persona</span>
                {facts.price ? (
                  <span className={styles.priceValue}>{facts.price}</span>
                ) : (
                  <PendingValue tone="dark" className={styles.pricePending}>
                    Por confirmar
                  </PendingValue>
                )}
                {event.priceNote ? <span className={styles.small}>{event.priceNote}</span> : null}
              </p>
              <p className={cn(styles.small, styles.menuNote)}>{event.menuNote}</p>
            </div>
          </div>
          <div className={cn(styles.menuMediaCol, styles.span5)}>
            <div className={styles.menuMedia}>
              <ResponsivePicture
                photo={photos.parrilladaChimichurri}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className={styles.picture}
                imgClassName={styles.image}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cortes protagonistas (tarjetas de corte del sistema de diseño) */}
      {featuredCuts.length > 0 ? (
        <section aria-labelledby="cortes-jornada-titulo" className={cn(styles.topSection, surfaces.cream)}>
          <div className={cn(layout.container, styles.cutsInner)}>
            <SectionHeading
              id="cortes-jornada-titulo"
              label="De la parrilla"
              title={
                <>
                  Los cortes <Accent>de la jornada.</Accent>
                </>
              }
              description={<p>Los protagonistas de cada sábado, cocinados sin apuro sobre las brasas.</p>}
              actions={<TextLink to="/carta">Ver la carta completa</TextLink>}
            />
            <ul className={styles.cuts}>
              {featuredCuts.map((item) => (
                <li key={item.id}>
                  <FoodCard item={item} showPrice={false} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 6 · Fechas y disponibilidad */}
      <section aria-labelledby="fechas-titulo" className={cn(styles.topSection, surfaces.cream)}>
        <div className={cn(layout.container, styles.twoColumns, styles.tight)}>
          <div className={styles.span5}>
            <SectionHeading
              id="fechas-titulo"
              label="Fechas"
              title={
                <>
                  Próximos <Accent>sábados.</Accent>
                </>
              }
              description={
                event.capacity === 'unlimited' ? (
                  <p>Todos los sábados, sin límite de cupos: elige la fecha que mejor te quede.</p>
                ) : (
                  <p>Los cupos son limitados en cada jornada. Reserva con anticipación.</p>
                )
              }
            />
          </div>
          <div className={styles.span7}>
            <UpcomingDates event={event} />
          </div>
        </div>
      </section>

      {/* 7 · Reserva */}
      <ReservationSection
        id="reservar"
        label="Reservar"
        title={
          <>
            Reserva tu lugar <Accent>para el sábado.</Accent>
          </>
        }
        description={<p>Envíanos tu solicitud: te confirmamos la disponibilidad por WhatsApp.</p>}
        defaultExperience="asado-de-sabado"
        soldOutDates={soldOutDates}
        eventStartTime={event.schedule.startTime}
      />

      {/* 8 · Preguntas frecuentes */}
      <section aria-labelledby="faq-titulo" className={cn(styles.faqSection, surfaces.cream)}>
        <div className={cn(layout.container, styles.twoColumns, styles.tight)}>
          <div className={styles.span4}>
            <SectionHeading
              id="faq-titulo"
              label="Preguntas frecuentes"
              title={
                <>
                  Antes de <Accent>venir.</Accent>
                </>
              }
            />
          </div>
          <div className={cn(styles.faqList, styles.span8)}>
            {event.faq.map((entry) => (
              <Disclosure key={entry.question} title={entry.question} name="faq-asado">
                <p>{entry.answer}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        actions={
          <ButtonLink to="/asado-de-sabado" hash="reservar" withArrow>
            Reservar para el sábado
          </ButtonLink>
        }
      >
        <Quote tone="dark">“El fuego nos reúne.”</Quote>
      </CtaBand>
    </>
  )
}
