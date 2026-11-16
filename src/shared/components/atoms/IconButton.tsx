import type { ButtonHTMLAttributes, Ref } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Tone } from './Button'
import styles from './IconButton.module.css'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>
  /** Accessible name (required: icon-only controls have no visible text). */
  label: string
  tone?: Tone
  variant?: 'plain' | 'outline'
}

/** Square 44 px touch target holding a single icon. */
export function IconButton({
  label,
  tone = 'light',
  variant = 'plain',
  className,
  type = 'button',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(styles.button, tone === 'dark' && styles.dark, variant === 'outline' && styles.outline, className)}
      {...props}
    >
      {children}
    </button>
  )
}
