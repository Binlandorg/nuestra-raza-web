import type { Picture } from 'vite-imagetools'

/** A photograph ready to render responsively, with its accessible description. */
export interface Photo {
  picture: Picture
  /** Descriptive alt text (Spanish). Describe what is seen, not "foto de…". */
  alt: string
  /** CSS object-position focal point used when the photo is cropped. */
  position?: string
  /**
   * Art-directed vertical crop for phones (≤ 767 px). Used by full-bleed heroes,
   * where a landscape photo cropped with `object-cover` would waste bytes.
   */
  portrait?: Picture
  /**
   * Optional warm color grade to harmonize daylight shots with the cinematic,
   * warm art direction. Not needed for photography shot for the brand.
   */
  grade?: 'warm'
}

export type IllustrationName = 'cow' | 'mate' | 'mountain' | 'sprig' | 'brush'
