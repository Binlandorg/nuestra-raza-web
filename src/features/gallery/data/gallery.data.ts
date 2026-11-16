/**
 * ─────────────────────────────────────────────────────────────
 *  GALERÍA · Contenido editable
 * ─────────────────────────────────────────────────────────────
 *  Orden = orden de aparición. La primera foto se muestra en grande.
 *  category: 'asados' | 'la-parrilla' | 'nuestra-mesa' | 'bebidas'
 *            | 'eventos' | 'paisajes'
 *  Para agregar fotos: regístralas en src/shared/content/photos.ts
 *  (con su texto alternativo) y añádelas aquí.
 *
 *  ⚠️ Fotografías provisionales: reemplazar por fotos propias
 *     de Nuestra Raza (eventos, mesa, parrilleros, clientes).
 * ─────────────────────────────────────────────────────────────
 */
import { photos } from '@/shared/content/photos'
import type { GalleryItem } from '../domain/gallery.types'

export const galleryData: GalleryItem[] = [
  { id: 'costillar-al-fuego', photo: photos.costillarFuego, category: 'asados' },
  { id: 'mesa-a-la-luz-de-las-velas', photo: photos.mesaLargaVelas, category: 'nuestra-mesa' },
  { id: 'misti-al-atardecer', photo: photos.mistiAtardecer, category: 'paisajes' },
  { id: 'parrillero-entre-el-humo', photo: photos.parrilleroHumo, category: 'la-parrilla' },
  { id: 'copa-de-malbec', photo: photos.copaMalbec, category: 'bebidas' },
  { id: 'asado-al-asador', photo: photos.asadoAlAsador, category: 'asados' },
  { id: 'guitarra-junto-al-fuego', photo: photos.guitarraFogon, category: 'eventos' },
  { id: 'parrilla-larga', photo: photos.parrillaLargaBrasas, category: 'la-parrilla' },
  { id: 'gaucho-en-la-tranquera', photo: photos.gauchoTranquera, category: 'paisajes' },
  { id: 'empanadas-criollas', photo: photos.empanadas, category: 'nuestra-mesa' },
  { id: 'amigos-alrededor-del-fogon', photo: photos.amigosFogon, category: 'eventos' },
  { id: 'chorizos-en-la-parrilla', photo: photos.chorizoArgentino, category: 'la-parrilla' },
  { id: 'asado-a-la-cruz', photo: photos.asadoALaCruz, category: 'asados' },
  { id: 'brindis-de-campo', photo: photos.hombreBoinaVino, category: 'bebidas' },
  { id: 'patio-con-luces', photo: photos.patioLuces, category: 'nuestra-mesa' },
  { id: 'arreo-en-el-polvo', photo: photos.arreoPolvo, category: 'paisajes' },
  { id: 'pinzas-y-llama', photo: photos.pinzasBifeLlama, category: 'la-parrilla' },
  { id: 'tira-de-asado', photo: photos.tiraDeAsado, category: 'asados' },
  { id: 'mesa-larga-compartida', photo: photos.encuentroMesaLarga, category: 'eventos' },
  { id: 'vino-descorchado', photo: photos.vinoDescorche, category: 'bebidas' },
  { id: 'misti-y-andenes', photo: photos.mistiValle, category: 'paisajes' },
  { id: 'lena-bajo-la-parrilla', photo: photos.fuegoLenaParrilla, category: 'la-parrilla' },
  { id: 'parrillada-con-chimichurri', photo: photos.parrilladaChimichurri, category: 'nuestra-mesa' },
  { id: 'mate', photo: photos.mate, category: 'bebidas' },
  { id: 'corte-sobre-la-tabla', photo: photos.parrilleroCortando, category: 'asados' },
  { id: 'gente-de-campo', photo: photos.gauchosCampo, category: 'paisajes' },
  { id: 'brasas-encendidas', photo: photos.brasas, category: 'la-parrilla' },
  { id: 'alfajores', photo: photos.alfajores, category: 'nuestra-mesa' },
  { id: 'atardecer-andino', photo: photos.andesAtardecer, category: 'paisajes' },
  { id: 'llamas-en-la-parrilla', photo: photos.llamasParrilla, category: 'asados' },
]
