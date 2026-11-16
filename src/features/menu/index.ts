/** Public API of the menu feature. */
export { getFeaturedDishes, getMenu } from './api/menu.repository'
export { FoodCard } from './components/FoodCard'
export { MenuPreview } from './components/MenuPreview'
export type { FeaturedDish } from './domain/menu.selectors'
export { selectMenuItems } from './domain/menu.selectors'
export type { Menu, MenuCategory, MenuItem } from './domain/menu.types'
export { buildMenuJsonLd } from './seo/menu.jsonld'
export { MenuPage } from './MenuPage'
