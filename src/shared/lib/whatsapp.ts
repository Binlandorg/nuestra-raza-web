import { env } from '@/shared/config/env'
import { siteConfig } from '@/shared/config/site.config'

/** Keep digits only: "+51 987 654 321" → "51987654321". */
export const normalizePhone = (raw: string): string => raw.replace(/\D+/g, '')

/**
 * Business WhatsApp number in international format, or `null` while it is not configured.
 * `VITE_WHATSAPP_NUMBER` (environment) overrides `site.config.ts` — handy for staging.
 */
export function getBusinessWhatsApp(): string | null {
  const raw = env.whatsappNumber ?? siteConfig.contact.whatsapp
  if (!raw) return null
  const digits = normalizePhone(raw)
  return digits.length >= 8 ? digits : null
}

/** wa.me deep link with an optional prefilled message (works on mobile app and WhatsApp Web). */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizePhone(phone)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Link to the business WhatsApp, or `null` when no number is configured. */
export function getBusinessWhatsAppUrl(message?: string): string | null {
  const phone = getBusinessWhatsApp()
  return phone ? buildWhatsAppUrl(phone, message) : null
}

/**
 * Opens WhatsApp in a new tab. Returns `false` if the browser blocked the popup,
 * so the UI can offer a manual link instead.
 */
export function openWhatsApp(url: string): boolean {
  if (typeof window === 'undefined') return false
  const opened = window.open(url, '_blank')
  if (!opened) return false
  opened.opener = null
  return true
}
