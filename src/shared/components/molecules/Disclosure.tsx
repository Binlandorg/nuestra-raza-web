import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Tone } from '../atoms/Button'
import styles from './Disclosure.module.css'

export interface DisclosureProps {
  title: string
  children: ReactNode
  tone?: Tone
  defaultOpen?: boolean
  /** Groups disclosures so only one stays open (native exclusive accordion). */
  name?: string
  className?: string
}

/**
 * Native `<details>` accordion: keyboard and screen-reader accessible with zero JavaScript.
 * Used for FAQs and the mobile menu categories.
 */
export function Disclosure({ title, children, tone = 'light', defaultOpen, name, className }: DisclosureProps) {
  return (
    <details
      name={name}
      open={defaultOpen}
      className={cn(styles.details, tone === 'dark' && styles.dark, className)}
    >
      <summary className={styles.summary}>
        {title}
        <Plus aria-hidden="true" strokeWidth={1.25} className={styles.icon} />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  )
}
