/**
 * Type declarations for build-time image transforms (vite-imagetools).
 * `import photo from './x.jpg?photo=md'` returns `<picture>` data:
 * AVIF + WebP srcsets at several widths plus intrinsic dimensions.
 */
declare module '*?photo=xl' {
  const picture: import('vite-imagetools').Picture
  export default picture
}

declare module '*?photo=lg' {
  const picture: import('vite-imagetools').Picture
  export default picture
}

declare module '*?photo=md' {
  const picture: import('vite-imagetools').Picture
  export default picture
}

declare module '*?photo=portrait' {
  const picture: import('vite-imagetools').Picture
  export default picture
}

declare module '*?photo=sm' {
  const picture: import('vite-imagetools').Picture
  export default picture
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_RESERVATIONS_ENDPOINT?: string
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
