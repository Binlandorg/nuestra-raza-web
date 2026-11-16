import { cn } from '@/shared/lib/cn'
import styles from './ScrollCue.module.css'

export interface ScrollCueProps {
  /** In-page anchor of the first section after the hero. */
  href: string
  className?: string
}

/** Minimal "scroll" indicator from the homepage mockup (mouse outline). Animates 3 times, then rests. */
export function ScrollCue({ href, className }: ScrollCueProps) {
  return (
    <a
      href={href}
      aria-label="Desplázate para descubrir más"
      className={cn(styles.cue, className)}
    >
      <span aria-hidden="true" className={styles.dot} />
    </a>
  )
}
