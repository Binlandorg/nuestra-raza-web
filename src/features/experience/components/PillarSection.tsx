import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Accent, SectionLabel } from '@/shared/components/atoms'
import { SplitSection } from '@/shared/components/organisms'
import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import type { ExperiencePillar } from '../content/experience.content'
import styles from './PillarSection.module.css'

export interface PillarSectionProps {
  pillar: ExperiencePillar
  reverse: boolean
  action?: ReactNode
}

/** One pillar of the experience: El fuego, La mesa, La música, El encuentro. */
export function PillarSection({ pillar, reverse, action }: PillarSectionProps) {
  const dark = pillar.surface === 'charcoal'
  const tone = dark ? 'dark' : 'light'
  const Icon = pillar.icon
  const titleId = `${pillar.id}-titulo`

  return (
    <SplitSection
      id={pillar.id}
      labelledBy={titleId}
      photo={pillar.photo}
      reverse={reverse}
      surface={pillar.surface}
      className={styles.section}
      photoOverlay={
        pillar.note ? (
          <p aria-hidden="true" className={styles.note}>
            {pillar.note}
          </p>
        ) : null
      }
    >
      <div className={cn(styles.content, dark && styles.dark)}>
        <div className={styles.numberRow}>
          <span aria-hidden="true" className={styles.number}>
            {pillar.number}
          </span>
          <Icon aria-hidden="true" strokeWidth={1.25} className={styles.icon} />
        </div>
        <SectionLabel tone={tone}>La experiencia</SectionLabel>
        <h2 id={titleId} className={cn(text.h1, styles.title)}>
          {pillar.title} <Accent tone={tone}>{pillar.accent}</Accent>
        </h2>
        <p className={cn(text.lead, styles.description)}>{pillar.description}</p>
        <ul className={styles.highlights}>
          {pillar.highlights.map((highlight) => (
            <li key={highlight} className={styles.highlight}>
              <Check aria-hidden="true" strokeWidth={1.75} className={styles.check} />
              {highlight}
            </li>
          ))}
        </ul>
        {action}
      </div>
    </SplitSection>
  )
}
