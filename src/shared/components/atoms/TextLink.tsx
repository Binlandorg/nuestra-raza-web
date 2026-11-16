import { createLink } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, Ref } from 'react'
import { cn } from '@/shared/lib/cn'
import type { Tone } from './Button'
import styles from './TextLink.module.css'

export interface TextAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>
  tone?: Tone
  withArrow?: boolean
}

/** Underlined editorial link ("Conoce más →"). */
export function TextAnchor({ tone = 'light', withArrow = true, className, children, ...props }: TextAnchorProps) {
  return (
    <a className={cn(styles.link, tone === 'dark' ? styles.dark : styles.light, className)} {...props}>
      {children}
      {withArrow ? <ArrowRight aria-hidden="true" strokeWidth={1.5} className={styles.arrow} /> : null}
    </a>
  )
}

/** Type-safe router version of `TextAnchor`. */
export const TextLink = createLink(TextAnchor)
