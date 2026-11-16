import type { ReactNode } from 'react'
import { Select } from '../../atoms/FormControls'
import { FormField } from '../FormField'
import { useVisibleFieldError } from './useVisibleFieldError'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFieldProps {
  label: string
  options: readonly SelectOption[]
  placeholder?: string
  hint?: ReactNode
  required?: boolean
  className?: string
}

/** Native select (best on mobile) bound to the surrounding TanStack `form.AppField`. */
export function SelectField({ label, options, placeholder, hint, required, className }: SelectFieldProps) {
  const { field, error } = useVisibleFieldError()
  const value = field.state.value

  return (
    <FormField label={label} hint={hint} error={error} required={required} className={className}>
      {(control) => (
        <Select
          {...control}
          name={field.name}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    </FormField>
  )
}
