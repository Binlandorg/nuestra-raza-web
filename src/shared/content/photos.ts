/**
 * ─────────────────────────────────────────────────────────────
 *  Librería fotográfica
 * ─────────────────────────────────────────────────────────────
 *  Todas las fotos del sitio se registran aquí una sola vez.
 *  Para cambiar una foto: reemplaza el archivo en src/assets/photos
 *  (mismo nombre) o cambia la importación, y actualiza su `alt`.
 *
 *  El sufijo `?photo=xl|lg|md|sm` genera AVIF + WebP responsivos
 *  en tiempo de build (ver vite.config.ts). Usa el preset más
 *  cercano al ancho original del archivo.
 *
 *  ⚠️ Fotografías provisionales (Unsplash). Ver CREDITS.md.
 * ─────────────────────────────────────────────────────────────
 */
import type { Photo } from '@/shared/types/media'

// Fuego y parrilla
import asadoALaCruz from '@/assets/photos/fuego/asado-a-la-cruz.jpg?photo=lg'
import asadoAlAsador from '@/assets/photos/fuego/asado-al-asador.jpg?photo=md'
import brasasOscuras from '@/assets/photos/fuego/brasas-oscuras.jpg?photo=lg'
import brasas from '@/assets/photos/fuego/brasas.jpg?photo=lg'
import costillarFuego from '@/assets/photos/fuego/costillar-fuego.jpg?photo=xl'
import fuegoLenaParrilla from '@/assets/photos/fuego/fuego-lena-parrilla.jpg?photo=lg'
import llamasParrilla from '@/assets/photos/fuego/llamas-parrilla.jpg?photo=lg'
import parrillaChorizosBifes from '@/assets/photos/fuego/parrilla-chorizos-bifes.jpg?photo=lg'
import parrillaLargaBrasas from '@/assets/photos/fuego/parrilla-larga-brasas.jpg?photo=xl'
import parrilleroCortando from '@/assets/photos/fuego/parrillero-cortando.jpg?photo=md'
import parrilleroHumo from '@/assets/photos/fuego/parrillero-humo.jpg?photo=md'
import pinzasBifeLlama from '@/assets/photos/fuego/pinzas-bife-llama.jpg?photo=md'
// Carta
import achurasParrilla from '@/assets/photos/carta/achuras-parrilla.jpg?photo=md'
import alfajores from '@/assets/photos/carta/alfajores.jpg?photo=md'
import bifeDeChorizo from '@/assets/photos/carta/bife-de-chorizo.jpg?photo=md'
import chimichurri from '@/assets/photos/carta/chimichurri.jpg?photo=md'
import choripan from '@/assets/photos/carta/choripan.jpg?photo=md'
import chorizoArgentino from '@/assets/photos/carta/chorizo-argentino.jpg?photo=md'
import colitaDeCuadril from '@/assets/photos/carta/colita-de-cuadril.jpg?photo=md'
import copaMalbec from '@/assets/photos/carta/copa-malbec.jpg?photo=md'
import empanadas from '@/assets/photos/carta/empanadas.jpg?photo=md'
import entrana from '@/assets/photos/carta/entrana.jpg?photo=md'
import flan from '@/assets/photos/carta/flan.jpg?photo=sm'
import guarniciones from '@/assets/photos/carta/guarniciones.jpg?photo=md'
import ojoDeBife from '@/assets/photos/carta/ojo-de-bife.jpg?photo=md'
import parrilladaChimichurri from '@/assets/photos/carta/parrillada-chimichurri.jpg?photo=md'
import tiraDeAsado from '@/assets/photos/carta/tira-de-asado.jpg?photo=lg'
import vacio from '@/assets/photos/carta/vacio.jpg?photo=md'
import vinoDescorche from '@/assets/photos/carta/vino-descorche.jpg?photo=sm'
// Mesa y encuentro
import amigosFogon from '@/assets/photos/mesa/amigos-fogon.jpg?photo=md'
import encuentroMesaLarga from '@/assets/photos/mesa/encuentro-mesa-larga.jpg?photo=lg'
import guitarraFogon from '@/assets/photos/mesa/guitarra-fogon.jpg?photo=lg'
import hombreBoinaVino from '@/assets/photos/mesa/hombre-boina-vino.jpg?photo=sm'
import mesaLargaVelas from '@/assets/photos/mesa/mesa-larga-velas.jpg?photo=lg'
import patioLuces from '@/assets/photos/mesa/patio-luces.jpg?photo=md'
// Campo y paisaje
import andesAtardecer from '@/assets/photos/campo/andes-atardecer.jpg?photo=lg'
import arequipaVolcan from '@/assets/photos/campo/arequipa-volcan.jpg?photo=md'
import arreoPolvo from '@/assets/photos/campo/arreo-polvo.jpg?photo=lg'
import gauchoTranquera from '@/assets/photos/campo/gaucho-tranquera.jpg?photo=md'
import gauchosCampo from '@/assets/photos/campo/gauchos-campo.jpg?photo=lg'
import mate from '@/assets/photos/campo/mate.jpg?photo=md'
import mistiAtardecer from '@/assets/photos/campo/misti-atardecer.jpg?photo=xl'
import mistiValle from '@/assets/photos/campo/misti-valle.jpg?photo=md'
import valleTerrazas from '@/assets/photos/campo/valle-terrazas.jpg?photo=lg'
// Recortes verticales para el hero en teléfonos (generados con `pnpm images:static`)
import andesAtardecerPortrait from '@/assets/photos/portrait/andes-atardecer.jpg?photo=portrait'
import arreoPolvoPortrait from '@/assets/photos/portrait/arreo-polvo.jpg?photo=portrait'
import costillarFuegoPortrait from '@/assets/photos/portrait/costillar-fuego.jpg?photo=portrait'
import mesaLargaVelasPortrait from '@/assets/photos/portrait/mesa-larga-velas.jpg?photo=portrait'
import parrillaLargaBrasasPortrait from '@/assets/photos/portrait/parrilla-larga-brasas.jpg?photo=portrait'

