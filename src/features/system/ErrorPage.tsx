import type { ErrorComponentProps } from '@tanstack/react-router'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Accent, Button, ButtonLink, Container, Heading, SectionLabel } from '@/shared/components/atoms'
import { cn } from '@/shared/lib/cn'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import styles from './system.module.css'

/** Unexpected runtime error: friendly message + retry, details only in development. */
export function ErrorPage({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  const retry = () => {
    reset()
    void router.invalidate()
  }

  return (
    <section data-tone="dark" className={cn(styles.section, surfaces.charcoal)}>
      <Container className={styles.inner}>
        <SectionLabel tone="dark">Algo salió mal</SectionLabel>
        <Heading as="h1" size="h1" tone="dark">
          Se nos apagó <Accent tone="dark">el fuego.</Accent>
        </Heading>
        <p className={cn(text.lead, styles.text)}>
          Ocurrió un error inesperado al cargar esta página. Inténtalo de nuevo en unos segundos.
        </p>
        {import.meta.env.DEV && error instanceof Error ? (
          <pre className={styles.details}>{error.message}</pre>
        ) : null}
        <div className={styles.actions}>
          <Button onClick={retry} withArrow>
            Reintentar
          </Button>
          <ButtonLink to="/" variant="secondary" tone="dark">
            Ir al inicio
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
