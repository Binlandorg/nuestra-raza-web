import { siteConfig } from '@/shared/config/site.config'
import { cn } from '@/shared/lib/cn'
import styles from './BrandLogo.module.css'
import type { Tone } from './Button'

export interface BrandLogoProps {
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Wordmark "NUESTRA / RAZA" set in Playfair Display, with the small terracotta
 * rule under "RAZA" from the design system. Decorative text: give the
 * wrapping link an accessible name.
 */
export function BrandLogo({ tone = 'dark', size = 'sm', className }: BrandLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(styles.logo, tone === 'dark' ? styles.dark : styles.light, styles[size], className)}
    >
      <span>Nuestra</span>{' '}
      <span className={styles.second}>
        Raza
        {siteConfig.brand.showRegisteredMark ? (
          <sup className={styles.registered}>®</sup>
        ) : null}
        <span className={styles.rule} />
      </span>
    </span>
  )
}
