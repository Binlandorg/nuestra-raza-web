import { cn } from '@/shared/lib/cn'
import styles from './atoms.module.css'
import type { Photo } from '@/shared/types/media'

export interface ResponsivePictureProps {
  photo: Photo
  /** `sizes` attribute describing the rendered width, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string
  /** Above-the-fold image (LCP): eager load + high fetch priority. */
  priority?: boolean
  /** Full-bleed heroes: serve the photo's vertical crop on phones when it has one. */
  artDirected?: boolean
  /** Override alt text. Pass "" when the image is purely decorative. */
  alt?: string
  className?: string
  imgClassName?: string
}

/**
 * AVIF/WebP `<picture>` with explicit dimensions (no layout shift),
 * native lazy loading and the photo's focal point.
 */
export function ResponsivePicture({
  photo,
  sizes,
  priority = false,
  artDirected = false,
  alt,
  className,
  imgClassName,
}: ResponsivePictureProps) {
  const { sources, img } = photo.picture

  return (
    <picture className={cn(styles.picture, className)}>
      {artDirected && photo.portrait
        ? Object.entries(photo.portrait.sources).map(([format, srcSet]) => (
            <source
              key={`portrait-${format}`}
              media="(max-width: 767px)"
              type={`image/${format}`}
              srcSet={srcSet}
              sizes="100vw"
            />
          ))
        : null}
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt ?? photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={cn(photo.grade === 'warm' && styles.gradeWarm, imgClassName)}
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </picture>
  )
}
