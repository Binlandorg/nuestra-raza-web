export interface ContactFormValues {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactRequest {
  name: string
  email: string
  phone: string | null
  message: string
}

export type ContactResult =
  | { channel: 'api' }
  | { channel: 'whatsapp'; url: string; opened: boolean }
  | { channel: 'email'; url: string }

export interface ContactGateway {
  readonly channel: ContactResult['channel']
  submit(request: ContactRequest): Promise<ContactResult>
}

export class ContactChannelUnavailableError extends Error {
  override name = 'ContactChannelUnavailableError'
}
