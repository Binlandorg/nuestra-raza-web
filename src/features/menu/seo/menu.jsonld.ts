import { absoluteUrl } from '@/shared/config/env'
import { compactJsonLd } from '@/shared/lib/structured-data'
import type { Menu } from '../domain/menu.types'

/** schema.org Menu with sections and items; offers are added only for confirmed prices. */
export function buildMenuJsonLd(menu: Menu) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Carta de Nuestra Raza',
    url: absoluteUrl('/carta'),
    inLanguage: 'es-PE',
    hasMenuSection: menu.categories.map((category) => ({
      '@type': 'MenuSection',
      name: category.name,
      description: category.description,
      hasMenuItem: category.items.map((item) =>
        compactJsonLd({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers:
            item.price !== null
              ? { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'PEN' }
              : null,
        }),
      ),
    })),
  }
}
