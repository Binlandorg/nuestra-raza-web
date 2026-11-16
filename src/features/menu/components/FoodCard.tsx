import { ResponsivePicture } from '@/shared/components/atoms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import type { MenuItem } from '../domain/menu.types'
import styles from './FoodCard.module.css'
import { MenuPrice } from './MenuPrice'

export interface FoodCardProps {
  item: MenuItem
  showPrice?: boolean
  className?: string
}

/** "Tarjeta de corte" from the design system: photo, name + price, short description. */
export function FoodCard({ item, showPrice = true, className }: FoodCardProps) {
  return (
    <article
      className={cn(styles.card, className)}
    >
      <div className={styles.media}>
        <ResponsivePicture
          photo={item.photo ?? photos.brasasOscuras}
          alt={item.photo ? undefined : ''}
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw"
          className={styles.picture}
          imgClassName={cn(styles.image, !item.photo && styles.fallback)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{item.name}</h3>
          {showPrice ? <MenuPrice price={item.price} portion={item.portion} /> : null}
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>
    </article>
  )
}
