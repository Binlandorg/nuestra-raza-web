import { useMutation } from '@tanstack/react-query'
import type { ContactRequest } from '../domain/contact.types'
import { getContactGateway } from '../gateways'

/** TanStack Query mutation for the contact form. */
export function useContactRequest() {
  return useMutation({
    mutationKey: ['contact', 'message'],
    mutationFn: (request: ContactRequest) => getContactGateway().submit(request),
  })
}