export const photos = {
  // ── Fuego y parrilla ─────────────────────────────────────
  costillarFuego: {
    picture: costillarFuego, portrait: costillarFuegoPortrait,
    alt: 'Costillar de res dorándose sobre la parrilla mientras las llamas se elevan al fondo',
    position: '62% 50%',
  },
  parrillaLargaBrasas: {
    picture: parrillaLargaBrasas, portrait: parrillaLargaBrasasPortrait,
    alt: 'Parrilla larga cargada de cortes y costillas sobre un lecho de brasas encendidas',
  },
  llamasParrilla: {
    picture: llamasParrilla,
    alt: 'Un corte de carne sobre la parrilla envuelto por llamas en la penumbra',
  },
  asadoAlAsador: {
    picture: asadoAlAsador,
    alt: 'Costillares abiertos asándose lentamente junto al fuego de leña',
  },
  asadoALaCruz: {
    picture: asadoALaCruz,
    alt: 'Asado a la cruz al aire libre: cortes clavados alrededor de la fogata en el campo',
  },
  fuegoLenaParrilla: {
    picture: fuegoLenaParrilla,
    alt: 'Troncos de leña ardiendo bajo la parrilla de hierro',
  },
  brasas: { picture: brasas, alt: 'Brasas de carbón encendidas con destellos naranjas' },
  brasasOscuras: { picture: brasasOscuras, alt: 'Chispas y brasas brillando sobre un fondo oscuro' },
  parrilleroHumo: {
    picture: parrilleroHumo,
    alt: 'Parrillero dando vuelta la carne entre el humo y las llamas',
    position: '50% 40%',
  },
  parrilleroCortando: {
    picture: parrilleroCortando,
    alt: 'Parrillero cortando carne asada sobre una tabla de madera',
  },
  pinzasBifeLlama: {
    picture: pinzasBifeLlama,
    alt: 'Pinzas levantando un bife sellado sobre la llama',
  },
  parrillaChorizosBifes: {
    picture: parrillaChorizosBifes,
    alt: 'Chorizos y un corte de carne sobre la parrilla con el fuego encendido debajo',
  },

  // ── Carta ────────────────────────────────────────────────
  tiraDeAsado: { picture: tiraDeAsado, alt: 'Tira de asado y cortes dorados sobre una parrilla de campo' },
  vacio: { picture: vacio, alt: 'Vacío jugoso cortado en tajadas sobre una tabla de madera' },
  entrana: { picture: entrana, alt: 'Tiras de entraña chisporroteando entre las llamas de la parrilla' },
  bifeDeChorizo: { picture: bifeDeChorizo, alt: 'Bife a punto cortado en tajadas sobre tabla de madera' },
  ojoDeBife: { picture: ojoDeBife, alt: 'Cortes gruesos de carne marcados sobre la parrilla' },
  colitaDeCuadril: {
    picture: colitaDeCuadril,
    alt: 'Corte de res en tajadas sobre plancha de hierro con papas doradas',
  },
  chorizoArgentino: {
    picture: chorizoArgentino,
    alt: 'Chorizos dorándose en la parrilla frente al fuego',
    position: '50% 70%',
  },
  achurasParrilla: {
    picture: achurasParrilla,
    alt: 'Parrilla completa con cortes, chorizos y verduras asándose',
  },
  parrilladaChimichurri: {
    picture: parrilladaChimichurri,
    alt: 'Canasta de carnes y chorizos a la parrilla con chimichurri y tomate',
  },
  empanadas: { picture: empanadas, alt: 'Empanadas doradas servidas en un plato blanco' },
  choripan: { picture: choripan, alt: 'Choripán en pan crocante sobre una tabla de madera' },
  chimichurri: { picture: chimichurri, alt: 'Hierbas frescas y aceite mezclándose en un bol' },
  guarniciones: {
    picture: guarniciones,
    alt: 'Carne asada acompañada de papas y ensalada fresca',
    position: '50% 55%',
  },
  flan: { picture: flan, alt: 'Flan casero con caramelo en un plato de cerámica', position: '50% 60%' },
  alfajores: { picture: alfajores, alt: 'Alfajores rellenos de dulce de leche y bañados en coco' },
  copaMalbec: { picture: copaMalbec, alt: 'Copa de vino tinto en alto durante un encuentro entre amigos',
    grade: 'warm',
  },
  vinoDescorche: { picture: vinoDescorche, alt: 'Manos descorchando una botella de vino tinto' },

  // ── Mesa y encuentro ─────────────────────────────────────
  mesaLargaVelas: {
    picture: mesaLargaVelas, portrait: mesaLargaVelasPortrait,
    alt: 'Mesa larga servida a la luz de las velas, lista para compartir',
  },
  patioLuces: {
    picture: patioLuces,
    alt: 'Patio con mesas de mantel a cuadros bajo guirnaldas de luces cálidas',
  },
  guitarraFogon: { picture: guitarraFogon, alt: 'Guitarra sonando junto al fuego de un fogón' },
  amigosFogon: {
    picture: amigosFogon,
    alt: 'Amigos reunidos alrededor de un fogón, con guitarra y conversación',
  },
  encuentroMesaLarga: {
    picture: encuentroMesaLarga,
    alt: 'Grupo de personas compartiendo una mesa larga al aire libre',
    grade: 'warm',
  },
  hombreBoinaVino: {
    picture: hombreBoinaVino,
    alt: 'Hombre de boina con una copa de vino en la mano, en una casa de campo',
  },

  // ── Campo y paisaje ──────────────────────────────────────
  mistiAtardecer: {
    picture: mistiAtardecer,
    alt: 'El volcán Misti al atardecer sobre la campiña arequipeña',
    position: '50% 45%',
  },
  mistiValle: { picture: mistiValle, alt: 'El volcán Misti nevado sobre los andenes verdes del valle',
    grade: 'warm',
  },
  gauchoTranquera: {
    picture: gauchoTranquera,
    alt: 'Gaucho a caballo cruzando una tranquera, con montañas otoñales de fondo',
    position: '50% 62%',
    grade: 'warm',
  },
  arreoPolvo: { picture: arreoPolvo, portrait: arreoPolvoPortrait, alt: 'Jinete arreando ganado entre una nube de polvo' },
  gauchosCampo: { picture: gauchosCampo, alt: 'Gente de campo con caballos y perros en la pradera',
    grade: 'warm',
  },
  andesAtardecer: { picture: andesAtardecer, portrait: andesAtardecerPortrait, alt: 'El sol se pone detrás de una cadena de montañas andinas' },
  valleTerrazas: { picture: valleTerrazas, alt: 'Andenes y campos de cultivo en un valle andino',
    grade: 'warm',
  },
  mate: { picture: mate, alt: 'Mate con yerba y bombilla sobre una mesa' },
  arequipaVolcan: {
    picture: arequipaVolcan,
    alt: 'Volcán nevado elevándose sobre los techos de Arequipa',
    grade: 'warm',
  },
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos
