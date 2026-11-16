import { Accent, ButtonLink, Illustration, TextLink } from '@/shared/components/atoms'
import { Quote, SectionHeading, StepList } from '@/shared/components/molecules'
import { CtaBand, PageHero } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import { formatTime } from '@/shared/lib/format'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import type { SaturdayAsadoEvent } from '@/features/saturday-asado'
import { PillarSection } from './components/PillarSection'
import { experiencePillars } from './content/experience.content'
import styles from './ExperiencePage.module.css'

/** /experiencia — the four pillars and the Saturday ritual. */
export function ExperiencePage({ event }: { event: SaturdayAsadoEvent }) {
  return (
    <>
      <PageHero
        label="El ritual del asado"
        title={
          <>
            La <Accent tone="dark">experiencia.</Accent>
          </>
        }
        description="Vive el asado como se debe: sin prisa, con buen fuego, cortes al punto y una mesa que invita a quedarse."
        photo={photos.parrilleroHumo}
        actions={
          <ButtonLink to="/reservar" withArrow>
            Reservar mesa
          </ButtonLink>
        }
      />

      {/* Intro + índice */}
      <section aria-labelledby="experiencia-intro-titulo" className={cn(styles.intro, surfaces.cream)}>
        <div className={cn(layout.container, styles.introGrid)}>
          <div className={styles.span7}>
            <SectionHeading
              id="experiencia-intro-titulo"
              label="Lo que nos hace distintos"
              title={
                <>
                  Más que un asado, <Accent>una vivencia.</Accent>
                </>
              }
              description="El fuego, la buena carne, el vino y la música se unen para crear un momento único. Aquí no solo se come: se comparte."
            />
          </div>
          <nav aria-label="Pilares de la experiencia" className={styles.span5}>
            <ol className={styles.index}>
              {experiencePillars.map((pillar) => (
                <li key={pillar.id}>
                  <a
                    href={`#${pillar.id}`}
                    className={styles.indexLink}
                  >
                    <span className={styles.indexNumber}>{pillar.number}</span>
                    <span>
                      {pillar.title} {pillar.accent.replace('.', '')}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {experiencePillars.map((pillar, index) => (
        <PillarSection
          key={pillar.id}
          pillar={pillar}
          reverse={index % 2 === 1}
          action={
            pillar.id === 'el-encuentro' ? (
              <TextLink to="/reservar" search={{ experiencia: 'evento-privado' }} tone="dark">
                Planifica tu celebración
              </TextLink>
            ) : undefined
          }
        />
      ))}

      {/* El ritual del sábado */}
      <section aria-labelledby="ritual-titulo" className={cn(styles.ritual, surfaces.cream)}>
        <Illustration name="mountain" className={styles.mountain} />
        <div className={cn(layout.container, styles.ritualGrid)}>
          <div className={styles.span5}>
            <div className={styles.ritualIntro}>
              <SectionHeading
                id="ritual-titulo"
                label="Asado de Sábado"
                title={
                  <>
                    El ritual <Accent>del sábado.</Accent>
                  </>
                }
                description={event.tagline}
                actions={
                  <>
                    <ButtonLink to="/asado-de-sabado" withArrow>
                      Conoce el Asado de Sábado
                    </ButtonLink>
                  </>
                }
              />
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

      <CtaBand
        actions={
          <ButtonLink to="/reservar" withArrow>
            Reservar mesa
          </ButtonLink>
        }
      >
        <Quote tone="dark">“Buena carne. Fuego lento. Largas sobremesas.”</Quote>
      </CtaBand>
    </>
  )
}
