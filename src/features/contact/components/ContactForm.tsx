import { useEffect, useRef } from 'react'
import { BrandIcon, Button, ButtonAnchor } from '@/shared/components/atoms'
import { FormStatus } from '@/shared/components/molecules'
import { useAppForm } from '@/shared/forms/app-form'
import { focusFirstInvalid } from '@/shared/forms/focus-first-invalid'
import { contactSchema, toContactRequest } from '../domain/contact.schema'
import { ContactChannelUnavailableError, type ContactFormValues, type ContactResult } from '../domain/contact.types'
import { getContactGateway } from '../gateways'
import { useContactRequest } from '../hooks/useContactRequest'
import styles from './ContactForm.module.css'

const SUBMIT_LABEL: Record<ContactResult['channel'], string> = {
  api: 'Enviar mensaje',
  whatsapp: 'Enviar por WhatsApp',
  email: 'Enviar por correo',
}

const DEFAULT_VALUES: ContactFormValues = { name: '', email: '', phone: '', message: '' }

/** Contact form (TanStack Form + Zod + TanStack Query) with success/failure states. */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const mutation = useContactRequest()
  const channel = getContactGateway().channel

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: { onChange: contactSchema, onSubmit: contactSchema },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(toContactRequest(value)).catch(() => undefined)
    },
    onSubmitInvalid: () => focusFirstInvalid(formRef.current),
  })

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) statusRef.current?.focus()
  }, [mutation.isSuccess, mutation.isError])

  const startOver = () => {
    mutation.reset()
    form.reset()
  }

  if (mutation.isSuccess) {
    const result = mutation.data
    return (
      <FormStatus
        ref={statusRef}
        variant="success"
        title={result.channel === 'api' ? '¡Gracias! Recibimos tu mensaje' : 'Tu mensaje está listo'}
        actions={
          <>
            {result.channel === 'whatsapp' ? (
              <ButtonAnchor href={result.url} target="_blank" rel="noopener noreferrer" size="sm">
                <BrandIcon name="whatsapp" className={styles.icon} />
                Abrir WhatsApp
              </ButtonAnchor>
            ) : null}
            {result.channel === 'email' ? (
              <ButtonAnchor href={result.url} size="sm">
                Abrir mi correo
              </ButtonAnchor>
            ) : null}
            <Button variant="ghost" size="sm" onClick={startOver}>
              Escribir otro mensaje
            </Button>
          </>
        }
      >
        {result.channel === 'api'
          ? 'Te responderemos lo antes posible.'
          : result.channel === 'whatsapp'
            ? 'Abrimos WhatsApp con tu mensaje. Solo tienes que enviarlo y te responderemos lo antes posible.'
            : 'Abrimos tu aplicación de correo con el mensaje listo. Solo tienes que enviarlo.'}
      </FormStatus>
    )
  }

  const unavailable = mutation.error instanceof ContactChannelUnavailableError

  return (
    <form
      ref={formRef}
      noValidate
      aria-label="Formulario de contacto"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
      className={styles.form}
    >
      {mutation.isError ? (
        <FormStatus
          ref={statusRef}
          variant="error"
          title={unavailable ? 'Nuestros canales se están configurando' : 'No pudimos enviar tu mensaje'}
        >
          {unavailable
            ? 'Muy pronto podrás escribirnos desde aquí. Gracias por tu paciencia.'
            : 'Revisa tu conexión a internet e inténtalo de nuevo en unos segundos.'}
        </FormStatus>
      ) : null}

      <div className={styles.fields}>
        <form.AppField name="name">
          {(field) => <field.TextField label="Nombre" autoComplete="name" required />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField label="Correo electrónico" type="email" inputMode="email" autoComplete="email" required />
          )}
        </form.AppField>
      </div>
      <form.AppField name="phone">
        {(field) => <field.TextField label="Teléfono o WhatsApp" type="tel" inputMode="tel" autoComplete="tel" />}
      </form.AppField>
      <form.AppField name="message">
        {(field) => <field.TextareaField label="Mensaje" rows={5} maxLength={1000} required />}
      </form.AppField>

      <form.AppForm>
        <form.SubmitButton fullWidth>{SUBMIT_LABEL[channel]}</form.SubmitButton>
      </form.AppForm>
    </form>
  )
}
