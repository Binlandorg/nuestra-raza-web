import { createFormHookContexts } from '@tanstack/react-form'

/**
 * TanStack Form contexts shared by every form of the site.
 * Field components (molecules/form-fields) read the field state from here.
 */
export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

/** Extracts the first human-readable message from TanStack Form / Standard Schema errors. */
export function firstErrorMessage(errors: readonly unknown[]): string | undefined {
  for (const error of errors) {
    if (typeof error === 'string' && error) return error
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error.message
    }
  }
  return undefined
}
