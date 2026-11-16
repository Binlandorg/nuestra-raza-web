import { createFileRoute } from '@tanstack/react-router'
import { StoryPage } from '@/features/story'
import { buildPageHead } from '@/shared/lib/seo'

export const Route = createFileRoute('/historia')({
  head: () =>
    buildPageHead({
      title: 'Nuestra historia',
      path: '/historia',
      image: '/og/historia.jpg',
      imageAlt: 'Jinete arreando ganado entre una nube de polvo',
      description:
        'Dos tierras, una misma pasión: la tradición argentina del asado y la hospitalidad peruana se encuentran en Nuestra Raza, Arequipa.',
    }),
  component: StoryPage,
})
