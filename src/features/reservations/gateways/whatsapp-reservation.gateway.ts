import { buildWhatsAppUrl, getBusinessWhatsApp, openWhatsApp } from '@/shared/lib/whatsapp'
import { buildReservationMessage } from '../domain/reservation-message'
import { ReservationChannelUnavailableError, type ReservationGateway } from '../domain/reservation.types'

/**
 * Initial channel: opens WhatsApp with a pre-formatted request.
 * Nothing is stored; the business confirms by replying in WhatsApp.
 */
export const whatsappReservationGateway: ReservationGateway = {
  channel: 'whatsapp',
  async submit(request) {
    const phone = getBusinessWhatsApp()
    if (!phone) {
      throw new ReservationChannelUnavailableError('WhatsApp number is not configured (site.config.ts / VITE_WHATSAPP_NUMBER).')
    }
    const whatsappUrl = buildWhatsAppUrl(phone, buildReservationMessage(request))
    const opened = openWhatsApp(whatsappUrl)
    return { channel: 'whatsapp', status: 'pending-confirmation', whatsappUrl, opened }
  },
}
