import type { ReactNode, SVGProps } from 'react'

export type BrandIconName = 'whatsapp' | 'instagram' | 'facebook' | 'tiktok'

/**
 * Line icons for social platforms drawn in the same 24 px / 1.5 stroke
 * style as Lucide (which no longer ships brand logos).
 */
const PATHS: Record<BrandIconName, ReactNode> = {
  whatsapp: (
    <>
      <path d="M3.6 20.4l1.25-4.1A8.6 8.6 0 1 1 8 19.3z" />
      <path d="M9.1 8.6c.2-.45.5-.6.85-.6h.45c.22 0 .4.12.48.33l.66 1.62c.08.2.03.44-.12.6l-.5.55a.5.5 0 0 0-.06.6 6.4 6.4 0 0 0 2.33 2.33.5.5 0 0 0 .6-.06l.55-.5c.16-.15.4-.2.6-.12l1.62.66c.21.08.33.26.33.48v.45c0 .35-.15.65-.6.85-.6.28-1.33.38-2.08.2a7 7 0 0 1-5.31-5.31c-.18-.75-.08-1.48.2-2.08z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  tiktok: (
    <path d="M14.5 3c.35 2.4 1.8 3.95 4.5 4.2v3.05a7.7 7.7 0 0 1-4.5-1.45v6.2a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6.02.9.07v3.2a2.4 2.4 0 1 0 1.5 2.23V3z" />
  ),
}

export interface BrandIconProps extends SVGProps<SVGSVGElement> {
  name: BrandIconName
}

export function BrandIcon({ name, className, ...props }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {PATHS[name]}
    </svg>
  )
}
