import { cn } from '@/shared/lib/cn'
import text from '@/shared/styles/typography.module.css'
import utilities from '@/shared/styles/utilities.module.css'
import type { MenuCourse } from '../domain/saturday-asado.types'
import styles from './EventMenuList.module.css'

/** "Menú especial" course list, styled like the dark band in the homepage mockup. */
export function EventMenuList({ courses, compact = false }: { courses: readonly MenuCourse[]; compact?: boolean }) {
  if (compact) {
    return (
      <ul className={styles.compact}>
        {courses.map((course) => (
          <li key={course.course} className={styles.compactItem}>
            <span aria-hidden="true" className={styles.dot} />
            <span>
              <span className={utilities.srOnly}>{course.course}: </span>
              {course.items.join(' · ')}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={styles.courses}>
      {courses.map((course) => (
        <div key={course.course} className={styles.course}>
          <h3 className={cn(text.label, styles.courseName)}>{course.course}</h3>
          <ul className={styles.dishes}>
            {course.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
