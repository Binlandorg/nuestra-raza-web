import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Photo } from '@/shared/types/media'
import surfaces from '@/shared/styles/surfaces.module.css'
import { ResponsivePicture } from '../atoms/ResponsivePicture'
import styles from './SplitSection.module.css'

export type Surface = 'cream' | 'sand' | 'charcoal'


export interface SplitSectionProps {
  photo: Photo
  /** Content column (heading, copy, links). */
  children: ReactNode
  /** Image on the right instead of the left. */
  reverse?: boolean
  surface?: Surface
  /** Overlay rendered on top of the photo (script note, inset photo…). */
  photoOverlay?: ReactNode
  /** Decorative element placed in the content column (illustration). */
  decoration?: ReactNode
  id?: string
  labelledBy?: string
  className?: string
}

/**
 * Editorial split: a photograph bleeding to the viewport edge and a content
 * column aligned with the site container (homepage & design-system mockups).
 */
export function SplitSection({
  photo,
  children,
  reverse = false,
  surface = 'cream',
  photoOverlay,
  decoration,
  id,
  labelledBy,
  className,
}: SplitSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={surface === 'charcoal' ? 'dark' : undefined}
      className={cn(styles.section, surfaces[surface], reverse && styles.reverse, className)}
    >
      <div className={styles.media}>
        <ResponsivePicture
          photo={photo}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={styles.picture}
          imgClassName={styles.image}
        />
        {photoOverlay}
      </div>

      <div className={styles.content}>
        {decoration}
        <div className={styles.inner}>{children}</div>
      </div>
    </section>
  )
}
