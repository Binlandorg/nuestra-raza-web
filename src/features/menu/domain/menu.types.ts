import type { Photo } from '@/shared/types/media'

export type MenuCategoryId = 'cortes' | 'achuras' | 'entradas' | 'acompanamientos' | 'bebidas' | 'postres'

/**
 * available   → se sirve normalmente
 * limited     → "Según disponibilidad"
 * unavailable → visible pero atenuado: "No disponible por ahora"
 */
export type MenuAvailability = 'available' | 'limited' | 'unavailable'

export type MenuTag = 'Corte premium' | 'Para compartir' | 'Clásico argentino' | 'Toque peruano' | 'De la casa'

export interface MenuItem {
  id: string
  name: string
  description: string
  /** Precio en soles. `null` = por confirmar (se muestra "Consultar"). */
  price: number | null
  /** Porción o formato: "300 g", "Copa", "Botella". `null` = no se muestra. */
  portion: string | null
  photo?: Photo
  tags?: MenuTag[]
  availability: MenuAvailability
  /** Posición en la vista previa de la portada (1–6). Omitir para no destacarlo. */
  homeOrder?: number
}

export interface MenuCategory {
  id: MenuCategoryId
  name: string
  /** Short label for tabs and cards ("Cortes"). */
  shortName: string
  /** One-line description shown under the category title. */
  description: string
  items: MenuItem[]
}

export interface Menu {
  categories: MenuCategory[]
  /** Short notes shown above the menu (prices, availability). */
  notes: string[]
}
