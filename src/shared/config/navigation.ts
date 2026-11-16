/** Primary site navigation. Paths are type-checked by TanStack Router where used. */
export const primaryNavigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Historia', to: '/historia' },
  { label: 'Experiencia', to: '/experiencia' },
  { label: 'Carta', to: '/carta' },
  { label: 'Asado de Sábado', to: '/asado-de-sabado' },
  { label: 'Galería', to: '/galeria' },
  { label: 'Contacto', to: '/contacto' },
] as const

export const reservationCta = { label: 'Reservar', to: '/reservar' } as const

export type PrimaryNavigationItem = (typeof primaryNavigation)[number]
