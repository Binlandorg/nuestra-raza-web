import { cn } from '@/shared/lib/cn'
import styles from './TornEdge.module.css'

/** Deterministic pseudo-random walk → identical path on server and client (no hydration drift). */
function buildTornPath(width: number, height: number, seed: number): string {
  let state = seed
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }

  const points: string[] = []
  let x = 0
  let y = height * 0.55
  while (x < width) {
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    x += 6 + random() * 16
    const drift = (random() - 0.5) * height * 0.5
    y = Math.min(height * 0.92, Math.max(height * 0.12, y + drift))
  }
  points.push(`${width},${y.toFixed(1)}`)
  return `M0,${height} L${points.join(' L')} L${width},${height} Z`
}

const WIDTH = 1440
const HEIGHT = 24
const PATH = buildTornPath(WIDTH, HEIGHT, 7)

export interface TornEdgeProps {
  /** Edge of the parent section the tear sits on. */
  position?: 'top' | 'bottom'
  /** Surface color of the NEXT section (the tear is painted with it). */
  color?: 'cream' | 'sand' | 'charcoal'
  className?: string
}

/**
 * Torn-paper transition between a dark section and the next light one
 * (mockup: "Elementos / Texturas"). Place inside a `relative` section.
 */
export function TornEdge({ position = 'bottom', color = 'cream', className }: TornEdgeProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={cn(styles.edge, styles[color], position === 'bottom' ? styles.bottom : styles.top, className)}
    >
      <path d={PATH} fill="currentColor" />
    </svg>
  )
}
