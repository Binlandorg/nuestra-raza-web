import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { Tone } from './Button'
import styles from './SectionLabel.module.css'

export interface SectionLabelProps {
  children: ReactNode
  /** Position of the hairline rule: "—— NUESTRA HISTORIA" / "AREQUIPA · PERÚ ——". */
  line?: 'before' | 'after' | 'none'
  tone?: Tone
  as?: 'p' | 'span' | 'div'
  className?: string
}

/** Uppercase, widely tracked eyebrow above headings. */
export function SectionLabel({ children, line = 'after', tone = 'light', as: Tag = 'p', className }: SectionLabelProps) {
  const rule = <span aria-hidden="true" className={styles.rule} />

  return (
    <Tag className={cn(text.label, styles.label, tone === 'dark' && styles.dark, className)}>
      {line === 'before' ? rule : null}
      <span>{children}</span>
      {line === 'after' ? rule : null}
    </Tag>
  )
}
