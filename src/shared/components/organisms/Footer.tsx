import { Link } from '@tanstack/react-router'
import { Mail, MapPin } from 'lucide-react'
import { primaryNavigation, reservationCta } from '@/shared/config/navigation'
import { siteConfig } from '@/shared/config/site.config'
import {
  formatOpeningHours,
  getCityLine,
  getContactChannels,
  getSocialLinks,
  getStreetAddress,
} from '@/shared/lib/business'
import { cn } from '@/shared/lib/cn'
import { buildWhatsAppUrl } from '@/shared/lib/whatsapp'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { BrandIcon } from '../atoms/BrandIcon'
import { BrandLogo } from '../atoms/BrandLogo'
import { Illustration } from '../atoms/Illustration'
import { PendingValue } from '../atoms/PendingValue'
import styles from './Footer.module.css'

function FooterHeading({ children }: { children: string }) {
  return <h2 className={cn(text.label, styles.heading)}>{children}</h2>
}

export function Footer() {
  const { whatsapp, whatsappDisplay, email } = getContactChannels()
  const socialLinks = getSocialLinks()
  const street = getStreetAddress()
  const year = new Date().getFullYear()

  return (
    <footer data-tone="dark" className={cn(styles.footer, surfaces.charcoal)}>
      <Illustration name="mountain" className={styles.mountain} />

      <div className={cn(layout.container, styles.grid)}>
        <div className={styles.brand}>
          <Link to="/" aria-label="Nuestra Raza — Inicio" className={styles.logoLink}>
            <BrandLogo size="md" />
          </Link>
          <p className={styles.tagline}>{siteConfig.brand.tagline}</p>
          <p className={styles.messages}>{siteConfig.brand.messages.join(' ')}</p>
        </div>

        <nav aria-label="Pie de página" className={styles.nav}>
          <FooterHeading>Explora</FooterHeading>
          <ul className={cn(styles.links, styles.small)}>
            {primaryNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={reservationCta.to} className={styles.reserve}>
                Reservar mesa
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.column}>
          <div>
            <FooterHeading>Visítanos</FooterHeading>
            <address className={cn(styles.address, styles.small)}>
              <MapPin aria-hidden="true" strokeWidth={1.5} className={cn(styles.icon, styles.pinIcon)} />
              <span>
                {street ? (
                  <>
                    {street}
                    <br />
                  </>
                ) : null}
                {getCityLine()}
                {!street ? (
                  <>
                    <br />
                    <PendingValue tone="dark" className={styles.pendingSmall}>
                      Dirección por confirmar
                    </PendingValue>
                  </>
                ) : null}
              </span>
            </address>
          </div>
          <div>
            <FooterHeading>Horario</FooterHeading>
            {siteConfig.hours.length > 0 ? (
              <ul className={cn(styles.hours, styles.small)}>
                {siteConfig.hours.map((entry) => (
                  <li key={entry.label} className={styles.hoursRow}>
                    <span className={styles.hoursDay}>{entry.label}</span>
                    <span>{formatOpeningHours(entry)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.small}>
                Asado de Sábado · <PendingValue tone="dark">horario por confirmar</PendingValue>
              </p>
            )}
          </div>
        </div>

        <div className={styles.column}>
          <div>
            <FooterHeading>Contacto</FooterHeading>
            <ul className={cn(styles.links, styles.small)}>
              <li className={styles.contactItem}>
                <BrandIcon name="whatsapp" className={styles.icon} />
                {whatsapp ? (
                  <a href={buildWhatsAppUrl(whatsapp)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {whatsappDisplay}
                  </a>
                ) : (
                  <PendingValue tone="dark">WhatsApp por confirmar</PendingValue>
                )}
              </li>
              <li className={styles.contactItem}>
                <Mail aria-hidden="true" strokeWidth={1.5} className={styles.icon} />
                {email ? (
                  <a href={`mailto:${email}`} className={styles.link}>
                    {email}
                  </a>
                ) : (
                  <PendingValue tone="dark">Correo por confirmar</PendingValue>
                )}
              </li>
            </ul>
          </div>
          {socialLinks.length > 0 ? (
            <div>
              <FooterHeading>Síguenos</FooterHeading>
              <ul className={styles.socialList}>
                {socialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label} (se abre en una pestaña nueva)`}
                      className={styles.socialLink}
                    >
                      <BrandIcon name={link.platform} className={styles.socialIcon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={cn(layout.container, styles.bottomInner)}>
          <p>
            © {year} {siteConfig.brand.name}. Todos los derechos reservados.
            {siteConfig.content.photosAreReferential ? ' Imágenes referenciales.' : null}
          </p>
          <p className={cn(text.label, styles.bottomTagline)}>{siteConfig.brand.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
