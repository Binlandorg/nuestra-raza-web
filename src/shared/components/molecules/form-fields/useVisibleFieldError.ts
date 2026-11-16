import { useStore } from '@tanstack/react-form'
import { firstErrorMessage, useFieldContext } from '@/shared/forms/form-context'

/**
 * Error shown for the current field: only after the visitor left the field
 * or tried to submit — never while they are typing for the first time.
 */
export function useVisibleFieldError() {
  const field = useFieldContext<unknown>()
  const submissionAttempts = useStore(field.form.store, (state) => state.submissionAttempts)
  const { errors, isBlurred } = field.state.meta
  const visible = isBlurred || submissionAttempts > 0
  return { field, error: visible ? firstErrorMessage(errors) : undefined }
}
