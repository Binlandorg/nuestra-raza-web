import { Expand } from 'lucide-react'
import { ResponsivePicture } from '@/shared/components/atoms'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import { categoryLabel, type GalleryItem } from '../domain/gallery.types'
import styles from './GalleryGrid.module.css'

export interface GalleryGridProps {
  items: readonly GalleryItem[]
  onOpen: (id: string) => void
}

/** Uniform 4:5 grid; the first photo is featured at double size from tablet up. */
export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => {
        const featured = index === 0 && items.length > 4
        return (
          <li key={item.id} className={cn(featured && styles.featured)} data-reveal={index > 3 ? '' : undefined}>
            <button
              type="button"
              onClick={() => onOpen(item.id)}
              aria-haspopup="dialog"
              aria-label={`Ampliar foto: ${item.photo.alt}`}
              className={styles.tile}
            >
              <ResponsivePicture
                photo={item.photo}
                priority={index < 2}
                sizes={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'}
                className={styles.picture}
                imgClassName={styles.image}
              />
              <span
                aria-hidden="true"
                className={styles.overlay}
              >
                <span className={cn(text.label, styles.category)}>{categoryLabel(item.category)}</span>
                <Expand strokeWidth={1.5} className={styles.icon} />
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
