import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import utilities from '@/shared/styles/utilities.module.css'
import type { MenuCategory } from '../domain/menu.types'
import styles from './MenuCategoryNav.module.css'

/**
 * Sticky category tabs with a rAF-throttled scroll-spy. Plain anchor links:
 * works without JavaScript; the active tab is highlighted once hydrated.
 */
export function MenuCategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const threshold = window.innerHeight * 0.35
      let current = categories[0]?.id
      for (const category of categories) {
        const top = document.getElementById(category.id)?.getBoundingClientRect().top
        if (top !== undefined && top <= threshold) current = category.id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [categories])

  // Keep the active tab visible inside the horizontal scroller (phones).
  // Only the tab strip scrolls horizontally — never the page.
  useEffect(() => {
    const list = listRef.current
    const active = list?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!list || !active || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: active.offsetLeft - list.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' })
  }, [activeId])

  return (
    <nav
      aria-label="Categorías de la carta"
      className={styles.nav}
    >
      <div className={layout.container}>
        <ul ref={listRef} className={cn(styles.list, utilities.scrollbarNone)}>
          {categories.map((category) => {
            const isActive = category.id === activeId
            return (
              <li key={category.id} className={styles.item}>
                <a
                  href={`#${category.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setActiveId(category.id)}
                  className={cn(styles.tab, isActive && styles.active)}
                >
                  {category.shortName}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
