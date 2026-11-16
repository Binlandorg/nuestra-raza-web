import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '@/features/contact'
import { buildPageHead } from '@/shared/lib/seo'

export const Route = createFileRoute('/contacto')({
  head: () =>
    buildPageHead({
      title: 'Contacto',
      path: '/contacto',
      image: '/og/contacto.jpg',
      imageAlt: 'El sol se pone detrás de una cadena de montañas andinas',
      description:
        'Escríbenos para consultas, celebraciones y eventos privados. Nuestra Raza, asado de inspiración argentina en Arequipa, Perú.',
    }),
  component: ContactPage,
})
