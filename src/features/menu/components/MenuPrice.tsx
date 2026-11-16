import { cn } from '@/shared/lib/cn'
import { formatPrice } from '@/shared/lib/format'
import styles from './MenuPrice.module.css'

export interface MenuPriceProps {
  price: number | null
  portion: string | null
  className?: string
}

/** "S/ 72 (300 g)" — or a discreet "Consultar" while the price is not confirmed. */
export function MenuPrice({ price, portion, className }: MenuPriceProps) {
  return (
    <span className={cn(styles.price, className)}>
      {price !== null ? (
        <span className={styles.amount}>{formatPrice(price)}</span>
      ) : (
        <span className={styles.ask}>Consultar</span>
      )}
      {portion ? <span className={styles.portion}>({portion})</span> : null}
    </span>
  )
}
