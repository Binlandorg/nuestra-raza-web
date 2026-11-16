import { fileURLToPath, URL } from 'node:url'
import babel from '@rolldown/plugin-babel'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { imagetools, resolveConfigs } from 'vite-imagetools'

/**
 * Responsive photo presets. Import a photo with `?photo=<preset>` and it is
 * converted at build time into AVIF + WebP at several widths (`<picture>` data).
 */
const PHOTO_PRESETS = {
  /** Fuentes de 2400 px: héroes a sangre completa */
  xl: '640;960;1280;1920;2400',
  /** Fuentes de ~2000 px: héroes y secciones anchas */
  lg: '640;960;1280;1600;2000',
  /** Fuentes de ~1600 px: imágenes editoriales y verticales */
  md: '480;720;960;1280;1600',
  /** Miniaturas y tarjetas pequeñas */
  sm: '360;540;720;960',
  /** Recortes verticales para el hero en teléfonos (art direction) */
  portrait: '360;540;720',
} as const

/**
 * Same visual quality, per codec: sharp's AVIF scale is "stronger" than WebP's,
 * so a single `quality` makes AVIF heavier than WebP. Tuned by eye on the hero photos.
 */
const QUALITY_BY_FORMAT: Record<string, string> = { avif: '50', webp: '72' }

type PhotoPreset = keyof typeof PHOTO_PRESETS

const isPhotoPreset = (value: string | null): value is PhotoPreset =>
  value !== null && value in PHOTO_PRESETS

/** Emits robots.txt pointing to the generated sitemap (needs the absolute site URL). */
function robotsTxt(siteUrl: string): Plugin {
  return {
    name: 'nuestra-raza:robots-txt',
    apply: 'build',
    applyToEnvironment: (environment) => environment.name === 'client',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

const SITEMAP_PAGES = [
  { path: '/', priority: 1, changefreq: 'weekly' },
  { path: '/asado-de-sabado', priority: 0.9, changefreq: 'weekly' },
  { path: '/carta', priority: 0.8, changefreq: 'weekly' },
  { path: '/reservar', priority: 0.8, changefreq: 'monthly' },
  { path: '/experiencia', priority: 0.7, changefreq: 'monthly' },
  { path: '/historia', priority: 0.6, changefreq: 'monthly' },
  { path: '/galeria', priority: 0.6, changefreq: 'monthly' },
  { path: '/contacto', priority: 0.6, changefreq: 'monthly' },
] as const

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')

  return {
    server: { port: 3000 },
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    css: {
      // Lightning CSS: CSS Modules, nesting, cascade layers and vendor prefixes,
      // lowered automatically to the build targets.
      transformer: 'lightningcss',
      lightningcss: {
        cssModules: {
          // [hash] is the hash of the FILE, so [local] (the class name) must always be
          // part of the pattern to keep classes unique within a module.
          pattern: mode === 'production' ? '[hash]_[local]' : '[local]_[hash]',
        },
      },
    },
    build: {
      cssMinify: 'lightningcss',
      // One stylesheet for the whole site (~15 KB gzip): a single render-blocking request,
      // cached across pages, instead of one small file per component/route.
      cssCodeSplit: false,
    },
    plugins: [
      imagetools({
        defaultDirectives: (url) => {
          const preset = url.searchParams.get('photo')
          if (!isPhotoPreset(preset)) return new URLSearchParams()
          return new URLSearchParams({
            w: PHOTO_PRESETS[preset],
            format: 'avif;webp',
            as: 'picture',
          })
        },
        resolveConfigs: (entries, outputFormats) =>
          resolveConfigs(entries, outputFormats).map((config) => {
            const quality = config.format ? QUALITY_BY_FORMAT[config.format] : undefined
            return quality && !config.quality ? { ...config, quality } : config
          }),
      }),
      tanstackStart({
        // Every route is listed explicitly in SITEMAP_PAGES (add new pages there).
        // Link crawling is off so in-page anchors (#vacio) and filters (?categoria=)
        // never become separate pages or sitemap entries.
        prerender: {
          enabled: true,
          crawlLinks: false,
          failOnError: true,
        },
        sitemap: { enabled: true, host: siteUrl },
        pages: SITEMAP_PAGES.map(({ path, priority, changefreq }) => ({
          path,
          sitemap: { priority, changefreq },
        })),
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      robotsTxt(siteUrl),
    ],
  }
})
