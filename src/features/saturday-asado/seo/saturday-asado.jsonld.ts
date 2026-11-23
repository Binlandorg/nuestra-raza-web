import { absoluteUrl } from '@/shared/config/env'
import { siteConfig } from '@/shared/config/site.config'
import { compactJsonLd } from '@/shared/lib/structured-data'
import { selectOpenSaturdays } from '../domain/saturday-asado.selectors'
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'

/** Weeks published ahead when the asado runs every Saturday (the HTML is regenerated on each deploy). */
const WEEKS_AHEAD = 8

/**
 * schema.org FoodEvent entries — ONLY for confirmed Saturdays: the next weeks when
 * the asado runs every Saturday, otherwise the dates listed. None → nothing published.
 */
export function buildSaturdayAsadoJsonLd(event: SaturdayAsadoEvent, today: string) {
  const { startTime, endTime } = event.schedule

  return selectOpenSaturdays(event, today, WEEKS_AHEAD).map((entry) =>
    compactJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FoodEvent',
      name: `${event.name} · ${siteConfig.brand.name}`,
      description: event.heroDescription,
      startDate: startTime ? `${entry.date}T${startTime}:00-05:00` : entry.date,
      endDate: endTime ? `${entry.date}T${endTime}:00-05:00` : null,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url: absoluteUrl('/asado-de-sabado'),
      image: [absoluteUrl('/og/asado-de-sabado.jpg')],
      location: { '@id': absoluteUrl('/#restaurant') },
      organizer: { '@type': 'Organization', name: siteConfig.brand.name, url: absoluteUrl('/') },
      offers:
        event.pricePerPerson !== null
          ? {
              '@type': 'Offer',
              price: event.pricePerPerson.toFixed(2),
              priceCurrency: 'PEN',
              url: absoluteUrl('/asado-de-sabado#reservar'),
              availability:
                entry.availability === 'sold-out'
                  ? 'https://schema.org/SoldOut'
                  : event.capacity === 'unlimited' && entry.availability === 'available'
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/LimitedAvailability',
            }
          : null,
    }),
  )
}
