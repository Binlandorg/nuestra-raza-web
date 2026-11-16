import { clsx, type ClassValue } from 'clsx'

/**
 * Join class names conditionally (CSS Modules classes, `className` props).
 * Precedence between components is defined by cascade layers, not by this helper:
 * see src/shared/styles/global.css.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
