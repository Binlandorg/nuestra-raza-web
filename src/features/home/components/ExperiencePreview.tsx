import { Accent, TextLink } from '@/shared/components/atoms'
import { IconFeature, SectionHeading } from '@/shared/components/molecules'
import { SplitSection } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { homeContent } from '../content/home.content'
import styles from './ExperiencePreview.module.css'

/** Section 4 — "Más que un asado, una vivencia." */
export function ExperiencePreview() {
  const { experience } = homeContent

  return (
    <SplitSection
      photo={photos.encuentroMesaLarga}
      reverse
      surface="sand"
      labelledBy="experiencia-preview-titulo"
      photoOverlay={
        <>
          <div aria-hidden="true" className={styles.shade} />
          <p aria-hidden="true" className={styles.script}>
            El asado no se apura,
            <br />
            se comparte.
          </p>
        </>
      }
    >
      <div className={styles.content} data-reveal>
        <SectionHeading
          id="experiencia-preview-titulo"
          label={experience.label}
          title={
            <>
              Más que un asado, <Accent>una vivencia.</Accent>
            </>
          }
          description={experience.body}
        />
        <ul className={styles.pillars}>
          {experience.pillars.map((pillar) => (
            <li key={pillar.title}>
              <IconFeature icon={pillar.icon} title={pillar.title} layout="compact" titleAs="p" />
            </li>
          ))}
        </ul>
        <TextLink to="/experiencia">{experience.cta}</TextLink>
      </div>
    </SplitSection>
  )
}
