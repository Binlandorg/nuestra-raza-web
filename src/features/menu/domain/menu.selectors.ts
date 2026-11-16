import type { Menu, MenuAvailability, MenuItem } from './menu.types'

export interface FeaturedDish extends MenuItem {
  categoryName: string
}

/** Items flagged with `homeOrder`, sorted for the homepage preview. */
export function selectFeaturedDishes(menu: Menu, limit = 6): FeaturedDish[] {
  return menu.categories
    .flatMap((category) => category.items.map((item) => ({ ...item, categoryName: category.shortName })))
    .filter((item) => item.homeOrder !== undefined)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0))
    .slice(0, limit)
}

/** Lookup by id across categories. */
export function selectMenuItems(menu: Menu, ids: readonly string[]): MenuItem[] {
  const all = menu.categories.flatMap((category) => category.items)
  return ids.flatMap((id) => all.filter((item) => item.id === id))
}

export const AVAILABILITY_LABEL: Record<MenuAvailability, string | null> = {
  available: null,
  limited: 'Según disponibilidad',
  unavailable: 'No disponible por ahora',
}
