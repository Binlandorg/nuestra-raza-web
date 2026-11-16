import { Flame, Music, Users, Wine, type LucideIcon } from 'lucide-react'
import type { Surface } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import type { Photo } from '@/shared/types/media'

export interface ExperiencePillar {
  id: string
  number: string
  icon: LucideIcon
  title: string
  accent: string
  description: string
  highlights: string[]
  photo: Photo
  surface: Surface
  note?: string
}

/** The four pillars of /experiencia (editable copy). */
export const experiencePillars: ExperiencePillar[] = [
  {
    id: 'el-fuego',
    number: '01',
    icon: Flame,
    title: 'El',
    accent: 'fuego.',
    description:
      'Brasa y paciencia. El parrillero arma el fuego con tiempo, cuida la temperatura y elige el momento justo para cada corte. Nada se apura.',
    highlights: ['Fuego lento y brasa controlada', 'Cada corte, a su tiempo', 'El parrillero, protagonista'],
    photo: photos.pinzasBifeLlama,
    surface: 'charcoal',
    note: 'Fuego lento.',
  },
  {
    id: 'la-mesa',
    number: '02',
    icon: Wine,
    title: 'La',
    accent: 'mesa.',
    description:
      'Comer, brindar y conversar sin apuro. Los platos llegan al centro para compartir y la sobremesa también es parte del menú.',
    highlights: ['Platos para compartir', 'Vinos argentinos', 'Largas sobremesas'],
    photo: photos.mesaLargaVelas,
    surface: 'cream',
  },
  {
    id: 'la-musica',
    number: '03',
    icon: Music,
    title: 'La',
    accent: 'música.',
    description:
      'Folklore argentino, rock nacional y una selección musical pensada para acompañar la tarde sin robarle protagonismo a la conversación.',
    highlights: ['Folklore argentino', 'Rock nacional', 'Experiencias musicales especiales'],
    photo: photos.guitarraFogon,
    surface: 'sand',
  },
  {
    id: 'el-encuentro',
    number: '04',
    icon: Users,
    title: 'El',
    accent: 'encuentro.',
    description:
      'Amigos, familia, celebraciones y comunidad. Una mesa donde caben todos y donde siempre hay lugar para uno más.',
    highlights: ['Reuniones de amigos y familia', 'Cumpleaños y celebraciones', 'Eventos privados'],
    photo: photos.encuentroMesaLarga,
    surface: 'charcoal',
  },
]
