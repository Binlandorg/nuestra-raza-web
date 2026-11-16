import { GalleryPreview, type GalleryItem } from '@/features/gallery'
import { MenuPreview, type FeaturedDish } from '@/features/menu'
import { SaturdayAsadoTeaser, type SaturdayAsadoEvent } from '@/features/saturday-asado'
import { BrandIntro } from './components/BrandIntro'
import { ExperiencePreview } from './components/ExperiencePreview'
import { FeaturedExperiences } from './components/FeaturedExperiences'
import { HomeHero } from './components/HomeHero'

export interface HomePageProps {
  featuredDishes: FeaturedDish[]
  saturdayAsado: SaturdayAsadoEvent
  galleryPreview: GalleryItem[]
}

/** Homepage: composes sections owned by each feature, in the approved order. */
export function HomePage({ featuredDishes, saturdayAsado, galleryPreview }: HomePageProps) {
  return (
    <>
      <HomeHero />
      <FeaturedExperiences />
      <BrandIntro />
      <ExperiencePreview />
      <MenuPreview dishes={featuredDishes} />
      <SaturdayAsadoTeaser event={saturdayAsado} />
      <GalleryPreview items={galleryPreview} />
    </>
  )
}
