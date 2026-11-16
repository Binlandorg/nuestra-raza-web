/**
 * Generates derived images:
 *  - src/assets/photos/portrait/*.jpg — vertical crops of the hero photos for phones
 *    (art direction: a landscape photo cropped by `object-cover` wastes bytes on mobile).
 *  - public/og/*.jpg — Open Graph cards (1200×630) for each page.
 *  - public/apple-touch-icon.png (180×180) from public/favicon.svg.
 *
 * Run after replacing photos:  pnpm images:static
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const photo = (path) => `${root}src/assets/photos/${path}`
const out = (path) => `${root}public/${path}`

/** page → [source photo, crop focus] */
const OG_IMAGES = {
  'nuestra-raza': ['fuego/costillar-fuego.jpg', 'attention'],
  historia: ['campo/arreo-polvo.jpg', 'centre'],
  experiencia: ['fuego/parrillero-humo.jpg', 'attention'],
  carta: ['fuego/parrilla-larga-brasas.jpg', 'centre'],
  'asado-de-sabado': ['mesa/mesa-larga-velas.jpg', 'centre'],
  galeria: ['campo/misti-atardecer.jpg', 'centre'],
  contacto: ['campo/andes-atardecer.jpg', 'centre'],
}

/** hero photo → horizontal focal point (0–1) of the 9:16 crop */
const PORTRAIT_CROPS = {
  'fuego/costillar-fuego.jpg': 0.6,
  'fuego/parrilla-larga-brasas.jpg': 0.5,
  'mesa/mesa-larga-velas.jpg': 0.5,
  'campo/arreo-polvo.jpg': 0.42,
  'campo/andes-atardecer.jpg': 0.5,
}

await mkdir(photo('portrait'), { recursive: true })

for (const [source, focusX] of Object.entries(PORTRAIT_CROPS)) {
  const image = sharp(photo(source))
  const { width = 0, height = 0 } = await image.metadata()
  const cropWidth = Math.min(width, Math.round((height * 9) / 16))
  const left = Math.max(0, Math.min(width - cropWidth, Math.round(width * focusX - cropWidth / 2)))
  const name = source.split('/').pop()
  await image
    .extract({ left, top: 0, width: cropWidth, height })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(photo(`portrait/${name}`))
  console.log(`portrait/${name} (${cropWidth}×${height})`)
}

// Soft charcoal vignette so the photos read as one cinematic family.
const vignette = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="1" x2="0.4" y2="0">
        <stop offset="0" stop-color="#1b1a18" stop-opacity="0.75"/>
        <stop offset="0.6" stop-color="#1b1a18" stop-opacity="0.15"/>
        <stop offset="1" stop-color="#1b1a18" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
  </svg>`,
)

await mkdir(out('og'), { recursive: true })

for (const [name, [source, position]] of Object.entries(OG_IMAGES)) {
  await sharp(photo(source))
    .resize(1200, 630, { fit: 'cover', position })
    .composite([{ input: vignette }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out(`og/${name}.jpg`))
  console.log(`og/${name}.jpg`)
}

await sharp(out('favicon.svg'), { density: 512 })
  .resize(180, 180)
  .flatten({ background: '#1b1a18' })
  .png()
  .toFile(out('apple-touch-icon.png'))
console.log('apple-touch-icon.png')
