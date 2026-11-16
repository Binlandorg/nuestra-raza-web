import type { MenuCategory } from '../domain/menu.types'
import styles from './MenuCategorySection.module.css'
import { MenuItemRow } from './MenuItemRow'

export interface MenuCategorySectionProps {
  category: MenuCategory
  index: number
}

/** One menu category: sticky title column + item list. */
export function MenuCategorySection({ category, index }: MenuCategorySectionProps) {
  const titleId = `${category.id}-titulo`

  return (
    <section
      id={category.id}
      aria-labelledby={titleId}
      className={styles.section}
    >
      <header className={styles.header}>
        <span aria-hidden="true" className={styles.index}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 id={titleId} className={styles.title}>
          {category.name}
        </h2>
        <p className={styles.description}>{category.description}</p>
      </header>

      <ul className={styles.items}>
        {category.items.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  )
}
