import { Accent, ButtonLink, Container, Heading, Illustration, SectionLabel, TextLink } from '@/shared/components/atoms'
import { cn } from '@/shared/lib/cn'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import styles from './system.module.css'

/** 404 — rendered inside the site layout by the root route. */
export function NotFoundPage() {
  return (
    <section data-tone="dark" className={cn(styles.section, styles.notFound, surfaces.charcoal)}>
      <Illustration name="cow" className={styles.cow} />
      <Container className={styles.inner}>
        <SectionLabel tone="dark">Error 404</SectionLabel>
        <Heading as="h1" size="h1" tone="dark">
          Esta mesa <Accent tone="dark">no existe.</Accent>
        </Heading>
        <p className={cn(text.lead, styles.text)}>
          La página que buscas no está en nuestra parrilla. Quizás cambió de lugar o el enlace ya no está vigente.
        </p>
        <div className={styles.actions}>
          <ButtonLink to="/" withArrow>
            Volver al inicio
          </ButtonLink>
          <TextLink to="/carta" tone="dark">
            Ver la carta
          </TextLink>
        </div>
      </Container>
    </section>
  )
}
