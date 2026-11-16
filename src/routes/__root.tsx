/// <reference types="vite/client" />
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import playfairLatin from '@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2?url'
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { ErrorPage, NotFoundPage } from '@/features/system'
import type { RouterContext } from '@/router'
import { SiteLayout } from '@/shared/components/templates'
import { buildRestaurantJsonLd, jsonLdScript } from '@/shared/lib/structured-data'
import appCss from '@/shared/styles/global.css?url'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#1b1a18' },
      { name: 'format-detection', content: 'telephone=no' },
      // Fallback (404 and errors); every route defines its own title.
      { title: 'Nuestra Raza · Arequipa' },
    ],
    scripts: [jsonLdScript(buildRestaurantJsonLd())],
    links: [
      { rel: 'preload', href: playfairLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: interLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="es-PE">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}
