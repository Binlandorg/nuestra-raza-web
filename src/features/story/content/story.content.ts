import { photos } from '@/shared/content/photos'
import type { Photo } from '@/shared/types/media'

export interface StoryChapter {
  id: string
  eyebrow: string
  title: string
  /** Italic part of the title. */
  accent: string
  paragraphs: string[]
  photo: Photo
}

/** Editable copy of /historia. Short paragraphs on purpose: editorial, not text-heavy. */
export const storyContent = {
  intro:
    'Nuestra Raza nace del encuentro entre la tradición argentina del asado y la calidez peruana. Es un homenaje al fuego, a la amistad y a todo lo que se vive alrededor de una mesa.',
  chapters: [
    {
      id: 'tradicion',
      eyebrow: 'Argentina',
      title: 'La tradición',
      accent: 'del asado.',
      paragraphs: [
        'En Argentina, el asado es mucho más que una forma de cocinar: es un ritual. Se enciende el fuego con tiempo, se espera la brasa justa y la carne se cocina despacio, sin apuro.',
        'Alrededor de la parrilla se conversa, se comparte una copa y se celebra. El asador no solo cocina: reúne.',
      ],
      photo: photos.asadoALaCruz,
    },
    {
      id: 'fuego',
      eyebrow: 'El origen',
      title: 'Reunirse alrededor',
      accent: 'del fuego.',
      paragraphs: [
        'Desde siempre, el fuego ha sido el centro del encuentro: donde la familia se junta, donde los amigos se quedan un rato más y donde las historias se cuentan dos veces.',
      ],
      photo: photos.amigosFogon,
    },
    {
      id: 'mesa',
      eyebrow: 'La sobremesa',
      title: 'La mesa',
      accent: 'compartida.',
      paragraphs: [
        'En una mesa de asado nadie come solo. Los cortes llegan al centro, se pasan de mano en mano y la sobremesa se estira sin mirar el reloj.',
        'Esa es la mesa que queremos ofrecer: larga, generosa y sin prisa.',
      ],
      photo: photos.mesaLargaVelas,
    },
    {
      id: 'peru',
      eyebrow: 'Perú',
      title: 'Hospitalidad',
      accent: 'peruana.',
      paragraphs: [
        'Arequipa nos recibe con su campiña, sus volcanes y una tradición de buena mesa que se lleva en la sangre.',
        'De aquí tomamos la calidez para recibir y productos que le dan a nuestra parrilla su acento propio: choclo, papas nativas y chicha morada.',
      ],
      photo: photos.mistiValle,
    },
  ] satisfies StoryChapter[],
  identity: {
    title: 'Nuestra Raza',
    paragraphs: [
      'Nuestra Raza es una forma de nombrar a los nuestros: a quienes se reconocen alrededor del fuego, vengan de donde vengan.',
      'Tradición argentina, alma peruana y una misma pasión por la buena carne, el vino y los amigos.',
    ],
  },
  quote: 'El asado no es solo comida, es una forma de compartir la vida.',
}
