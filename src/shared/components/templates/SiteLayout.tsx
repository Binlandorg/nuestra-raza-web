import type { ReactNode } from 'react'
import { Footer } from '../organisms/Footer'
import { Header } from '../organisms/Header'
import styles from './SiteLayout.module.css'

/** Page shell: skip link, fixed header, main landmark and footer. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className={styles.skipLink}
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  )
}
