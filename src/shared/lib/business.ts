import { siteConfig } from '@/shared/config/site.config'
import type { OpeningHours } from '@/shared/config/site.types'
import { formatTime } from './format'
import { getBusinessWhatsApp } from './whatsapp'

export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  url: string
  /** "@handle" extracted from the URL when possible. */
  handle: string | null
}

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
}

const handleFromUrl = (url: string): string | null => {
  try {
    const segment = new URL(url).pathname.split('/').filter(Boolean)[0]
    return segment ? `@${segment.replace(/^@/, '')}` : null
  } catch {
    return null
  }
}

/** Configured social profiles only (unconfirmed ones are omitted, never faked). */
export function getSocialLinks(): SocialLink[] {
  return (Object.keys(SOCIAL_LABELS) as SocialPlatform[]).flatMap((platform) => {
    const url = siteConfig.social[platform]
    return url ? [{ platform, label: SOCIAL_LABELS[platform], url, handle: handleFromUrl(url) }] : []
  })
}

/** "Arequipa · Perú" */
export const getCityLine = (): string => `${siteConfig.location.city} · ${siteConfig.location.country}`

/** Street + district when confirmed; `null` otherwise. */
export function getStreetAddress(): string | null {
  const { streetAddress, district } = siteConfig.location
  if (!streetAddress) return null
  return district ? `${streetAddress}, ${district}` : streetAddress
}

export const formatOpeningHours = (entry: OpeningHours): string =>
  `${formatTime(entry.opens)} – ${formatTime(entry.closes)}`

export const hasOpeningHours = (): boolean => siteConfig.hours.length > 0

export interface ContactChannels {
  whatsapp: string | null
  whatsappDisplay: string | null
  email: string | null
}

export function getContactChannels(): ContactChannels {
  const whatsapp = getBusinessWhatsApp()
  return {
    whatsapp,
    whatsappDisplay: whatsapp ? (siteConfig.contact.whatsappDisplay ?? `+${whatsapp}`) : null,
    email: siteConfig.contact.email,
  }
}
