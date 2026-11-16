import { Link } from '@tanstack/react-router'
import { Accent, ButtonLink, Illustration } from '@/shared/components/atoms'
import { PhotoCard, SectionHeading } from '@/shared/components/molecules'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import utilities from '@/shared/styles/utilities.module.css'
import type { FeaturedDish } from '../domain/menu.selectors'
import styles from './MenuPreview.module.css'

/** Homepage section 5 — "Sabores que cuentan historias." */
export function MenuPreview({ dishes }: { dishes: FeaturedDish[] }) {
  return (
    <section aria-labelledby="carta-preview-titulo" className={cn(styles.section, surfaces.cream)}>
      <div className={cn(layout.container, styles.grid)}>
        <div className={styles.intro} data-reveal>
          <SectionHeading
            id="carta-preview-titulo"
            label="Nuestra carta"
            title={
              <>
                Sabores que <Accent>cuentan historias.</Accent>
              </>
            }
            description="Cortes seleccionados, achuras, entradas, acompañamientos, bebidas y postres. Todo lo necesario para un gran asado."
            actions={
              <ButtonLink to="/carta" withArrow>
                Ver carta completa
              </ButtonLink>
            }
          />
          <Illustration name="sprig" className={styles.sprig} />
        </div>

        <ul className={styles.cards}>
          {dishes.map((dish) => (
            <li key={dish.id} data-reveal>
              <Link to="/carta" hash={dish.id} className={styles.cardLink}>
                <PhotoCard
                  photo={dish.photo ?? null}
                  fallbackPhoto={photos.brasasOscuras}
                  title={dish.name}
                  eyebrow={dish.categoryName}
                  titleAs="p"
                  decorative
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 46vw"
                />
                <span className={utilities.srOnly}>, ver en la carta</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
