import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import { Illustration } from '../atoms/Illustration'
import { SectionLabel } from '../atoms/SectionLabel'
import styles from './CtaBand.module.css'

export interface CtaBandProps {
  label?: string
  /** Quote or heading content (already marked up). */
  children: ReactNode
  actions?: ReactNode
  className?: string
}

/** Closing dark band with the Misti line drawing — quote + call to action. */
export function CtaBand({ label, children, actions, className }: CtaBandProps) {
  return (
    <section data-tone="dark" className={cn(styles.band, surfaces.charcoal, className)}>
      <Illustration name="mountain" className={styles.mountain} />
      <div className={cn(layout.container, styles.inner)}>
        {label ? (
          <SectionLabel tone="dark" line="none">
            {label}
          </SectionLabel>
        ) : null}
        <div className={styles.content}>{children}</div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </section>
  )
}
