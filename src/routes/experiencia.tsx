import { createFileRoute } from '@tanstack/react-router'
import { ExperiencePage } from '@/features/experience'
import { getSaturdayAsado } from '@/features/saturday-asado'
import { buildPageHead } from '@/shared/lib/seo'

export const Route = createFileRoute('/experiencia')({
  loader: () => getSaturdayAsado(),
  head: () =>
    buildPageHead({
      title: 'La experiencia',
      path: '/experiencia',
      image: '/og/experiencia.jpg',
      imageAlt: 'Parrillero dando vuelta la carne entre el humo y las llamas',
      description:
        'El fuego, la mesa, la música y el encuentro: así se vive el ritual del asado en Nuestra Raza, Arequipa.',
    }),
  component: ExperienceRoute,
})

function ExperienceRoute() {
  return <ExperiencePage event={Route.useLoaderData()} />
}
