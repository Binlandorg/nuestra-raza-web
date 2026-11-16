import { Link } from '@tanstack/react-router'
import { primaryNavigation } from '@/shared/config/navigation'
import styles from './DesktopNavigation.module.css'

/** Inline primary navigation (≥ 1024 px). Active page: cream text + terracotta rule. */
export function DesktopNavigation({ className }: { className?: string }) {
  return (
    <nav aria-label="Principal" className={className}>
      <ul className={styles.list}>
        {primaryNavigation.map((item) => (
          <li key={item.to}>
            <Link to={item.to} activeOptions={{ exact: item.to === '/', includeHash: false }} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
