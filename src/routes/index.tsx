import { createFileRoute } from '@tanstack/react-router'
import { getGalleryPreview } from '@/features/gallery'
import { HomePage } from '@/features/home'
import { getFeaturedDishes } from '@/features/menu'
import { getSaturdayAsado } from '@/features/saturday-asado'
import { buildPageHead } from '@/shared/lib/seo'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [featuredDishes, saturdayAsado, galleryPreview] = await Promise.all([
      getFeaturedDishes(),
      getSaturdayAsado(),
      getGalleryPreview(),
    ])
    return { featuredDishes, saturdayAsado, galleryPreview }
  },
  head: () =>
    buildPageHead({
      path: '/',
      description:
        'Asado de inspiración argentina en Arequipa. Buena carne, fuego lento, vino y largas sobremesas. Reserva tu lugar en el Asado de Sábado de Nuestra Raza.',
    }),
  component: HomeRoute,
})

function HomeRoute() {
  const data = Route.useLoaderData()
  return <HomePage {...data} />
}
