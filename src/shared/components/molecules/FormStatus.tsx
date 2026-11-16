import { CircleAlert, CircleCheck, Info } from 'lucide-react'
import type { ReactNode, Ref } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './FormStatus.module.css'

export type FormStatusVariant = 'success' | 'error' | 'info'

export interface FormStatusProps {
  variant: FormStatusVariant
  title: string
  children?: ReactNode
  actions?: ReactNode
  className?: string
  /** Focus target after submit so screen readers announce the result. */
  ref?: Ref<HTMLDivElement>
}

const ICONS: Record<FormStatusVariant, typeof Info> = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
}

/** Form-level feedback (FormSuccess / FormError) announced via a live region. */
export function FormStatus({ variant, title, children, actions, className, ref }: FormStatusProps) {
  const Icon = ICONS[variant]

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(styles.status, styles[variant], className)}
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className={styles.icon} />
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {children ? <div className={styles.message}>{children}</div> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  )
}
