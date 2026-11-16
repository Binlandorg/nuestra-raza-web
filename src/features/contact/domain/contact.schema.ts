import { z } from 'zod'
import { normalizePhone } from '@/shared/lib/whatsapp'
import type { ContactFormValues, ContactRequest } from './contact.types'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre (mínimo 2 letras).').max(80, 'El nombre es demasiado largo.'),
  email: z
    .string()
    .trim()
    .min(1, 'Escribe tu correo para poder responderte.')
    .pipe(z.email('Revisa el correo: parece incompleto.')),
  phone: z
    .string()
    .trim()
    .refine((value) => {
      if (value === '') return true
      const digits = normalizePhone(value).length
      return /^[+\d\s().-]+$/.test(value) && digits >= 8 && digits <= 15
    }, 'Revisa el número (incluye el código de país si no es de Perú).'),
  message: z
    .string()
    .trim()
    .min(10, 'Cuéntanos un poco más (mínimo 10 caracteres).')
    .max(1000, 'Máximo 1000 caracteres.'),
})

export function toContactRequest(values: ContactFormValues): ContactRequest {
  const phone = values.phone.trim()
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phone: phone ? phone : null,
    message: values.message.trim(),
  }
}

export function buildContactMessage(request: ContactRequest): string {
  return [
    'Hola, Nuestra Raza. Les escribo desde la web:',
    '',
    `• Nombre: ${request.name}`,
    `• Correo: ${request.email}`,
    ...(request.phone ? [`• Teléfono: ${request.phone}`] : []),
    '',
    request.message,
  ].join('\n')
}
