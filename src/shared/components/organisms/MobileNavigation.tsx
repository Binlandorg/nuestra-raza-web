import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { primaryNavigation, reservationCta } from '@/shared/config/navigation'
import { siteConfig } from '@/shared/config/site.config'
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll'
import { getContactChannels, getSocialLinks } from '@/shared/lib/business'
import { cn } from '@/shared/lib/cn'
import { buildWhatsAppUrl } from '@/shared/lib/whatsapp'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { BrandIcon } from '../atoms/BrandIcon'
import { BrandLogo } from '../atoms/BrandLogo'
import { ButtonLink } from '../atoms/Button'
import { IconButton } from '../atoms/IconButton'
import { Illustration } from '../atoms/Illustration'
import styles from './MobileNavigation.module.css'

/**
 * Full-screen menu for phones and tablets, built on the native modal `<dialog>`:
 * focus trap, Esc to close and inert background come for free.
 */
export function MobileNavigation({ className }: { className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dialogId = useId()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { whatsapp } = getContactChannels()
  const socialLinks = getSocialLinks()

  // Close after any navigation (links, back button).
  useEffect(() => {
    dialogRef.current?.close()
  }, [pathname])

  useLockBodyScroll(isOpen)

  const open = () => {
    dialogRef.current?.showModal()
    setIsOpen(true)
  }
  const close = () => dialogRef.current?.close()

  return (
    <>
      <IconButton
        label="Abrir menú"
        tone="dark"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={open}
        className={className}
      >
        <Menu aria-hidden="true" strokeWidth={1.5} className={styles.menuIcon} />
      </IconButton>

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label="Menú principal"
        data-tone="dark"
        onClose={() => setIsOpen(false)}
        className={cn(styles.dialog, surfaces.charcoal)}
      >
        <div className={styles.panel}>
          <Illustration name="mountain" className={styles.mountain} />

          <div className={cn(layout.container, styles.top)}>
            <Link to="/" aria-label="Nuestra Raza — Inicio" onClick={close}>
              <BrandLogo />
            </Link>
            <IconButton label="Cerrar menú" tone="dark" variant="outline" onClick={close} autoFocus>
              <X aria-hidden="true" strokeWidth={1.5} className={styles.closeIcon} />
            </IconButton>
          </div>

          <nav aria-label="Principal" className={cn(layout.container, styles.nav)}>
            <ul className={styles.list}>
              {primaryNavigation.map((item, index) => (
                <li key={item.to} className={styles.item}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === '/', includeHash: false }}
                    onClick={close}
                    className={styles.link}
                  >
                    <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.text}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={cn(layout.container, styles.bottom)}>
            <ButtonLink to={reservationCta.to} size="lg" withArrow fullWidth onClick={close}>
              Reservar mesa
            </ButtonLink>
            {whatsapp || socialLinks.length > 0 ? (
              <div className={styles.social}>
                {whatsapp ? (
                  <a
                    href={buildWhatsAppUrl(whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
                    className={styles.socialLink}
                  >
                    <BrandIcon name="whatsapp" className={styles.socialIcon} />
                  </a>
                ) : null}
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (se abre en una pestaña nueva)`}
                    className={styles.socialLink}
                  >
                    <BrandIcon name={link.platform} className={styles.socialIcon} />
                  </a>
                ))}
              </div>
            ) : null}
            <p className={cn(text.label, styles.tagline)}>
              {siteConfig.location.city} · {siteConfig.location.country} — {siteConfig.brand.tagline}
            </p>
          </div>
        </div>
      </dialog>
    </>
  )
}
