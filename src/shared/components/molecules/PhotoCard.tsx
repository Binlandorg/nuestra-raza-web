import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Photo } from '@/shared/types/media'
import { ResponsivePicture } from '../atoms/ResponsivePicture'
import text from '@/shared/styles/typography.module.css'
import styles from './PhotoCard.module.css'

export interface PhotoCardProps {
  /** `null` renders the ember texture fallback (photo pending). */
  photo: Photo | null
  fallbackPhoto?: Photo
  title: ReactNode
  eyebrow?: ReactNode
  sizes: string
  aspect?: 'portrait' | 'square' | 'landscape' | 'tall'
  titleAs?: 'h3' | 'p'
  /** Thin inner frame, as in the design-system cut cards. */
  framed?: boolean
  /** Mark the photo decorative (alt="") when the card is a link whose text already names it. */
  decorative?: boolean
  className?: string
}

/**
 * Photo card with the caption set over a soft charcoal gradient
 * ("Bife de chorizo", "Tira de asado"…). Wrap it in a link when interactive.
 */
export function PhotoCard({
  photo,
  fallbackPhoto,
  title,
  eyebrow,
  sizes,
  aspect = 'portrait',
  titleAs: Title = 'h3',
  framed = true,
  decorative = false,
  className,
}: PhotoCardProps) {
  const shown = photo ?? fallbackPhoto

  return (
    <div className={cn(styles.card, styles[aspect], className)}>
      {shown ? (
        <ResponsivePicture
          photo={shown}
          sizes={sizes}
          alt={photo && !decorative ? undefined : ''}
          className={styles.picture}
          imgClassName={cn(styles.image, !photo && styles.fallback)}
        />
      ) : null}
      <div aria-hidden="true" className={styles.shade} />
      {framed ? <div aria-hidden="true" className={styles.frame} /> : null}
      <div className={styles.caption}>
        {eyebrow ? <span className={cn(text.label, styles.eyebrow)}>{eyebrow}</span> : null}
        <Title className={styles.title}>{title}</Title>
      </div>
    </div>
  )
}
