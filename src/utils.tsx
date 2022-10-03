import React from 'react'
import {AiOutlinePlayCircle, AiOutlineQuestionCircle} from 'react-icons/ai'
import {CgNotes} from 'react-icons/cg'
import {
  ChapterOverview,
  CourseOverview,
  LectureOverview,
  LectureType,
} from './types'

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
 * i.e from '2007-12-03T10:15:30+01:00' => '03/12/2007, 10:15:30'
 */
export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('en-GB')
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
  return `/kurzy/${course.slug}/kapitola/${chapterId}/lekcia/${lectureId}`
}

export const getLectureTypeIcon = (lectureType: LectureType) => {
  if (lectureType === 'VIDEO') {
    return <AiOutlinePlayCircle />
  } else if (lectureType === 'TEXT') {
    return <CgNotes />
  } else {
    return <AiOutlineQuestionCircle />
  }
}

export interface GetPrevAndNextUrlResponse {
  currentLecture: LectureOverview | undefined
  previousLectureUrl: string | undefined
  nextLectureUrl: string | undefined
}

// creates links for previous and next lecture url based on current lecture and chapter id
export const getPrevAndNextUrl = (
  courseOverview: CourseOverview,
  lectureId?: string,
  chapterId?: string,
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
      if (Number(lectureId) === lecture.id) {
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
    previousLectureUrl = `/kurzy/${courseOverview.slug}/kapitola/${previous.chapter?.id}/lekcia/${previous.lecture?.id}`
  }

  let nextLectureUrl
  if (next.chapter != null && next.lecture != null) {
    nextLectureUrl = `/kurzy/${courseOverview.slug}/kapitola/${next.chapter?.id}/lekcia/${next.lecture?.id}`
  }

  return {
    currentLecture: current.lecture || undefined,
    previousLectureUrl,
    nextLectureUrl,
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
