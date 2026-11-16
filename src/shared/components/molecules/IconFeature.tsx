import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Tone } from '../atoms/Button'
import styles from './IconFeature.module.css'

export interface IconFeatureProps {
  icon: LucideIcon
  title: string
  description?: ReactNode
  layout?: 'stacked' | 'inline' | 'compact'
  tone?: Tone
  titleAs?: 'h3' | 'h4' | 'p'
  className?: string
}

/** Restrained line icon + title (+ description). "Fuego lento", "Buena compañía"… */
export function IconFeature({
  icon: Icon,
  title,
  description,
  layout = 'stacked',
  tone = 'light',
  titleAs: Title = 'h3',
  className,
}: IconFeatureProps) {
  const rootClass = cn(styles[layout], tone === 'dark' && styles.dark, className)

  if (layout === 'compact') {
    return (
      <div className={rootClass}>
        <Icon aria-hidden="true" strokeWidth={1.25} className={styles.icon} />
        <Title className={styles.title}>{title}</Title>
      </div>
    )
  }

  return (
    <div className={rootClass}>
      <Icon aria-hidden="true" strokeWidth={1.25} className={styles.icon} />
      <div className={styles.body}>
        <Title className={styles.title}>{title}</Title>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
    </div>
  )
}
