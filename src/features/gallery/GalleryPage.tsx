import { useMemo } from 'react'
import { Accent, ButtonLink, Heading, SectionLabel, TornEdge } from '@/shared/components/atoms'
import { siteConfig } from '@/shared/config/site.config'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import { GalleryFilters } from './components/GalleryFilters'
import { GalleryGrid } from './components/GalleryGrid'
import { GalleryLightbox } from './components/GalleryLightbox'
import type { GalleryCategoryId, GalleryItem } from './domain/gallery.types'
import styles from './GalleryPage.module.css'

export interface GalleryPageProps {
  items: GalleryItem[]
  category: GalleryCategoryId | null
  photoId: string | null
  onCategoryChange: (category: GalleryCategoryId | null) => void
  onOpenPhoto: (id: string) => void
  onNavigatePhoto: (id: string) => void
  onClosePhoto: () => void
}

/** /galeria — immersive dark gallery (mockup #5). URL state is handled by the route. */
export function GalleryPage({
  items,
  category,
  photoId,
  onCategoryChange,
  onOpenPhoto,
  onNavigatePhoto,
  onClosePhoto,
}: GalleryPageProps) {
  const counts = useMemo(() => {
    const result: Partial<Record<GalleryCategoryId, number>> = {}
    for (const item of items) result[item.category] = (result[item.category] ?? 0) + 1
    return result
  }, [items])

  const visible = useMemo(() => (category ? items.filter((item) => item.category === category) : items), [items, category])

  return (
    <>
      <section data-tone="dark" className={cn(styles.hero, surfaces.charcoal)}>
        <div className={cn(layout.container, styles.inner)}>
          <div className={styles.top}>
            <div className={styles.titleBlock}>
              <SectionLabel tone="dark">Momentos</SectionLabel>
              <Heading as="h1" size="h1" tone="dark">
                Galería
              </Heading>
            </div>
            <p className={styles.aside}>
              Fuego, personas, paisajes y buenos encuentros.
            </p>
          </div>

          <div className={styles.toolbar}>
            <GalleryFilters active={category} counts={counts} onChange={onCategoryChange} />
            <p className={styles.count} aria-live="polite">
              {visible.length} {visible.length === 1 ? 'foto' : 'fotos'}
            </p>
          </div>

          <GalleryGrid items={visible} onOpen={onOpenPhoto} />

          {siteConfig.content.photosAreReferential ? (
            <p className={styles.note}>Imágenes referenciales.</p>
          ) : null}
        </div>
      </section>

      <section className={cn(styles.cta, surfaces.cream)}>
        <TornEdge position="top" color="charcoal" />
        <div className={cn(layout.container, styles.ctaInner)}>
          <Heading size="h2">
            ¿Te sumas a <Accent>la próxima mesa?</Accent>
          </Heading>
          <ButtonLink to="/reservar" withArrow>
            Reservar mesa
          </ButtonLink>
        </div>
      </section>

      <GalleryLightbox items={visible} activeId={photoId} onNavigate={onNavigatePhoto} onClose={onClosePhoto} />
    </>
  )
}
