import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, type PointerEvent } from 'react'
import { IconButton, ResponsivePicture } from '@/shared/components/atoms'
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll'
import { cn } from '@/shared/lib/cn'
import motion from '@/shared/styles/motion.module.css'
import text from '@/shared/styles/typography.module.css'
import { categoryLabel, type GalleryItem } from '../domain/gallery.types'
import styles from './GalleryLightbox.module.css'

export interface GalleryLightboxProps {
  items: readonly GalleryItem[]
  /** Photo to show; `null` closes the lightbox. */
  activeId: string | null
  onNavigate: (id: string) => void
  onClose: () => void
}

const SWIPE_THRESHOLD = 50

/**
 * Accessible lightbox on the native modal `<dialog>` (focus trap, Esc, inert page).
 * Keyboard ← →, swipe on touch screens, restrained fade transition.
 */
export function GalleryLightbox({ items, activeId, onNavigate, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const swipeStartX = useRef<number | null>(null)
  const index = activeId ? items.findIndex((item) => item.id === activeId) : -1
  const item = index >= 0 ? items[index] : undefined
  const isOpen = item !== undefined

  useLockBodyScroll(isOpen)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const go = (delta: number) => {
    if (items.length < 2 || index < 0) return
    const next = items[(index + delta + items.length) % items.length]
    if (next) onNavigate(next.id)
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') swipeStartX.current = event.clientX
  }
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStartX.current === null) return
    const delta = event.clientX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Galería ampliada"
      data-tone="dark"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(1)
        if (event.key === 'ArrowLeft') go(-1)
      }}
      onClick={(event) => {
        // Click on the backdrop area closes.
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
      className={styles.dialog}
    >
      {item ? (
        <>
          <div className={styles.bar}>
            <p className={cn(text.label, styles.counter)} aria-live="polite">
              {index + 1} / {items.length}
            </p>
            <IconButton label="Cerrar galería" tone="dark" variant="outline" onClick={() => dialogRef.current?.close()}>
              <X aria-hidden="true" strokeWidth={1.5} className={styles.iconSm} />
            </IconButton>
          </div>

          <figure
            className={styles.figure}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={(event) => {
              if (event.target === event.currentTarget) dialogRef.current?.close()
            }}
          >
            <ResponsivePicture
              key={item.id}
              photo={item.photo}
              sizes="(min-width: 768px) 80vw, 100vw"
              priority
              className={cn(styles.picture, motion.fadeIn)}
              imgClassName={styles.image}
            />
            <figcaption className={styles.caption}>
              <span className={cn(text.label, styles.captionCategory)}>{categoryLabel(item.category)}</span>
              {item.photo.alt}
            </figcaption>
          </figure>

          {items.length > 1 ? (
            <>
              <IconButton
                label="Foto anterior"
                tone="dark"
                variant="outline"
                onClick={() => go(-1)}
                className={cn(styles.arrow, styles.prev)}
              >
                <ChevronLeft aria-hidden="true" strokeWidth={1.5} className={styles.iconLg} />
              </IconButton>
              <IconButton
                label="Foto siguiente"
                tone="dark"
                variant="outline"
                onClick={() => go(1)}
                className={cn(styles.arrow, styles.next)}
              >
                <ChevronRight aria-hidden="true" strokeWidth={1.5} className={styles.iconLg} />
              </IconButton>
              <div className={styles.mobileControls}>
                <IconButton label="Foto anterior" tone="dark" variant="outline" onClick={() => go(-1)}>
                  <ChevronLeft aria-hidden="true" strokeWidth={1.5} className={styles.iconSm} />
                </IconButton>
                <IconButton label="Foto siguiente" tone="dark" variant="outline" onClick={() => go(1)}>
                  <ChevronRight aria-hidden="true" strokeWidth={1.5} className={styles.iconSm} />
                </IconButton>
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </dialog>
  )
}
