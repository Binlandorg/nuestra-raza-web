/**
 * Locale formatting (es-PE) implemented by hand on purpose:
 * `Intl` output differs slightly between Node (prerender) and browsers,
 * which would cause hydration mismatches.
 */

const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'] as const
const MONTHS_LONG = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'setiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'] as const
const WEEKDAYS_SHORT = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'] as const

export interface CalendarDate {
  year: number
  /** 1–12 */
  month: number
  day: number
  /** 0 (domingo) – 6 (sábado) */
  weekday: number
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

/** Parse "YYYY-MM-DD" as a calendar date (no time zone shifts). */
export function parseIsoDate(iso: string): CalendarDate | null {
  const match = ISO_DATE.exec(iso)
  if (!match) return null
  const [, y, m, d] = match
  const year = Number(y)
  const month = Number(m)
  const day = Number(d)
  const utc = new Date(Date.UTC(year, month - 1, day))
  if (utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) return null
  return { year, month, day, weekday: utc.getUTCDay() }
}

/** Today's date as "YYYY-MM-DD" in the visitor's local time. */
export function todayIso(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function addDaysIso(iso: string, days: number): string {
  const date = parseIsoDate(iso)
  if (!date) return iso
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days))
  return next.toISOString().slice(0, 10)
}

export const isSaturday = (iso: string): boolean => parseIsoDate(iso)?.weekday === 6

/** "sábado 21 de noviembre" */
export function formatDateLong(iso: string, { withYear = false } = {}): string {
  const date = parseIsoDate(iso)
  if (!date) return iso
  const base = `${WEEKDAYS[date.weekday]} ${date.day} de ${MONTHS_LONG[date.month - 1]}`
  return withYear ? `${base} de ${date.year}` : base
}

/** { day: "21", month: "nov", weekday: "sáb" } — for the large date blocks. */
export function formatDateParts(iso: string): { day: string; month: string; weekday: string } | null {
  const date = parseIsoDate(iso)
  if (!date) return null
  return {
    day: String(date.day).padStart(2, '0'),
    month: MONTHS_SHORT[date.month - 1] ?? '',
    weekday: WEEKDAYS_SHORT[date.weekday] ?? '',
  }
}

/** "13:00" → "1:00 p. m." */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  if (h === undefined || m === undefined || Number.isNaN(h) || Number.isNaN(m)) return time
  const suffix = h >= 12 ? 'p. m.' : 'a. m.'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatTimeRange(start: string, end: string | null): string {
  return end ? `${formatTime(start)} – ${formatTime(end)}` : `Desde ${formatTime(start)}`
}

/** 72 → "S/ 72" · 72.5 → "S/ 72.50" (soles peruanos). */
/** Closes a sentence without doubling the period of "p. m.": "… 9:00 p. m." stays as is. */
export const endSentence = (text: string): string => (text.endsWith('.') ? text : `${text}.`)

export function formatPrice(amount: number): string {
  return `S/ ${Number.isInteger(amount) ? amount : amount.toFixed(2)}`
}
