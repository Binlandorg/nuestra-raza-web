import { Badge, ResponsivePicture } from '@/shared/components/atoms'
import { cn } from '@/shared/lib/cn'
import { AVAILABILITY_LABEL } from '../domain/menu.selectors'
import type { MenuItem } from '../domain/menu.types'
import styles from './MenuItemRow.module.css'
import { MenuPrice } from './MenuPrice'

/** Menu line: thumbnail, name ··· price, description and tags. */
export function MenuItemRow({ item }: { item: MenuItem }) {
  const availabilityLabel = AVAILABILITY_LABEL[item.availability]
  const unavailable = item.availability === 'unavailable'

  return (
    <li id={item.id} className={cn(styles.row, unavailable && styles.unavailable)}>
      {item.photo ? (
        <ResponsivePicture
          photo={item.photo}
          sizes="96px"
          className={styles.thumb}
          imgClassName={styles.thumbImage}
        />
      ) : null}

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{item.name}</h3>
          <span aria-hidden="true" className={styles.leader} />
          <MenuPrice price={item.price} portion={item.portion} />
        </div>
        <p className={styles.description}>{item.description}</p>
        {item.tags?.length || availabilityLabel ? (
          <div className={styles.tags}>
            {item.tags?.map((tag) => (
              <Badge key={tag} variant={tag === 'Toque peruano' ? 'olive' : tag === 'Corte premium' ? 'sand' : 'outline'}>
                {tag}
              </Badge>
            ))}
            {availabilityLabel ? <Badge variant="terracotta">{availabilityLabel}</Badge> : null}
          </div>
        ) : null}
      </div>
    </li>
  )
}
