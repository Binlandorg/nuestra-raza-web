import { Link } from '@tanstack/react-router'
import { Accent, Illustration, ResponsivePicture, TextLink } from '@/shared/components/atoms'
import { SectionHeading } from '@/shared/components/molecules'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import utilities from '@/shared/styles/utilities.module.css'
import { categoryLabel, type GalleryItem } from '../domain/gallery.types'
import styles from './GalleryPreview.module.css'

/** Homepage section 7 — "Momentos que hacen historia." */
export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  return (
    <section aria-labelledby="galeria-preview-titulo" className={cn(styles.section, surfaces.cream)}>
      <span
        aria-hidden="true"
        className={styles.watermark}
      >
        NR
      </span>

      <div className={cn(layout.container, styles.grid)}>
        <div className={styles.intro} data-reveal>
          <SectionHeading
            id="galeria-preview-titulo"
            label="Galería"
            title={
              <>
                Momentos que <Accent>hacen historia.</Accent>
              </>
            }
            description="Asados, amigos, paisajes y buena energía."
            actions={<TextLink to="/galeria">Ver galería</TextLink>}
          />
          <Illustration name="sprig" className={styles.sprig} />
        </div>

        <ul className={styles.tiles}>
          {items.map((item, index) => (
            <li key={item.id} className={cn(index % 2 === 1 && styles.offset)} data-reveal>
              <Link
                to="/galeria"
                search={{ categoria: item.category }}
                className={styles.tile}
              >
                <ResponsivePicture
                  photo={item.photo}
                  alt=""
                  sizes="(min-width: 1024px) 15vw, (min-width: 768px) 24vw, 46vw"
                  className={styles.picture}
                  imgClassName={styles.image}
                />
                <span className={cn(text.label, styles.caption)}>
                  {categoryLabel(item.category)}
                  <span className={utilities.srOnly}>: ver en la galería</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
