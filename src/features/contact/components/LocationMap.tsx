import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { Button, Illustration } from '@/shared/components/atoms'
import { siteConfig } from '@/shared/config/site.config'
import { getCityLine, getStreetAddress } from '@/shared/lib/business'
import { cn } from '@/shared/lib/cn'
import surfaces from '@/shared/styles/surfaces.module.css'
import styles from './LocationMap.module.css'

/**
 * Map section. Google Maps loads only on demand (performance + privacy).
 * Until the location is configured, an illustrated placeholder is shown instead.
 */
export function LocationMap() {
  const [loaded, setLoaded] = useState(false)
  const { mapEmbedUrl } = siteConfig.location
  const street = getStreetAddress()

  if (mapEmbedUrl && loaded) {
    return (
      <div className={styles.frame}>
        <iframe
          title={`Mapa: ${siteConfig.brand.name}, ${getCityLine()}`}
          src={mapEmbedUrl}
          className={styles.iframe}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className={cn(styles.placeholder, surfaces.sand)}>
      <Illustration name="mountain" className={styles.mountain} />
      <span className={styles.pin}>
        <MapPin aria-hidden="true" strokeWidth={1.5} className={styles.pinIcon} />
      </span>
      <p className={styles.name}>
        {siteConfig.brand.name}
        <span className={styles.place}>{street ?? getCityLine()}</span>
      </p>
      {mapEmbedUrl ? (
        <Button variant="secondary" size="sm" onClick={() => setLoaded(true)}>
          Ver mapa interactivo
        </Button>
      ) : (
        <p className={styles.pending}>Ubicación exacta por confirmar</p>
      )}
    </div>
  )
}
