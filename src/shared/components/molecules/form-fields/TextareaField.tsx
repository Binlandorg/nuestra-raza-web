import type { ReactNode } from 'react'
import { Textarea } from '../../atoms/FormControls'
import { FormField } from '../FormField'
import { useVisibleFieldError } from './useVisibleFieldError'

export interface TextareaFieldProps {
  label: string
  hint?: ReactNode
  required?: boolean
  placeholder?: string
  rows?: number
  maxLength?: number
  className?: string
}

/** Multiline text bound to the surrounding TanStack `form.AppField`. */
export function TextareaField({ label, hint, required, className, rows = 4, ...props }: TextareaFieldProps) {
  const { field, error } = useVisibleFieldError()
  const value = field.state.value

  return (
    <FormField label={label} hint={hint} error={error} required={required} className={className}>
      {(control) => (
        <Textarea
          {...control}
          {...props}
          rows={rows}
          name={field.name}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
        />
      )}
    </FormField>
  )
}
