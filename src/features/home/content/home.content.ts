import { Flame, Music, Users, Wine } from 'lucide-react'

/** Editable homepage copy. */
export const homeContent = {
  hero: {
    location: 'Arequipa · Perú',
    supporting: 'Buena carne. Vino. Amigos.',
    cta: 'Reservar mesa',
  },
  featuredExperiences: [
    {
      icon: Flame,
      title: 'Fuego lento',
      description: 'Cortes cocinados sin apuro sobre la brasa, como manda la tradición.',
    },
    {
      icon: Users,
      title: 'Buena compañía',
      description: 'Mesas para compartir con amigos, familia y gente nueva.',
    },
    {
      icon: Wine,
      title: 'Vino y sobremesa',
      description: 'Malbec, conversación y sobremesas que se estiran sin mirar el reloj.',
    },
  ],
  brandIntro: {
    label: 'Nuestra historia',
    body: 'Nuestra Raza nace del encuentro entre la tradición argentina y la calidez peruana. Es un homenaje al asado, a la amistad y a todo lo que se vive alrededor de una mesa: el fuego que se enciende con tiempo, la carne que se cocina sin prisa y la hospitalidad de quien te recibe como en casa.',
    cta: 'Conoce nuestra historia',
  },
  experience: {
    label: 'La experiencia',
    body: 'El fuego, la buena carne, el vino y la música se unen para crear un momento único. El parrillero frente a la brasa, la mesa larga, las conversaciones que no terminan. Aquí no solo se come: se comparte.',
    cta: 'Descubre la experiencia',
    pillars: [
      { icon: Flame, title: 'Fuego' },
      { icon: Users, title: 'Compañía' },
      { icon: Wine, title: 'Vino' },
      { icon: Music, title: 'Música' },
    ],
  },
}
