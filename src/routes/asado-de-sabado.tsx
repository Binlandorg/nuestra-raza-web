import { createFileRoute } from '@tanstack/react-router'
import { getMenu, selectMenuItems } from '@/features/menu'
import { buildSaturdayAsadoJsonLd, getSaturdayAsado, SaturdayAsadoPage } from '@/features/saturday-asado'
import { todayIso } from '@/shared/lib/format'
import { buildPageHead } from '@/shared/lib/seo'
import { jsonLdScript } from '@/shared/lib/structured-data'

export const Route = createFileRoute('/asado-de-sabado')({
  loader: async () => {
    const [event, menu] = await Promise.all([getSaturdayAsado(), getMenu()])
    return { event, featuredCuts: selectMenuItems(menu, ['tira-de-asado', 'vacio', 'entrana']) }
  },
  head: ({ loaderData }) => {
    const head = buildPageHead({
      title: 'Asado de Sábado',
      path: '/asado-de-sabado',
      image: '/og/asado-de-sabado.jpg',
      imageAlt: 'Mesa larga servida a la luz de las velas',
      description:
        'Una jornada alrededor del fuego, la buena carne y las largas sobremesas. Conoce el Asado de Sábado de Nuestra Raza en Arequipa y reserva tu lugar.',
    })
    // Event structured data is published only for confirmed upcoming dates.
    const events = loaderData ? buildSaturdayAsadoJsonLd(loaderData.event, todayIso()) : []
    return { ...head, scripts: events.map(jsonLdScript) }
  },
  component: SaturdayAsadoRoute,
})

function SaturdayAsadoRoute() {
  const { event, featuredCuts } = Route.useLoaderData()
  return <SaturdayAsadoPage event={event} featuredCuts={featuredCuts} />
}
