import type { Photo } from '@/shared/types/media'

export const GALLERY_CATEGORIES = [
  { id: 'asados', label: 'Asados' },
  { id: 'la-parrilla', label: 'La parrilla' },
  { id: 'nuestra-mesa', label: 'Nuestra mesa' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'paisajes', label: 'Paisajes' },
] as const

export type GalleryCategoryId = (typeof GALLERY_CATEGORIES)[number]['id']

export const GALLERY_CATEGORY_IDS = GALLERY_CATEGORIES.map((category) => category.id) as [
  GalleryCategoryId,
  ...GalleryCategoryId[],
]

export const isGalleryCategory = (value: unknown): value is GalleryCategoryId =>
  typeof value === 'string' && (GALLERY_CATEGORY_IDS as readonly string[]).includes(value)

export const categoryLabel = (id: GalleryCategoryId): string =>
  GALLERY_CATEGORIES.find((category) => category.id === id)?.label ?? id

export interface GalleryItem {
  /** Stable slug, used in the URL (?foto=…). */
  id: string
  photo: Photo
  category: GalleryCategoryId
}
