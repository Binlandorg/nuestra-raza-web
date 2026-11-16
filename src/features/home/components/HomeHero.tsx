import { Accent, ButtonLink, Illustration, ResponsivePicture, ScrollCue, SectionLabel, TornEdge } from '@/shared/components/atoms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import motion from '@/shared/styles/motion.module.css'
import text from '@/shared/styles/typography.module.css'
import { homeContent } from '../content/home.content'
import styles from './HomeHero.module.css'

/**
 * Homepage hero (section 1): the photograph dominates; charcoal gradients keep
 * the editorial headline legible on the left, as in the approved mockups.
 */
export function HomeHero() {
  const { hero } = homeContent

  return (
    <section aria-labelledby="hero-titulo" data-tone="dark" className={styles.hero}>
      <ResponsivePicture
        photo={photos.costillarFuego}
        sizes="100vw"
        priority
        artDirected
        className={styles.picture}
        imgClassName={cn(styles.image, motion.heroSettle)}
      />
      <div aria-hidden="true" className={styles.shadeBottom} />
      <div aria-hidden="true" className={styles.shadeLeft} />

      <div aria-hidden="true" className={styles.aside}>
        <Illustration name="cow" className={styles.cow} />
        <p className={styles.script}>
          Asado
          <br />
          Tradición
          <br />
          Encuentro
        </p>
      </div>

      <div className={cn(layout.container, styles.inner)}>
        <div className={styles.content}>
          <SectionLabel tone="dark">{hero.location}</SectionLabel>
          <h1 id="hero-titulo" className={cn(text.display, styles.title)}>
            El fuego
            <br />
            nos <Accent tone="dark">reúne.</Accent>
          </h1>
          <p className={cn(text.label, styles.supporting)}>{hero.supporting}</p>
          <div className={styles.cta}>
            <ButtonLink to="/reservar" size="lg" withArrow>
              {hero.cta}
            </ButtonLink>
          </div>
        </div>

        <ScrollCue href="#experiencias" className={styles.scrollCue} />
      </div>

      <TornEdge color="cream" />
    </section>
  )
}
