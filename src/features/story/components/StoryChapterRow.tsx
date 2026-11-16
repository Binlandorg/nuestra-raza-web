import { Accent, ResponsivePicture, SectionLabel } from '@/shared/components/atoms'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { StoryChapter } from '../content/story.content'
import styles from './StoryChapterRow.module.css'

/** Alternating photo + text chapter of the story page. */
export function StoryChapterRow({ chapter, index }: { chapter: StoryChapter; index: number }) {
  const reverse = index % 2 === 1
  const titleId = `capitulo-${chapter.id}`

  return (
    <article aria-labelledby={titleId} className={cn(styles.chapter, reverse && styles.reverse)}>
      <div className={styles.mediaCol} data-reveal>
        <div className={styles.media}>
          <ResponsivePicture
            photo={chapter.photo}
            sizes="(min-width: 768px) 45vw, 100vw"
            className={styles.picture}
            imgClassName={styles.image}
          />
        </div>
      </div>
      <div className={styles.text}>
        <span aria-hidden="true" className={styles.number}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <SectionLabel>{chapter.eyebrow}</SectionLabel>
        <h2 id={titleId} className={text.h2}>
          {chapter.title} <Accent>{chapter.accent}</Accent>
        </h2>
        {chapter.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
