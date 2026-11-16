import type { Ref } from 'react'
import { BrandIcon, Button, ButtonAnchor } from '@/shared/components/atoms'
import { FormStatus } from '@/shared/components/molecules'
import type { ReservationResult } from '../domain/reservation.types'
import styles from './ReservationForm.module.css'

export interface ReservationResultPanelProps {
  result: ReservationResult
  onNewRequest: () => void
  ref?: Ref<HTMLDivElement>
}

/** Success state (FormSuccess). Always states that confirmation is still pending. */
export function ReservationResultPanel({ result, onNewRequest, ref }: ReservationResultPanelProps) {
  if (result.channel === 'api') {
    return (
      <FormStatus
        ref={ref}
        variant="success"
        title="Recibimos tu solicitud"
        actions={
          <Button variant="secondary" size="sm" onClick={onNewRequest}>
            Hacer otra solicitud
          </Button>
        }
      >
        <p>
          Revisaremos la disponibilidad y te escribiremos por WhatsApp para confirmar.
          {result.reference ? ` Tu número de solicitud es ${result.reference}.` : null} Tu reserva quedará confirmada
          solo con nuestra respuesta.
        </p>
      </FormStatus>
    )
  }

  return (
    <FormStatus
      ref={ref}
      variant={result.opened ? 'success' : 'info'}
      title={result.opened ? 'Tu solicitud está lista en WhatsApp' : 'Falta un paso: abre WhatsApp'}
      actions={
        <>
          <ButtonAnchor href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" size="sm">
            <BrandIcon name="whatsapp" className={styles.icon} />
            {result.opened ? 'Abrir WhatsApp de nuevo' : 'Abrir WhatsApp'}
          </ButtonAnchor>
          <Button variant="ghost" size="sm" onClick={onNewRequest}>
            Hacer otra solicitud
          </Button>
        </>
      }
    >
      <p>
        {result.opened
          ? 'Abrimos WhatsApp con tu mensaje. Solo tienes que enviarlo para que nuestro equipo revise la disponibilidad.'
          : 'Tu navegador no abrió WhatsApp automáticamente. Usa el botón para abrirlo y enviar tu solicitud.'}{' '}
        Tu reserva quedará confirmada únicamente cuando te respondamos.
      </p>
    </FormStatus>
  )
}
