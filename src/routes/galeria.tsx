import { createFileRoute, useHydrated, useRouter } from '@tanstack/react-router'
import { useRef } from 'react'
import { GalleryPage, getGallery, isGalleryCategory, type GalleryCategoryId } from '@/features/gallery'
import { buildPageHead } from '@/shared/lib/seo'

interface GallerySearch {
  categoria?: GalleryCategoryId
  foto?: string
}

/**
 * Typed, shareable URL state: /galeria?categoria=asados&foto=costillar-al-fuego
 * (hand-written validator: keeps a schema library out of the initial bundle).
 */
const validateGallerySearch = (search: Record<string, unknown>): GallerySearch => ({
  categoria: isGalleryCategory(search.categoria) ? search.categoria : undefined,
  foto: typeof search.foto === 'string' && search.foto ? search.foto : undefined,
})

export const Route = createFileRoute('/galeria')({
  validateSearch: validateGallerySearch,
  loader: () => getGallery(),
  head: () =>
    buildPageHead({
      title: 'Galería',
      path: '/galeria',
      image: '/og/galeria.jpg',
      imageAlt: 'El volcán Misti al atardecer sobre la campiña arequipeña',
      description:
        'Asados, fuego, mesa, vino y paisajes de Arequipa: momentos alrededor de la parrilla de Nuestra Raza.',
    }),
  component: GalleryRoute,
})

function GalleryRoute() {
  const items = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const router = useRouter()
  // The page is prerendered without search params: apply them after hydration only.
  const hydrated = useHydrated()
  const openedHere = useRef(false)

  const category = hydrated ? (search.categoria ?? null) : null
  const photoId = hydrated ? (search.foto ?? null) : null

  return (
    <GalleryPage
      items={items}
      category={category}
      photoId={photoId}
      onCategoryChange={(categoria) =>
        void navigate({ search: { categoria: categoria ?? undefined }, replace: true, resetScroll: false })
      }
      onOpenPhoto={(foto) => {
        openedHere.current = true
        void navigate({ search: (prev) => ({ ...prev, foto }), resetScroll: false })
      }}
      onNavigatePhoto={(foto) => void navigate({ search: (prev) => ({ ...prev, foto }), replace: true, resetScroll: false })}
      onClosePhoto={() => {
        if (!search.foto) return
        if (openedHere.current) {
          // Opening pushed a history entry: going back keeps the back button intuitive.
          openedHere.current = false
          router.history.back()
        } else {
          void navigate({ search: (prev) => ({ ...prev, foto: undefined }), replace: true, resetScroll: false })
        }
      }}
    />
  )
}
