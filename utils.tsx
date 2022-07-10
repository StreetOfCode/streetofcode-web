import {CourseOverview, UserProgressMetadata} from './types'

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
