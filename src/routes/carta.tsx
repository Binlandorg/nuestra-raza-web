import { createFileRoute } from '@tanstack/react-router'
import { buildMenuJsonLd, getMenu, MenuPage } from '@/features/menu'
import { buildPageHead } from '@/shared/lib/seo'
import { jsonLdScript } from '@/shared/lib/structured-data'

export const Route = createFileRoute('/carta')({
  loader: () => getMenu(),
  head: ({ loaderData }) => {
    const head = buildPageHead({
      title: 'Carta',
      path: '/carta',
      image: '/og/carta.jpg',
      imageAlt: 'Parrilla larga cargada de cortes sobre las brasas',
      description:
        'Cortes a la parrilla, achuras, entradas, acompañamientos, vinos y postres: la carta de inspiración argentina de Nuestra Raza en Arequipa.',
    })
    return { ...head, scripts: loaderData ? [jsonLdScript(buildMenuJsonLd(loaderData))] : [] }
  },
  component: MenuRoute,
})

function MenuRoute() {
  return <MenuPage menu={Route.useLoaderData()} />
}
