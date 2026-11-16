import { useStore } from '@tanstack/react-form'
import type { ReactNode } from 'react'
import { useFormContext } from '@/shared/forms/form-context'
import { Button } from '../../atoms/Button'

export interface SubmitButtonProps {
  children: ReactNode
  pendingLabel?: string
  fullWidth?: boolean
  className?: string
}

/** Submit button that reflects the form's submitting state (spinner + disabled). */
export function SubmitButton({ children, pendingLabel = 'Enviando…', fullWidth, className }: SubmitButtonProps) {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  return (
    <Button type="submit" size="lg" withArrow isLoading={isSubmitting} fullWidth={fullWidth} className={className}>
      {isSubmitting ? pendingLabel : children}
    </Button>
  )
}
