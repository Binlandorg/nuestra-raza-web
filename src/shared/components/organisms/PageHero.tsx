import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import motion from '@/shared/styles/motion.module.css'
import text from '@/shared/styles/typography.module.css'
import type { Photo } from '@/shared/types/media'
import { Heading } from '../atoms/Heading'
import { ResponsivePicture } from '../atoms/ResponsivePicture'
import { SectionLabel } from '../atoms/SectionLabel'
import { TornEdge } from '../atoms/TornEdge'
import styles from './PageHero.module.css'

export interface PageHeroProps {
  label: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  photo: Photo
  /** Extra decoration rendered over the photo (illustrations, script notes). */
  aside?: ReactNode
  size?: 'md' | 'lg'
  /** Surface of the following section for the torn-paper edge, or `null` for none. */
  edge?: 'cream' | 'sand' | 'charcoal' | null
  className?: string
}

/**
 * Cinematic dark hero shared by the inner pages (mockup #5):
 * full-bleed photograph, charcoal gradients for legibility and the editorial headline.
 */
export function PageHero({
  label,
  title,
  description,
  actions,
  photo,
  aside,
  size = 'md',
  edge = 'cream',
  className,
}: PageHeroProps) {
  return (
    <section
      data-tone="dark"
      className={cn(styles.hero, styles[size], className)}
    >
      <ResponsivePicture
        photo={photo}
        sizes="100vw"
        priority
        artDirected
        className={styles.picture}
        imgClassName={cn(styles.image, motion.heroSettle)}
      />
      <div aria-hidden="true" className={styles.shadeBottom} />
      <div aria-hidden="true" className={styles.shadeLeft} />

      {aside}

      <div className={cn(layout.container, styles.inner)}>
        <div className={styles.content}>
          <SectionLabel tone="dark">{label}</SectionLabel>
          <Heading as="h1" size="h1" tone="dark">
            {title}
          </Heading>
          {description ? <div className={cn(text.lead, styles.description)}>{description}</div> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      </div>

      {edge ? <TornEdge color={edge} /> : null}
    </section>
  )
}
