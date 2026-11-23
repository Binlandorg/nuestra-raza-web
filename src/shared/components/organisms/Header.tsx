import { Link } from '@tanstack/react-router'
import { reservationCta } from '@/shared/config/navigation'
import { useScrolled } from '@/shared/hooks/useScrolled'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import { BrandLogo } from '../atoms/BrandLogo'
import { ButtonLink } from '../atoms/Button'
import { DesktopNavigation } from './DesktopNavigation'
import styles from './Header.module.css'
import { MobileNavigation } from './MobileNavigation'

/**
 * Site header. Every page opens on a dark photographic hero, so the header
 * is transparent at the top and turns solid charcoal once the page scrolls.
 */
export function Header() {
  const scrolled = useScrolled(24)

  return (
    <header data-tone="dark" className={cn(styles.header, scrolled && styles.scrolled)}>
      <div className={cn(layout.container, styles.bar)}>
        <Link to="/" aria-label="Nuestra Raza — Inicio" className={styles.logoLink}>
          <BrandLogo layout="inline" />
        </Link>

        <DesktopNavigation className={styles.desktopNav} />

        <div className={styles.actions}>
          <ButtonLink to={reservationCta.to} size="sm" className={styles.reserve}>
            {reservationCta.label}
          </ButtonLink>
          <MobileNavigation className={styles.menuButton} />
        </div>
      </div>
    </header>
  )
}
