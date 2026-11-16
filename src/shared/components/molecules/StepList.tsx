import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { Tone } from '../atoms/Button'
import styles from './StepList.module.css'

export interface Step {
  title: string
  description?: ReactNode
  /** Optional time or tag shown before the title ("13:00"). */
  meta?: string | null
}

export interface StepListProps {
  steps: readonly Step[]
  tone?: Tone
  /** "timeline" = vertical rule with numbered nodes; "grid" = numbered columns. */
  variant?: 'timeline' | 'grid'
  className?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Ordered process: reservation steps, the Saturday asado ritual. */
export function StepList({ steps, tone = 'light', variant = 'timeline', className }: StepListProps) {
  const dark = tone === 'dark' && styles.dark

  if (variant === 'grid') {
    return (
      <ol className={cn(styles.grid, dark, className)}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.gridItem}>
            <span className={styles.gridNumber}>{pad(index + 1)}</span>
            <h3 className={styles.gridTitle}>{step.title}</h3>
            {step.description ? <p className={styles.description}>{step.description}</p> : null}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ol className={cn(styles.timeline, dark, className)}>
      <span aria-hidden="true" className={styles.rail} />
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.node}>{pad(index + 1)}</span>
          <div className={styles.stepBody}>
            {step.meta ? <span className={cn(text.label, styles.meta)}>{step.meta}</span> : null}
            <h3 className={styles.stepTitle}>{step.title}</h3>
            {step.description ? <p className={styles.description}>{step.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
