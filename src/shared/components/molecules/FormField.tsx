import { CircleAlert } from 'lucide-react'
import { useId, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './FormField.module.css'

export interface FieldControlProps {
  id: string
  'aria-invalid': boolean
  'aria-describedby': string | undefined
  'aria-required': boolean | undefined
}

export interface FormFieldProps {
  label: string
  hint?: ReactNode
  error?: string
  required?: boolean
  /** Shown next to the label for optional fields. */
  optionalLabel?: string
  className?: string
  /** Render the control with the wiring props (id, aria-*). */
  children: (control: FieldControlProps) => ReactNode
}

/** Validation message linked to its control through `aria-describedby`. */
export function FormError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className={styles.error}>
      <CircleAlert aria-hidden="true" strokeWidth={1.75} className={styles.errorIcon} />
      <span>{children}</span>
    </p>
  )
}

/** Label + control + hint + error, with accessible associations generated automatically. */
export function FormField({ label, hint, error, required, optionalLabel = 'Opcional', className, children }: FormFieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        <span>
          {label}
          {required ? (
            <span aria-hidden="true" className={styles.required}>
              *
            </span>
          ) : null}
        </span>
        {!required ? <span className={styles.optional}>{optionalLabel}</span> : null}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        'aria-required': required || undefined,
      })}
      {error ? <FormError id={errorId}>{error}</FormError> : null}
      {hint && !error ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
