import { Info } from 'lucide-react'
import { Accent, ButtonAnchor, ButtonLink } from '@/shared/components/atoms'
import { Quote } from '@/shared/components/molecules'
import { CtaBand, PageHero } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { getBusinessWhatsAppUrl } from '@/shared/lib/whatsapp'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import { FeaturedCutsBand } from './components/FeaturedCutsBand'
import { MenuCategoryNav } from './components/MenuCategoryNav'
import { MenuCategorySection } from './components/MenuCategorySection'
import { selectMenuItems } from './domain/menu.selectors'
import type { Menu } from './domain/menu.types'
import styles from './MenuPage.module.css'

const FEATURED_CUTS = ['bife-de-chorizo', 'chorizo-argentino', 'tira-de-asado', 'entrana'] as const

export function MenuPage({ menu }: { menu: Menu }) {
  const whatsappUrl = getBusinessWhatsAppUrl('Hola Nuestra Raza, tengo una consulta sobre la carta.')

  return (
    <>
      <PageHero
        label="Nuestra carta"
        title={
          <>
            Cortes, achuras <Accent tone="dark">y más.</Accent>
          </>
        }
        description="Los sabores clásicos de la parrilla argentina —cortes, achuras, entradas y postres— con un toque peruano."
        photo={photos.parrillaLargaBrasas}
        edge={null}
      />

      <FeaturedCutsBand items={selectMenuItems(menu, FEATURED_CUTS)} />

      <MenuCategoryNav categories={menu.categories} />

      <div className={surfaces.cream}>
        <div className={layout.container}>
          <aside aria-label="Información de la carta" className={styles.notes}>
            <Info aria-hidden="true" strokeWidth={1.5} className={styles.notesIcon} />
            <p>{menu.notes.join(' ')}</p>
          </aside>

          {menu.categories.map((category, index) => (
            <MenuCategorySection key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>

      <CtaBand
        actions={
          <>
            <ButtonLink to="/reservar" withArrow>
              Reservar mesa
            </ButtonLink>
            {whatsappUrl ? (
              <ButtonAnchor href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="secondary" tone="dark">
                Consultar por WhatsApp
              </ButtonAnchor>
            ) : null}
          </>
        }
      >
        <Quote tone="dark">
          “El asado no se apura.
          <br />
          Se comparte.”
        </Quote>
      </CtaBand>
    </>
  )
}
