import {ChapterOverview, CourseOverview, LectureOverview, UserProgressMetadata} from './types'

/***
 * i.e from 287 => 4h 47minút
 */
export const formatDurationFromMinutes = (minutes: number) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60} ${numOfMinutesText(minutes)}`
}

/***
 * i.e from 124 => 2m 4s
 */
export const formatDurationFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  seconds = seconds % 60

  return `${minutes}m ${seconds}s`
}


export const getCourseProgressPercent = (
  {lecturesViewed, courseLecturesCount}: UserProgressMetadata,
) => {
  return (lecturesViewed / courseLecturesCount) * 100
}

export const getTakeCourseUrl = (course: CourseOverview) => {
  const chapterId = course.userProgressMetadata?.nextChapterId ?? course.chapters[0].id
  const lectureId = course.userProgressMetadata?.nextLectureId ?? course.chapters[0].lectures[0].id
  return `/course/${course.id}/take/chapter/${chapterId}/lecture/${lectureId}`
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

  let current: { chapter: null | ChapterOverview; lecture: null | LectureOverview } = {
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
    previousLectureUrl =
      `/course/${courseOverview.id}/take/chapter/${previous.chapter?.id}/lecture/${previous.lecture?.id}`
  }

  let nextLectureUrl
  if (next.chapter != null && next.lecture != null) {
    nextLectureUrl = `/course/${courseOverview.id}/take/chapter/${next.chapter?.id}/lecture/${next.lecture?.id}`
  }

  return {
    currentLecture: current.lecture || undefined,
    previousLectureUrl,
    nextLectureUrl,
  }
}


export const emailRegex =  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

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
