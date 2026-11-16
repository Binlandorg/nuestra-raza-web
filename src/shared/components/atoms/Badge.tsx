import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Badge.module.css'

export type BadgeVariant = 'olive' | 'sand' | 'terracotta' | 'outline' | 'dark'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

/** Small label: "Evento", "Corte premium", "Nuevo". */
export function Badge({ variant = 'sand', className, ...props }: BadgeProps) {
  return <span className={cn(styles.badge, styles[variant], className)} {...props} />
}
