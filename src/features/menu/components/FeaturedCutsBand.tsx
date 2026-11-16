import { Accent, Heading, SectionLabel, TornEdge } from '@/shared/components/atoms'
import { PhotoCard } from '@/shared/components/molecules'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import utilities from '@/shared/styles/utilities.module.css'
import type { MenuItem } from '../domain/menu.types'
import styles from './FeaturedCutsBand.module.css'

/** Dark band of signature cuts — "Cortes, achuras y más." from the design system (mockup #4). */
export function FeaturedCutsBand({ items }: { items: MenuItem[] }) {
  return (
    <section
      aria-labelledby="cortes-destacados-titulo"
      data-tone="dark"
      className={cn(styles.band, surfaces.charcoal)}
    >
      <div className={cn(layout.container, styles.grid)}>
        <div className={styles.intro}>
          <SectionLabel tone="dark" line="before">
            Cortes destacados
          </SectionLabel>
          <Heading id="cortes-destacados-titulo" tone="dark" size="h2">
            Del fuego <Accent tone="dark">a la mesa.</Accent>
          </Heading>
          <p className={styles.text}>
            Los protagonistas de la parrilla, cocinados sin apuro sobre las brasas.
          </p>
        </div>
        <ul className={styles.cards}>
          {items.map((item) =>
            item.photo ? (
              <li key={item.id}>
                <a href={`#${item.id}`} className={styles.cardLink}>
                  <PhotoCard
                    photo={item.photo}
                    title={item.name}
                    titleAs="p"
                    decorative
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 24vw, 48vw"
                  />
                  <span className={utilities.srOnly}>, ver en la carta</span>
                </a>
              </li>
            ) : null,
          )}
        </ul>
      </div>
      <TornEdge color="cream" />
    </section>
  )
}
