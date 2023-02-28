export type ThemeSetting = 'NOT-SET' | 'LIGHT' | 'DARK' | 'AUTO'

export interface Difficulty {
  id: number
  name: string
  skillLevel: number
}

export interface Author {
  id: number
  name: string
  slug: string
  imageUrl: string
  coursesTitle: string
  email: string
  description: string
}

export enum CourseStatus {
  PUBLIC,
  DRAFT,
  PRIVATE,
}

export type LectureType = 'VIDEO' | 'TEXT' | 'QUIZ'

export interface LectureChapterDto {
  id: number
  name: string
}

export interface LectureCourseDto {
  id: number
  lecturesCount: number
}

export interface Lecture {
  id: number
  chapter: LectureChapterDto
  course: LectureCourseDto
  name: string
  lectureOrder: number
  content: null | string
  videoUrl: null | string
  videoDurationSeconds: null | number
  createdAt: Date
  updatedAt: Date
}

export interface LectureComment {
  id: number
  userId: string
  userName: string
  imageUrl?: string
  commentText: string
  createdAt: Date
  updatedAt: Date
}

export interface CourseOverview {
  id: number
  courseOrder: number
  name: string
  slug: string
  shortDescription: string
  longDescription: string
  resources: null | string
  chapters: ChapterOverview[]
  author: Author
  difficulty: Difficulty
  createdAt: Date
  updatedAt: Date
  trailerUrl: null | string
  thumbnailUrl: null | string
  iconUrl: string
  status: string
  courseDurationMinutes: number
  reviewsOverview: CourseReviewsOverview
  userProgressMetadata: null | UserProgressMetadata
}

export interface ChapterOverview {
  id: number
  name: string
  lectures: LectureOverview[]
  chapterDurationMinutes: number
}

export interface LectureOverview {
  id: number
  name: string
  videoDurationSeconds: number
  lectureType: LectureType
}

export enum ProgressStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export interface UserProgressMetadata {
  lecturesViewed: number
  courseLecturesCount: number
  status: ProgressStatus
  startedAt: Date
  lastUpdatedAt: Date
  finishedAt: null | Date
  nextChapterId: null | number
  nextLectureId: null | number
}

export interface CourseProgressOverview {
  lecturesViewed: number
  courseLecturesCount: number
  chapters: ChapterProgressOverview[]
}

export interface ChapterProgressOverview {
  id: number
  name: string
  viewed: boolean
  lectures: LectureProgressOverview[]
  chapterDurationMinutes: number
}

export interface LectureProgressOverview {
  id: number
  name: string
  viewed: boolean
  videoDurationSeconds: number
  lectureType: LectureType
}

export interface ResetProgressRequest {
  courseId?: number | null
  chapterId?: number | null
  lectureId?: number | null
}

export interface CourseReview {
  id: number
  userId: string
  courseId: number
  rating: number
  text?: string
  userName: string
  imageUrl?: string
}

export interface CourseReviewsOverview {
  averageRating: number
  numberOfReviews: number
}

export interface CourseReviewAddRequest {
  courseId: number
  rating: number
  text?: string
}

export interface CourseReviewEditRequest {
  rating: number
  text?: string
}

export interface LectureCommentEditRequest {
  commentText: string
}

export interface LectureCommentAddRequest {
  commentText: string
}

export interface AuthorOverview {
  id: number
  name: string
  slug: string
  imageUrl: string
  coursesTitle: string
  email: string
  description: string
  courses: CourseOverview[]
}

export interface SendFeedbackRequest {
  email: string
  subject: null | string
  emailText: string
  recaptchaToken?: string
}

export interface AddToNewsletterRequest {
  email: string
  recaptchaToken?: string
  fromPath?: string
  subscribedFrom: SubscribedFromType
}

export type QuizId = string & {_type: 'QuizId'}

export interface Quiz {
  id: number
  lectureId: QuizId
  title: string
  subtitle: null | string
  createdAt: Date
  finishedMessage: null | string
  questionIds: QuestionId[]
}

export interface QuizQuestionAnswer {
  id: number
  questionId: number
  text: string
}

export type QuestionId = string & {_type: 'QuestionId'}

export interface QuizQuestionUserAnswer {
  id: number
  question: QuizQuestion
  isCorrect: boolean
  answer: QuizQuestionAnswer
}

export interface QuizQuestionUserAnswerRequest {
  questionId: QuestionId
  answerIds: number[]
}

export interface QuestionCorrectness {
  isCorrect: boolean
}

export type QuizQuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'

export interface QuizQuestion {
  id: QuestionId
  quiz: Quiz
  questionOrder: number
  text: string
  type: QuizQuestionType
  answers: QuizQuestionAnswer[]
}

export interface QuizRemoveAnswersRequest {
  lectureId: number
}

export interface NextCourseVoteOption {
  id: number
  name: string
}

export interface VoteNextCoursesRequest {
  courseVoteOptionIds: number[]
  recaptchaToken?: string
}

export interface SocUser {
  firebaseId: string
  name: string
  email: string
  imageUrl: null | string
  receiveNewsletter: boolean
}

export interface AddSocUser {
  id: string
  name: string
  email: string
  imageUrl: null | string
  receiveNewsletter: boolean
  sendDiscordInvitation: boolean
  subscribedFrom: SubscribedFromType
}

export interface EditSocUser {
  name: string
  imageUrl: null | string
  receiveNewsletter: boolean
  subscribedFrom: SubscribedFromType
}

export type SubscribedFromType =
  | 'FOOTER'
  | 'NEWSLETTER_PAGE'
  | 'ONBOARDING'
  | 'PROFILE'
  | 'NEWSLETTER_MODAL'

export interface PostComment {
  id: number
  postId: string
  postTitle: string
  userId?: string
  userName?: string
  imageUrl?: string
  commentText: string
  createdAt: string
  updatedAt: string
}

export interface PostCommentEditRequest {
  commentText: string
}

export interface PostCommentAddRequest {
  postTitle: string
  commentText: string
}
