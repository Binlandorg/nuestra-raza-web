import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'

/** Centered content column with the site gutters (20 / 32 / 48 px). */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(layout.container, className)} {...props} />
}
