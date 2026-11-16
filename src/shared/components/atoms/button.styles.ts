import { cn } from '@/shared/lib/cn'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
/** Surface the component sits on. */
export type Tone = 'light' | 'dark'

export interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: Tone
  fullWidth?: boolean
  /** Trailing arrow (→) that nudges forward on hover — signature of the design system. */
  withArrow?: boolean
}

const VARIANT_CLASS = {
  primary: { light: styles.primary, dark: styles.primary },
  secondary: { light: styles.secondaryLight, dark: styles.secondaryDark },
  ghost: { light: styles.ghostLight, dark: styles.ghostDark },
} as const

/** Class list for anything that should look like a button (`<button>`, `<a>`, router links). */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  tone = 'light',
  fullWidth = false,
}: Omit<ButtonStyleProps, 'withArrow'> = {}): string {
  return cn(styles.button, styles[size], VARIANT_CLASS[variant][tone], fullWidth && styles.fullWidth)
}

export const buttonParts = { arrow: styles.arrow, spinner: styles.spinner }
