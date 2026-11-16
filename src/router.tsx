import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export interface RouterContext {
  queryClient: QueryClient
}

/** Router factory used by TanStack Start (one instance per request on the server). */
export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      // Requests (reservations, contact) must never be sent twice automatically.
      mutations: { retry: 0 },
    },
  })

  return createRouter({
    routeTree,
    context: { queryClient } satisfies RouterContext,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    Wrap: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  })
}
