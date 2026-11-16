import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Tone } from '../atoms/Button'
import { Heading, type HeadingSize } from '../atoms/Heading'
import { SectionLabel } from '../atoms/SectionLabel'
import styles from './SectionHeading.module.css'

export interface SectionHeadingProps {
  label?: ReactNode
  labelLine?: 'before' | 'after' | 'none'
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3'
  size?: HeadingSize
  description?: ReactNode
  actions?: ReactNode
  align?: 'left' | 'center'
  tone?: Tone
  id?: string
  className?: string
}

/** Eyebrow + editorial title + supporting copy + optional actions. */
export function SectionHeading({
  label,
  labelLine = 'after',
  title,
  titleAs = 'h2',
  size = 'h2',
  description,
  actions,
  align = 'left',
  tone = 'light',
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={cn(styles.root, centered && styles.centered, className)}>
      {label ? (
        <SectionLabel tone={tone} line={centered ? 'none' : labelLine}>
          {label}
        </SectionLabel>
      ) : null}
      <Heading as={titleAs} size={size} tone={tone} id={id}>
        {title}
      </Heading>
      {description ? (
        <div className={cn(styles.description, tone === 'dark' && styles.descriptionDark)}>{description}</div>
      ) : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  )
}
