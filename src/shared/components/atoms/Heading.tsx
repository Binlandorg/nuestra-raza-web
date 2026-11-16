import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { Tone } from './Button'
import styles from './Heading.module.css'

export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3'

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  size?: HeadingSize
  tone?: Tone
  id?: string
  className?: string
  children: ReactNode
}

/** Playfair Display editorial heading. Combine with `<Accent>` for the italic terracotta word. */
export function Heading({ as: Tag = 'h2', size = 'h2', tone = 'light', id, className, children }: HeadingProps) {
  return (
    <Tag id={id} className={cn(text[size], tone === 'dark' ? styles.dark : styles.light, className)}>
      {children}
    </Tag>
  )
}

export interface AccentProps {
  children: ReactNode
  tone?: Tone
  /** Keep the accent the same color as the heading (italic only). */
  plain?: boolean
  className?: string
}

/** Italic accent inside headings: "El fuego nos <Accent>reúne.</Accent>" */
export function Accent({ children, tone = 'light', plain = false, className }: AccentProps) {
  return (
    <em
      className={cn(
        styles.accent,
        !plain && (tone === 'dark' ? styles.accentDark : styles.accentLight),
        className,
      )}
    >
      {children}
    </em>
  )
}
