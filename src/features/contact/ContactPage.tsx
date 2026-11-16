import { Accent, ButtonLink } from '@/shared/components/atoms'
import { SectionHeading } from '@/shared/components/molecules'
import { PageHero } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import styles from './ContactPage.module.css'
import { ContactDetails } from './components/ContactDetails'
import { ContactForm } from './components/ContactForm'
import { LocationMap } from './components/LocationMap'

/** /contacto — location, channels, hours, map and contact form. */
export function ContactPage() {
  return (
    <>
      <PageHero
        label="Contáctanos"
        title={
          <>
            Nos vemos <Accent tone="dark">en la parrilla.</Accent>
          </>
        }
        description="Escríbenos para consultas, celebraciones o cualquier duda. Te responderemos lo antes posible."
        photo={photos.andesAtardecer}
      />

      <section aria-label="Información de contacto" className={cn(styles.section, surfaces.cream)}>
        <div className={cn(layout.container, styles.grid)}>
          <div className={styles.info}>
            <SectionHeading
              label="Dónde y cuándo"
              title={
                <>
                  Te esperamos <Accent>en Arequipa.</Accent>
                </>
              }
            />
            <ContactDetails />
            <LocationMap />
          </div>

          <div className={styles.formColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={text.h3}>¿Tienes alguna consulta?</h2>
                <p className={styles.soft}>Escríbenos y te responderemos lo antes posible.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className={cn(styles.band, surfaces.sand)}>
        <div className={cn(layout.container, styles.bandInner)}>
          <div className={styles.bandText}>
            <h2 className={text.h3}>¿Quieres reservar?</h2>
            <p className={styles.soft}>Las reservas tienen su propio formulario, más rápido y directo.</p>
          </div>
          <ButtonLink to="/reservar" withArrow>
            Reservar mesa
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
