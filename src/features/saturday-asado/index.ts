/** Public API of the Saturday asado feature. */
export { getSaturdayAsado } from './api/saturday-asado.repository'
export { SaturdayAsadoTeaser } from './components/SaturdayAsadoTeaser'
export type { AsadoDate, SaturdayAsadoEvent } from './domain/saturday-asado.types'
export { SaturdayAsadoPage } from './SaturdayAsadoPage'
export { buildSaturdayAsadoJsonLd } from './seo/saturday-asado.jsonld'
