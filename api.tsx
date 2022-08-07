import * as Auth from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const COURSES_OVERVIEW_URL = `${API_URL}/course/overview`
export const coursesOverviewUrl = () => COURSES_OVERVIEW_URL

const COURSE_SLUGS_URL = `${API_URL}/course/slug`
export const courseSlugsUrl = () => COURSE_SLUGS_URL

const MY_COURSES_URL = `${API_URL}/course/my-courses`
export const myCoursesUrl = () => MY_COURSES_URL

const COURSE_OVERVIEW_URL = `${API_URL}/course/overview/`
export const courseOverviewUrl = (slug: string) => `${COURSE_OVERVIEW_URL}${slug}`

const COURSE_PROGRESS_OVERVIEW_URL = `${API_URL}/progress/overview/`
export const courseProgressOverviewUrl = (courseId: number) => `${COURSE_PROGRESS_OVERVIEW_URL}${courseId}`

const COURSE_REVIEWS_URL = `${API_URL}/course-review/course/`
export const courseReviewsUrl = (courseId: number) => `${COURSE_REVIEWS_URL}${courseId}`

const COURSE_REVIEWS_OVERVIEW_URL = `${API_URL}/course-review/course/`
export const courseReviewsOverviewUrl = (courseId: number) => `${COURSE_REVIEWS_OVERVIEW_URL}${courseId}/overview`

const ADD_COURSE_REVIEW_URL = `${API_URL}/course-review`
export const addCourseReviewUrl = () => `${ADD_COURSE_REVIEW_URL}`

const COURSE_REVIEW_URL = `${API_URL}/course-review`
export const courseReviewUrl = (reviewId: number) => `${COURSE_REVIEW_URL}/${reviewId}`

const GET_LECTURE_URL = `${API_URL}/lecture/`
export const lectureUrl = (lectureId: number) => `${GET_LECTURE_URL}${lectureId}`

const LECTURE_COMMENTS_URL = `${API_URL}/lecture/`
export const lectureCommentsUrl = (lectureId: number) => `${LECTURE_COMMENTS_URL}${lectureId}/comment`

const LECTURE_COMMENT_URL = `${API_URL}/lecture/`
export const lectureCommentUrl = (lectureId: number, commentId: number) =>
  `${LECTURE_COMMENT_URL}${lectureId}/comment/${commentId}`

const UPDATE_PROGRESS_LECTURE_URL = `${API_URL}/progress/update/`
export const updateProgressLectureUrl = (lectureId: number) => `${UPDATE_PROGRESS_LECTURE_URL}${lectureId}`

const RESET_PROGRESS_URL = `${API_URL}/progress/reset`
export const resetProgressUrl = () => `${RESET_PROGRESS_URL}`

const AUTHOR_OVERVIEW_URL = `${API_URL}/author/`
export const authorOverviewUrl = (slug: string) => `${AUTHOR_OVERVIEW_URL}${slug}/overview`

const AUTHOR_SLUGS_URL = `${API_URL}/author/slug`
export const authorSlugssUrl = () => AUTHOR_SLUGS_URL

const SEND_FEEDBACK_URL = `${API_URL}/email-feedback`
export const sendFeedbackUrl = () => `${SEND_FEEDBACK_URL}`

const GET_QUIZES_BY_LECTURE_ID_URL = `${API_URL}/quiz/lecture/`
export const quizByLectureUrl = (lectureId: number) => `${GET_QUIZES_BY_LECTURE_ID_URL}${lectureId}`

const GET_QUESTIONS_BY_QUIZ_URL = `${API_URL}/quiz/`
export const questionsByQuizUrl = (quizId: number) => `${GET_QUESTIONS_BY_QUIZ_URL}${quizId}/question`

const ANSWER_QUESTION_URL = `${API_URL}/quiz/question/user-answer/`
export const answerQuestionUrl = () => `${ANSWER_QUESTION_URL}`

const GET_PREVIOUS_QUESTION_ANSWER_URL = `${API_URL}/quiz/`
export const previousAnswersByQuizIdUrl = (
  quizId: number,
) => `${GET_PREVIOUS_QUESTION_ANSWER_URL}${quizId}/question/user-answer`

const VOTE_NEXT_COURSE_URL = `${API_URL}/next-course-vote`
export const voteNextUrl = () => `${VOTE_NEXT_COURSE_URL}`

const USER_URL = `${API_URL}/user`
export const userUrl = () => `${USER_URL}`


export const authFetch = async (url: string) => {
  const params = await createParams('GET')
  return fetch(url, params)
}

export const noAuthFetch = async (url: string) => {
  console.log('url', url)
  const params = await noAuthCreateParams('GET')
  return fetch(url, params)
}

export const authPost = async <T,>(url: string, body: T | null = null) => {
  let params = await createParams('POST')

  if (body) {
    params = {...params, body: JSON.stringify(body)}
  }

  return fetch(url, params)
}

export const authDelete = async (url: string) => {
  const params = await createParams('DELETE')
  return fetch(url, params)
}

export const authPut = async <T,>(url: string, body: T | null = null) => {
  let params = await createParams('PUT')

  if (body) {
    params = {...params, body: JSON.stringify(body)}
  }

  return fetch(url, params)
}

const noAuthCreateParams = async (method: string): Promise<RequestInit> => {
  let params: RequestInit = {method}
  const headers: HeadersInit = {'Content-Type': 'application/json'}

  params = {...params, headers}
  return params
}

const createParams = async (method: string): Promise<RequestInit> => {
  let params: RequestInit = {method}
  const headers: HeadersInit = {'Content-Type': 'application/json'}

  const token = await Auth.getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  params = {...params, headers}
  return params
}
