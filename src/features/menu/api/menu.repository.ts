import { menuData } from '../data/menu.data'
import { selectFeaturedDishes, type FeaturedDish } from '../domain/menu.selectors'
import type { Menu } from '../domain/menu.types'

/**
 * Menu data source. Today it reads local structured data; to move to a CMS or
 * backend, replace these functions with fetches — route loaders stay unchanged.
 */
export function getMenu(): Promise<Menu> {
  return Promise.resolve(menuData)
}

export async function getFeaturedDishes(limit = 6): Promise<FeaturedDish[]> {
  return selectFeaturedDishes(await getMenu(), limit)
}
