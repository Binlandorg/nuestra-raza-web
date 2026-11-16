import { Mail } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'
import { TextAnchor } from '@/shared/components/atoms'
import { FormStatus } from '@/shared/components/molecules'
import { siteConfig } from '@/shared/config/site.config'
import { useAppForm } from '@/shared/forms/app-form'
import { focusFirstInvalid } from '@/shared/forms/focus-first-invalid'
import { useToday } from '@/shared/hooks/useToday'
import { addDaysIso, formatTime } from '@/shared/lib/format'
import { createReservationSchema, toReservationRequest } from '../domain/reservation.schema'
import {
  RESERVATION_EXPERIENCES,
  ReservationChannelUnavailableError,
  type ReservationExperience,
  type ReservationFormValues,
} from '../domain/reservation.types'
import { getReservationGateway } from '../gateways'
import { useReservationRequest } from '../hooks/useReservationRequest'
import { ReservationNotice } from './ReservationNotice'
import styles from './ReservationForm.module.css'
import { ReservationResultPanel } from './ReservationResultPanel'

const EXPERIENCE_OPTIONS = Object.entries(RESERVATION_EXPERIENCES).map(([value, label]) => ({ value, label }))

const MAX_PARTY = siteConfig.reservations.maxPartySize
const GUEST_OPTIONS = [
  ...Array.from({ length: MAX_PARTY }, (_, index) => {
    const count = String(index + 1)
    return { value: count, label: `${count} ${count === '1' ? 'persona' : 'personas'}` }
  }),
  { value: `${MAX_PARTY}+`, label: `Más de ${MAX_PARTY} personas` },
]

export interface ReservationFormProps {
  defaultExperience?: ReservationExperience
  /** Saturdays already sold out (from the event configuration). */
  soldOutDates?: readonly string[]
  /** "13:00" — shown as a hint when the Saturday schedule is confirmed. */
  eventStartTime?: string | null
}

const EMPTY_DATES: readonly string[] = []

/**
 * Reservation request form (TanStack Form + Zod + TanStack Query).
 * Submitting never confirms a booking: it hands a request to the active gateway.
 */
export function ReservationForm({
  defaultExperience = 'asado-de-sabado',
  soldOutDates = EMPTY_DATES,
  eventStartTime = null,
}: ReservationFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const today = useToday()
  const mutation = useReservationRequest()
  const channel = getReservationGateway().channel

  const schema = useMemo(
    () => createReservationSchema({ today, maxDaysAhead: siteConfig.reservations.maxDaysAhead, soldOutDates }),
    [today, soldOutDates],
  )

  const defaultValues: ReservationFormValues = {
    experience: defaultExperience,
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    comments: '',
  }

  const form = useAppForm({
    defaultValues,
    validators: { onChange: schema, onSubmit: schema },
    onSubmit: async ({ value }) => {
      // Errors are kept in the mutation state and rendered below.
      await mutation.mutateAsync(toReservationRequest(value)).catch(() => undefined)
    },
    onSubmitInvalid: () => focusFirstInvalid(formRef.current),
  })

  // Announce the outcome: move focus to the status message.
  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) statusRef.current?.focus()
  }, [mutation.isSuccess, mutation.isError])

  if (mutation.isSuccess) {
    return (
      <ReservationResultPanel
        ref={statusRef}
        result={mutation.data}
        onNewRequest={() => {
          mutation.reset()
          form.reset()
        }}
      />
    )
  }

  const channelUnavailable = mutation.error instanceof ReservationChannelUnavailableError

  return (
    <form
      ref={formRef}
      noValidate
      aria-label="Solicitud de reserva"
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
          title={channelUnavailable ? 'Aún no podemos recibir reservas en línea' : 'No pudimos enviar tu solicitud'}
          actions={
            channelUnavailable && siteConfig.contact.email ? (
              <TextAnchor href={`mailto:${siteConfig.contact.email}`}>
                <Mail aria-hidden="true" strokeWidth={1.5} className={styles.icon} />
                Escríbenos por correo
              </TextAnchor>
            ) : null
          }
        >
          {channelUnavailable
            ? 'Nuestro canal de reservas por WhatsApp se está configurando. Vuelve a intentarlo muy pronto.'
            : 'Revisa tu conexión a internet e inténtalo de nuevo en unos segundos.'}
        </FormStatus>
      ) : null}

      <form.AppField name="experience">
        {(field) => <field.SelectField label="Tipo de reserva" options={EXPERIENCE_OPTIONS} required />}
      </form.AppField>

      <div className={styles.fields}>
        <form.AppField name="name">
          {(field) => <field.TextField label="Nombre" autoComplete="name" placeholder="Tu nombre y apellido" required />}
        </form.AppField>
        <form.AppField name="phone">
          {(field) => (
            <field.TextField
              label="WhatsApp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+51 9XX XXX XXX"
              hint="Te confirmaremos la reserva por este número."
              required
            />
          )}
        </form.AppField>

        <form.Subscribe selector={(state) => state.values.experience === 'asado-de-sabado'}>
          {(isSaturdayAsado) => (
            <>
              <form.AppField name="date">
                {(field) => (
                  <field.TextField
                    label="Fecha"
                    type="date"
                    min={today ?? undefined}
                    max={today ? addDaysIso(today, siteConfig.reservations.maxDaysAhead) : undefined}
                    hint={isSaturdayAsado ? 'El Asado de Sábado se realiza solo los sábados.' : 'La fecha de tu celebración o encuentro.'}
                    required
                  />
                )}
              </form.AppField>
              <form.AppField name="time">
                {(field) => (
                  <field.TextField
                    label="Hora preferida"
                    type="time"
                    hint={
                      isSaturdayAsado && eventStartTime
                        ? `El Asado de Sábado comienza a las ${formatTime(eventStartTime)}.`
                        : 'Opcional. Te confirmaremos el horario al responder.'
                    }
                  />
                )}
              </form.AppField>
            </>
          )}
        </form.Subscribe>

        <form.AppField name="guests">
          {(field) => <field.SelectField label="Número de personas" options={GUEST_OPTIONS} required />}
        </form.AppField>
      </div>

      <form.AppField name="comments">
        {(field) => (
          <field.TextareaField
            label="Comentarios"
            rows={3}
            maxLength={500}
            placeholder="Ocasión especial, restricciones alimentarias, preferencias de mesa…"
          />
        )}
      </form.AppField>

      <ReservationNotice channel={channel} />

      <form.AppForm>
        <form.SubmitButton fullWidth pendingLabel="Preparando tu solicitud…">
          {channel === 'whatsapp' ? 'Enviar solicitud por WhatsApp' : 'Enviar solicitud'}
        </form.SubmitButton>
      </form.AppForm>

      <p className={styles.footnote}>
        Los campos marcados con <span className={styles.required}>*</span> son obligatorios.
      </p>
    </form>
  )
}
