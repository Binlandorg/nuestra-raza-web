import { Flame, HandHeart, Users } from 'lucide-react'
import { Accent, ButtonLink, Divider, Illustration, TextLink } from '@/shared/components/atoms'
import { IconFeature, Quote } from '@/shared/components/molecules'
import { CtaBand, PageHero } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { cn } from '@/shared/lib/cn'
import layout from '@/shared/styles/layout.module.css'
import surfaces from '@/shared/styles/surfaces.module.css'
import text from '@/shared/styles/typography.module.css'
import { StoryChapterRow } from './components/StoryChapterRow'
import { storyContent } from './content/story.content'
import styles from './StoryPage.module.css'

const VALUES = [
  { icon: Flame, title: 'Tradición', description: 'El ritual del asado, respetado en cada detalle.' },
  { icon: Users, title: 'Encuentro', description: 'Una mesa donde siempre hay lugar para uno más.' },
  { icon: HandHeart, title: 'Amistad', description: 'Lo que empieza en la parrilla, sigue en la sobremesa.' },
] as const

/** /historia — philosophy and identity, told editorially. */
export function StoryPage() {
  return (
    <>
      <PageHero
        label="Nuestra historia"
        title={
          <>
            Dos tierras, <Accent tone="dark">una misma pasión.</Accent>
          </>
        }
        description="Tradición · Campo · Encuentro"
        photo={photos.arreoPolvo}
      />

      {/* Intro */}
      <section aria-label="Introducción" className={cn(styles.intro, surfaces.cream)}>
        <div className={cn(layout.container, styles.introInner)}>
          <Illustration name="cow" className={styles.cow} />
          <p className={styles.introText} data-reveal>
            {storyContent.intro}
          </p>
          <Divider variant="ornament" className={styles.divider} />
        </div>
      </section>

      {/* Chapters */}
      <section aria-label="Capítulos de nuestra historia" className={cn(styles.chapters, surfaces.cream)}>
        <div className={cn(layout.container, styles.chaptersInner)}>
          {storyContent.chapters.map((chapter, index) => (
            <StoryChapterRow key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </section>

      {/* Identity */}
      <section aria-labelledby="identidad-titulo" className={cn(styles.identity, surfaces.sand)}>
        <Illustration name="mate" className={styles.mate} />
        <div className={cn(layout.container, styles.identityInner)}>
          <h2 id="identidad-titulo" className={text.h2}>
            <Accent>{storyContent.identity.title}</Accent>
          </h2>
          {storyContent.identity.paragraphs.map((paragraph) => (
            <p key={paragraph} className={cn(text.lead, styles.identityText)}>
              {paragraph}
            </p>
          ))}
        </div>
        <ul className={cn(layout.container, styles.values)}>
          {VALUES.map((value) => (
            <li key={value.title} className={styles.valueItem}>
              <IconFeature
                icon={value.icon}
                title={value.title}
                description={value.description}
                className={styles.value}
              />
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        actions={
          <>
            <ButtonLink to="/reservar" withArrow>
              Reservar mesa
            </ButtonLink>
            <TextLink to="/experiencia" tone="dark">
              Descubre la experiencia
            </TextLink>
          </>
        }
      >
        <Quote tone="dark">“{storyContent.quote}”</Quote>
      </CtaBand>
    </>
  )
}
