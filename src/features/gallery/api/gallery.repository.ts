import { galleryData } from '../data/gallery.data'
import type { GalleryItem } from '../domain/gallery.types'

/** Gallery data source (local today; CMS/media library tomorrow). */
export function getGallery(): Promise<GalleryItem[]> {
  return Promise.resolve(galleryData)
}

const PREVIEW_IDS = ['costillar-al-fuego', 'misti-al-atardecer', 'mesa-larga-compartida', 'copa-de-malbec'] as const

/** Curated selection for the homepage: fire, landscape, people, drinks. */
export async function getGalleryPreview(): Promise<GalleryItem[]> {
  const items = await getGallery()
  return PREVIEW_IDS.flatMap((id) => items.filter((item) => item.id === id))
}
