import { createFileRoute, useHydrated } from '@tanstack/react-router'
import { isReservationExperience, ReservationPage, type ReservationExperience } from '@/features/reservations'
import { getSaturdayAsado } from '@/features/saturday-asado'
import { buildPageHead } from '@/shared/lib/seo'

/** /reservar?experiencia=evento-privado preselects the reservation type. */
const validateReservationSearch = (search: Record<string, unknown>): { experiencia?: ReservationExperience } => ({
  experiencia: isReservationExperience(search.experiencia) ? search.experiencia : undefined,
})

export const Route = createFileRoute('/reservar')({
  validateSearch: validateReservationSearch,
  loader: () => getSaturdayAsado(),
  head: () =>
    buildPageHead({
      title: 'Reservar',
      path: '/reservar',
      image: '/og/asado-de-sabado.jpg',
      imageAlt: 'Mesa larga servida a la luz de las velas',
      description:
        'Solicita tu reserva para el Asado de Sábado o tu evento privado en Nuestra Raza, Arequipa. Te confirmamos la disponibilidad por WhatsApp.',
    }),
  component: ReservationRoute,
})

function ReservationRoute() {
  const event = Route.useLoaderData()
  const { experiencia } = Route.useSearch()
  // Prerendered HTML has no search params: switch the preselection after hydration.
  const hydrated = useHydrated()
  const experience = (hydrated ? experiencia : undefined) ?? 'asado-de-sabado'

  return (
    <ReservationPage
      key={experience}
      experience={experience}
      soldOutDates={event.upcomingDates.filter((date) => date.availability === 'sold-out').map((date) => date.date)}
      eventStartTime={event.schedule.startTime}
    />
  )
}
