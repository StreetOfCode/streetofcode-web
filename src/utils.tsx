import React from 'react'
import {AiOutlinePlayCircle} from 'react-icons/ai'
import {CgNotes} from 'react-icons/cg'
import {routes} from './routes'
import {
  ChapterOverview,
  CourseOverview,
  LectureOverview,
  LectureType,
} from './types'
import {User} from 'firebase/auth'

export const isRunningOnServer = () => typeof window === 'undefined'

/***
 * i.e from 287 => 4h 47minút
 */
export const formatDurationFromMinutes = (minutes: number) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60} ${numOfMinutesText(
    minutes,
  )}`
}

/***
 * i.e from 124 => 2m 4s
 */
export const formatDurationFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}m ${remainingSeconds}s`
}

/***
 * i.e from '2007-12-03T10:15:30+01:00' => '3. 12. 2007, 10:15:30'
 */
export const formatDateTime = (date: Date | string) => {
  return new Date(date).toLocaleString('sk')
}

/***
 * i.e from '2007-12-03T10:15:30+01:00' => '3. 12. 2007'
 */
export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('sk')
}

export const subtractDates = (d1: Date | string, d2: Date | string) => {
  return new Date(d1).getTime() - new Date(d2).getTime()
}

export const getCourseProgressPercent = (
  lecturesViewed: number,
  courseLecturesCount: number,
) => {
  return Math.round((lecturesViewed / courseLecturesCount) * 100)
}

export const getTakeCourseUrl = (course: CourseOverview) => {
  const chapterId =
    course.userProgressMetadata?.nextChapterId ?? course.chapters[0].id
  const lectureId =
    course.userProgressMetadata?.nextLectureId ??
    course.chapters[0].lectures[0].id
  return routes.kurzy.lekcia(course.slug, chapterId, lectureId)
}

export const getLectureTypeIcon = (lectureType: LectureType) => {
  if (lectureType === 'TEXT') {
    return <CgNotes />
  } else {
    return <AiOutlinePlayCircle />
  }
}

export interface GetPrevAndNextUrlResponse {
  currentLecture: LectureOverview | undefined
  previousLectureUrl: string | undefined
  nextLectureUrl: string | undefined
  nextLectureName: string | undefined
}

// creates links for previous and next lecture url based on current lecture and chapter id
export const getPrevAndNextUrl = (
  courseOverview: CourseOverview,
  lectureId?: number,
  chapterId?: number,
): GetPrevAndNextUrlResponse | undefined => {
  if (!lectureId || !chapterId) return undefined

  const chapters = courseOverview?.chapters ?? null
  if (chapters == null) return undefined

  let current: {
    chapter: null | ChapterOverview
    lecture: null | LectureOverview
  } = {
    chapter: null,
    lecture: null,
  }

  let previous: {
    chapter: null | ChapterOverview
    lecture: null | LectureOverview
  } = {chapter: null, lecture: null}

  let next: {
    chapter: null | ChapterOverview
    lecture: null | LectureOverview
  } = {chapter: null, lecture: null}

  let found = false
  for (const chapter of chapters) {
    if (next.chapter) break

    for (const lecture of chapter.lectures) {
      if (lectureId === lecture.id) {
        found = true
        current = {chapter, lecture}
      } else if (found) {
        next = {chapter, lecture}
        break
      }

      if (!found) {
        previous = {chapter, lecture}
      }
    }
  }

  let previousLectureUrl
  if (previous.chapter != null && previous.lecture != null) {
    previousLectureUrl = routes.kurzy.lekcia(
      courseOverview.slug,
      previous.chapter.id,
      previous.lecture.id,
    )
  }

  let nextLectureUrl
  if (next.chapter != null && next.lecture != null) {
    nextLectureUrl = routes.kurzy.lekcia(
      courseOverview.slug,
      next.chapter.id,
      next.lecture.id,
    )
  }

  return {
    currentLecture: current.lecture || undefined,
    previousLectureUrl,
    nextLectureUrl,
    nextLectureName: next.lecture?.name,
  }
}

export const emailRegex =
  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

// Creates upper case initialis (max 2 chars)
// i.e from 'Jakub Jahic' makes 'JJ', from 'Maria Anna Kovacova' makes 'MA'
export const createAvatarName = (name: string) => {
  const initials = name.split(' ', 2).map((s) => s.charAt(0).toUpperCase())
  return initials.join('')
}

export const numOfQuizzesText = (quizCount: number) => {
  let quizCountText = ''
  switch (quizCount) {
    case 1:
      quizCountText = 'kvíz'
      break
    case 2:
    case 3:
    case 4:
      quizCountText = 'kvízy'
      break
    default:
      quizCountText = 'kvízov'
      break
  }
  return quizCountText
}

export const numOfLecturesText = (lecturesCount: number) => {
  let lecturesCountText = ''
  switch (lecturesCount) {
    case 1:
      lecturesCountText = 'lekcia'
      break
    case 2:
    case 3:
    case 4:
      lecturesCountText = 'lekcie'
      break
    default:
      lecturesCountText = 'lekcií'
      break
  }
  return lecturesCountText
}

export const numOfMinutesText = (minutesCount: number) => {
  let minutesCountText = ''
  switch (minutesCount) {
    case 1:
      minutesCountText = 'minúta'
      break
    case 2:
    case 3:
    case 4:
      minutesCountText = 'minúty'
      break
    default:
      minutesCountText = 'minút'
      break
  }
  return minutesCountText
}

export function assert(
  condition: boolean,
  errorMessage?: string,
): asserts condition {
  if (!condition)
    throw new Error(
      `Assertion failed${errorMessage ? `: ${errorMessage}` : ''}`,
    )
}

export const isCourseOwnedByUser = (courseOverview: CourseOverview) =>
  courseOverview.courseProducts.length === 0 ||
  courseOverview.courseProducts.some((cp) => cp.courseUserProducts.length !== 0)

export const getCourseProductStates = (
  course: CourseOverview,
  user: User | null,
) => {
  const hasProducts = course.courseProducts.length !== 0
  const ownedByUser = isCourseOwnedByUser(course)

  const states = {
    hasProductsAndIsOwnedByUser: hasProducts && ownedByUser,
    hasProductsButIsNotOwnedByUser: hasProducts && !ownedByUser,
    hasNoProductsAndIsLoggedIn: !hasProducts && user,
    hasNoProductsAndIsNotLoggedIn: !hasProducts && !user,
  }

  return states
}
