import { saturdayAsadoData } from '../data/saturday-asado.data'
import type { SaturdayAsadoEvent } from '../domain/saturday-asado.types'

/**
 * Event data source (local today). Swap for a CMS/booking API call when
 * availability starts being managed online — consumers don't change.
 */
export function getSaturdayAsado(): Promise<SaturdayAsadoEvent> {
  return Promise.resolve(saturdayAsadoData)
}
