import type { LucideIcon } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { Tone } from '../atoms/Button'
import styles from './InfoItem.module.css'

export interface InfoItemProps {
  icon: LucideIcon | ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>
  label: string
  children: ReactNode
  tone?: Tone
  className?: string
}

/** Icon + small label + value. Contact details, event facts, opening hours. */
export function InfoItem({ icon: Icon, label, children, tone = 'light', className }: InfoItemProps) {
  return (
    <div className={cn(styles.item, tone === 'dark' && styles.dark, className)}>
      <span className={styles.iconWrap}>
        <Icon aria-hidden="true" className={styles.icon} />
      </span>
      <div className={styles.body}>
        <span className={cn(text.label, styles.label)}>{label}</span>
        <div className={styles.value}>{children}</div>
      </div>
    </div>
  )
}
