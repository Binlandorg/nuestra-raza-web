import { cn } from '@/shared/lib/cn'
import type { Tone } from './Button'
import styles from './Divider.module.css'

export interface DividerProps {
  variant?: 'line' | 'ornament'
  orientation?: 'horizontal' | 'vertical'
  tone?: Tone
  className?: string
}

/** Hairline separator. `ornament` adds a small diamond in the middle (editorial pause). */
export function Divider({ variant = 'line', orientation = 'horizontal', tone = 'light', className }: DividerProps) {
  const color = tone === 'dark' ? styles.dark : styles.light

  if (orientation === 'vertical') {
    return <span aria-hidden="true" className={cn(styles.vertical, color, className)} />
  }

  if (variant === 'ornament') {
    return (
      <div role="separator" className={cn(styles.ornament, className)}>
        <span className={cn(styles.segment, color)} />
        <span aria-hidden="true" className={cn(styles.diamond, tone === 'dark' && styles.diamondDark)} />
        <span className={cn(styles.segment, color)} />
      </div>
    )
  }

  return <hr className={cn(styles.line, color, className)} />
}
