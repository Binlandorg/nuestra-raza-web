import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { Tone } from '../atoms/Button'
import styles from './Quote.module.css'

export interface QuoteProps {
  children: ReactNode
  cite?: string
  tone?: Tone
  size?: 'md' | 'lg'
  className?: string
}

/** Italic editorial quote: "El asado no se apura. Se comparte." */
export function Quote({ children, cite, tone = 'light', size = 'lg', className }: QuoteProps) {
  return (
    <figure className={cn(styles.figure, tone === 'dark' && styles.dark, className)}>
      <blockquote className={cn(styles.quote, styles[size])}>{children}</blockquote>
      {cite ? <figcaption className={cn(text.label, styles.cite)}>{cite}</figcaption> : null}
    </figure>
  )
}
