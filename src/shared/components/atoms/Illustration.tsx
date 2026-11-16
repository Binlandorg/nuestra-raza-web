import type { CSSProperties } from 'react'
import brush from '@/assets/illustrations/brush.svg?url'
import cow from '@/assets/illustrations/cow.svg?url'
import mate from '@/assets/illustrations/mate.svg?url'
import mountain from '@/assets/illustrations/mountain.svg?url'
import sprig from '@/assets/illustrations/sprig.svg?url'
import { cn } from '@/shared/lib/cn'
import styles from './atoms.module.css'
import type { IllustrationName } from '@/shared/types/media'

/** Engraving-style drawings from the design system (mockup #4), stored as SVG masks. */
const ILLUSTRATIONS: Record<IllustrationName, { src: string; ratio: number }> = {
  cow: { src: cow, ratio: 936 / 810 },
  mate: { src: mate, ratio: 720 / 840 },
  mountain: { src: mountain, ratio: 1068 / 510 },
  sprig: { src: sprig, ratio: 150 / 250 },
  brush: { src: brush, ratio: 720 / 360 },
}

export interface IllustrationProps {
  name: IllustrationName
  /** Set the width and `color` (the drawing is painted with currentColor) from a CSS Module class. */
  className?: string
  style?: CSSProperties
}

/**
 * Decorative illustration painted with `currentColor` (CSS mask),
 * so the same drawing works on cream and charcoal surfaces.
 */
export function Illustration({ name, className, style }: IllustrationProps) {
  const { src, ratio } = ILLUSTRATIONS[name]
  const mask = `url("${src}") center / contain no-repeat`

  return (
    <span
      aria-hidden="true"
      className={cn(styles.illustration, className)}
      style={{ aspectRatio: ratio, mask, WebkitMask: mask, ...style }}
    />
  )
}
