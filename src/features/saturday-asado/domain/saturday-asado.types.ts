/**
 * available → "Cupos disponibles"
 * few-spots → "Últimos cupos"
 * sold-out  → "Agotado" (the date is shown but cannot be requested)
 */
export type DateAvailability = 'available' | 'few-spots' | 'sold-out'

export interface AsadoDate {
  /** "YYYY-MM-DD" — must be a Saturday. */
  date: string
  availability: DateAvailability
  /** Optional short note: "Con música en vivo". */
  note?: string
}

export interface EventStep {
  title: string
  description: string
  /** "13:00" — `null` hides the time. */
  time: string | null
}

export interface MenuCourse {
  course: string
  items: string[]
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface SaturdayAsadoEvent {
  name: string
  tagline: string
  heroDescription: string
  recurrenceLabel: string
  schedule: {
    /** "HH:MM" 24 h. `null` = por confirmar. */
    startTime: string | null
    endTime: string | null
  }
  /** Soles per person. `null` = por confirmar. */
  pricePerPerson: number | null
  /** "Incluye bebida de bienvenida…" shown next to the price. */
  priceNote: string | null
  /** Seats per Saturday. `null` = por confirmar. */
  capacity: number | null
  /** Confirmed upcoming dates. Empty = "Próximas fechas por confirmar". */
  upcomingDates: AsadoDate[]
  intro: string[]
  includes: string[]
  flow: EventStep[]
  menu: MenuCourse[]
  menuNote: string
  faq: FaqEntry[]
}
