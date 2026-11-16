import { Accent, Illustration, ResponsivePicture, TextLink } from '@/shared/components/atoms'
import { SectionHeading } from '@/shared/components/molecules'
import { SplitSection } from '@/shared/components/organisms'
import { photos } from '@/shared/content/photos'
import { homeContent } from '../content/home.content'
import styles from './BrandIntro.module.css'

/**
 * Section 3 — "Dos tierras, una misma pasión." The Misti (Perú) fills the frame;
 * a framed inset of the gaucho (Argentina) tells the "two lands" story.
 */
export function BrandIntro() {
  const { brandIntro } = homeContent

  return (
    <SplitSection
      photo={photos.mistiAtardecer}
      labelledBy="historia-preview-titulo"
      photoOverlay={
        <div className={styles.inset}>
          <div className={styles.insetMedia}>
            <ResponsivePicture
              photo={photos.gauchoTranquera}
              sizes="240px"
              className={styles.picture}
              imgClassName={styles.image}
            />
          </div>
          <p className={styles.insetCaption}>Argentina · Perú</p>
        </div>
      }
      decoration={<Illustration name="mate" className={styles.mate} />}
    >
      <div data-reveal>
        <SectionHeading
          id="historia-preview-titulo"
          label={brandIntro.label}
          labelLine="before"
          title={
            <>
              Dos tierras, <Accent>una misma pasión.</Accent>
            </>
          }
          description={brandIntro.body}
          actions={<TextLink to="/historia">{brandIntro.cta}</TextLink>}
        />
      </div>
    </SplitSection>
  )
}
