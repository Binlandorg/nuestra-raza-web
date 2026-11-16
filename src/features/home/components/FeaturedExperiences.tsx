import { IconFeature } from '@/shared/components/molecules'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { homeContent } from '../content/home.content'
import styles from './FeaturedExperiences.module.css'

/** Section 2 — three restrained concepts: Fuego lento · Buena compañía · Vino y sobremesa. */
export function FeaturedExperiences() {
  return (
    <section id="experiencias" aria-labelledby="experiencias-titulo" className={cn(styles.section, surfaces.cream)}>
      <div className={cn(layout.container, styles.grid)}>
        <h2 id="experiencias-titulo" className={cn(text.label, styles.heading)}>
          <span>
            Experiencias
            <br className={styles.lgBreak} /> destacadas
          </span>
          <span aria-hidden="true" className={styles.rule} />
        </h2>
        <ul className={styles.list}>
          {homeContent.featuredExperiences.map((experience) => (
            <li key={experience.title} className={styles.item} data-reveal>
              <IconFeature icon={experience.icon} title={experience.title} description={experience.description} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
