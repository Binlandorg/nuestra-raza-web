import { cn } from '@/shared/lib/cn'
import utilities from '@/shared/styles/utilities.module.css'
import { GALLERY_CATEGORIES, type GalleryCategoryId } from '../domain/gallery.types'
import styles from './GalleryFilters.module.css'

export interface GalleryFiltersProps {
  active: GalleryCategoryId | null
  counts: Partial<Record<GalleryCategoryId, number>>
  onChange: (category: GalleryCategoryId | null) => void
}

/** Category chips (toggle buttons). Selection is mirrored in the URL by the route. */
export function GalleryFilters({ active, counts, onChange }: GalleryFiltersProps) {
  const options: { id: GalleryCategoryId | null; label: string }[] = [
    { id: null, label: 'Todas' },
    ...GALLERY_CATEGORIES.filter((category) => (counts[category.id] ?? 0) > 0),
  ]

  return (
    <div role="group" aria-label="Filtrar por categoría" className={cn(styles.group, utilities.scrollbarNone)}>
      {options.map((option) => {
        const isActive = option.id === active
        return (
          <button
            key={option.id ?? 'todas'}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={cn(styles.chip, isActive && styles.active)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
