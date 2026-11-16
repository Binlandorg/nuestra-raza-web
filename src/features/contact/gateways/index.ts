import { env } from '@/shared/config/env'
import { siteConfig } from '@/shared/config/site.config'
import { buildWhatsAppUrl, getBusinessWhatsApp, openWhatsApp } from '@/shared/lib/whatsapp'
import { buildContactMessage } from '../domain/contact.schema'
import { ContactChannelUnavailableError, type ContactGateway } from '../domain/contact.types'

/** POST JSON to a form service or serverless function (`VITE_CONTACT_ENDPOINT`). */
function createHttpContactGateway(endpoint: string): ContactGateway {
  return {
    channel: 'api',
    async submit(request) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) throw new Error(`Contact endpoint responded ${response.status}`)
      return { channel: 'api' }
    },
  }
}

const whatsappContactGateway: ContactGateway = {
  channel: 'whatsapp',
  submit(request) {
    const phone = getBusinessWhatsApp()
    if (!phone) return Promise.reject(new ContactChannelUnavailableError('WhatsApp number is not configured.'))
    const url = buildWhatsAppUrl(phone, buildContactMessage(request))
    return Promise.resolve({ channel: 'whatsapp', url, opened: openWhatsApp(url) })
  },
}

function createEmailContactGateway(email: string): ContactGateway {
  return {
    channel: 'email',
    submit(request) {
      const params = new URLSearchParams({ subject: `Consulta web · ${request.name}`, body: buildContactMessage(request) })
      // mailto expects %20 for spaces, not "+".
      const url = `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`
      window.location.href = url
      return Promise.resolve({ channel: 'email', url })
    },
  }
}

const unavailableGateway: ContactGateway = {
  channel: 'api',
  submit: () => Promise.reject(new ContactChannelUnavailableError('No contact channel configured.')),
}

/**
 * Channel priority: HTTP endpoint → WhatsApp → e-mail client.
 * With nothing configured, the form shows a friendly "canal en configuración" state.
 */
export function getContactGateway(): ContactGateway {
  if (env.contactEndpoint) return createHttpContactGateway(env.contactEndpoint)
  if (getBusinessWhatsApp()) return whatsappContactGateway
  if (siteConfig.contact.email) return createEmailContactGateway(siteConfig.contact.email)
  return unavailableGateway
}
