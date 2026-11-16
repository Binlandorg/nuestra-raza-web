import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from 'react'
import { Input } from '../../atoms/FormControls'
import { FormField } from '../FormField'
import { useVisibleFieldError } from './useVisibleFieldError'

export interface TextFieldProps {
  label: string
  hint?: ReactNode
  required?: boolean
  type?: HTMLInputTypeAttribute
  placeholder?: string
  autoComplete?: HTMLInputAutoCompleteAttribute
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal' | 'search' | 'url'
  min?: string
  max?: string
  className?: string
}

/** Text/date/time/tel input bound to the surrounding TanStack `form.AppField`. */
export function TextField({ label, hint, required, className, ...inputProps }: TextFieldProps) {
  const { field, error } = useVisibleFieldError()
  const value = field.state.value

  return (
    <FormField label={label} hint={hint} error={error} required={required} className={className}>
      {(control) => (
        <Input
          {...control}
          {...inputProps}
          name={field.name}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
        />
      )}
    </FormField>
  )
}
