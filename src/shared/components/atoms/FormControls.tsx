import { ChevronDown } from 'lucide-react'
import type { InputHTMLAttributes, Ref, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './FormControls.module.css'

export function Input({ className, ref, ...props }: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} className={cn(styles.control, styles.input, className)} {...props} />
}

export function Textarea({
  className,
  ref,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: Ref<HTMLTextAreaElement> }) {
  return <textarea ref={ref} className={cn(styles.control, styles.textarea, className)} {...props} />
}

export function Select({
  className,
  ref,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { ref?: Ref<HTMLSelectElement> }) {
  return (
    <div className={styles.selectWrapper}>
      <select ref={ref} className={cn(styles.control, styles.select, className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" strokeWidth={1.5} className={styles.chevron} />
    </div>
  )
}
