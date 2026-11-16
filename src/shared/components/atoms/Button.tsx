import { createLink } from '@tanstack/react-router'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '@/shared/lib/cn'
import { buttonParts, buttonStyles, type ButtonStyleProps } from './button.styles'

export type { ButtonSize, ButtonStyleProps, ButtonVariant, Tone } from './button.styles'

function ButtonContent({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      {children}
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.5}
          className={buttonParts.arrow}
        />
      ) : null}
    </>
  )
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  ref?: Ref<HTMLButtonElement>
  isLoading?: boolean
}

/** Native `<button>` (forms, toggles). For navigation use `ButtonLink` / `ButtonAnchor`. */
export function Button({
  variant,
  size,
  tone,
  fullWidth,
  withArrow,
  isLoading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(buttonStyles({ variant, size, tone, fullWidth }), className)}
      {...props}
    >
      {isLoading ? <LoaderCircle aria-hidden="true" className={buttonParts.spinner} /> : null}
      <ButtonContent withArrow={withArrow && !isLoading}>{children}</ButtonContent>
    </button>
  )
}

export interface ButtonAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, ButtonStyleProps {
  ref?: Ref<HTMLAnchorElement>
}

/** `<a>` styled as a button — external links (WhatsApp, maps). */
export function ButtonAnchor({
  variant,
  size,
  tone,
  fullWidth,
  withArrow,
  className,
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <a className={cn(buttonStyles({ variant, size, tone, fullWidth }), className)} {...props}>
      <ButtonContent withArrow={withArrow}>{children}</ButtonContent>
    </a>
  )
}

/** Type-safe TanStack Router link styled as a button: `<ButtonLink to="/carta" withArrow>`. */
export const ButtonLink = createLink(ButtonAnchor)
