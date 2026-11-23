import { Clock, Mail, MapPin } from 'lucide-react'
import { BrandIcon, PendingValue, TextAnchor } from '@/shared/components/atoms'
import { InfoItem } from '@/shared/components/molecules'
import { siteConfig } from '@/shared/config/site.config'
import { formatOpeningHours, getCityLine, getContactChannels, getSocialLinks, getStreetAddress } from '@/shared/lib/business'
import { cn } from '@/shared/lib/cn'
import { buildWhatsAppUrl } from '@/shared/lib/whatsapp'
import styles from './ContactDetails.module.css'

const WhatsAppIcon = ({ className }: { className?: string }) => <BrandIcon name="whatsapp" className={className} />
const InstagramIcon = ({ className }: { className?: string }) => <BrandIcon name="instagram" className={className} />

/** Location, channels and hours — only confirmed data, the rest reads "Por confirmar". */
export function ContactDetails() {
  const { whatsapp, whatsappDisplay, email } = getContactChannels()
  const instagram = getSocialLinks().find((link) => link.platform === 'instagram')
  const street = getStreetAddress()
  const { mapsUrl, reference } = siteConfig.location

  return (
    <ul className={styles.list}>
      <li>
        <InfoItem icon={MapPin} label="Ubicación">
          <address className={styles.address}>
            {street ? (
              <>
                {street}
                <br />
              </>
            ) : null}
            {getCityLine()}
            {reference ? <span className={cn(styles.small, styles.muted)}>{reference}</span> : null}
            {!street ? <PendingValue className={styles.small}>Dirección exacta por confirmar</PendingValue> : null}
          </address>
          {mapsUrl ? (
            <TextAnchor href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.mapsLink}>
              Cómo llegar
            </TextAnchor>
          ) : null}
        </InfoItem>
      </li>
      <li>
        <InfoItem icon={WhatsAppIcon} label="WhatsApp">
          {whatsapp ? (
            <a href={buildWhatsAppUrl(whatsapp)} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {whatsappDisplay}
            </a>
          ) : (
            <PendingValue />
          )}
        </InfoItem>
      </li>
      {instagram ? (
        <li>
          <InfoItem icon={InstagramIcon} label="Instagram">
            <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {instagram.handle ?? 'Instagram'}
            </a>
          </InfoItem>
        </li>
      ) : null}
      <li>
        <InfoItem icon={Mail} label="Correo">
          {email ? (
            <a href={`mailto:${email}`} className={styles.link}>
              {email}
            </a>
          ) : (
            <PendingValue />
          )}
        </InfoItem>
      </li>
      <li>
        <InfoItem icon={Clock} label="Horario de atención">
          {siteConfig.hours.length > 0 ? (
            <ul>
              {siteConfig.hours.map((entry) => (
                <li key={entry.label}>
                  {entry.label}: {formatOpeningHours(entry)}
                </li>
              ))}
            </ul>
          ) : (
            <>
              Asado de Sábado · <PendingValue>horario por confirmar</PendingValue>
            </>
          )}
        </InfoItem>
      </li>
    </ul>
  )
}
