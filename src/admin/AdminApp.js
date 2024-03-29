import CircularProgress from '@mui/material/CircularProgress'
import {useRouter} from 'next/router'
import simpleRestProvider from 'ra-data-simple-rest'
import React, {useEffect, useState} from 'react'
import {Admin, fetchUtils, Resource} from 'react-admin'
import AuthorCreate from './components/author/AuthorCreate'
import AuthorEdit from './components/author/AuthorEdit'
import AuthorList from './components/author/AuthorList'
import AuthorShow from './components/author/AuthorShow'
import ChapterCreate from './components/chapter/ChapterCreate'
import ChapterEdit from './components/chapter/ChapterEdit'
import ChapterShow from './components/chapter/ChapterShow'
import CourseCreate from './components/course/CourseCreate'
import CourseEdit from './components/course/CourseEdit'
import CourseList from './components/course/CourseList'
import CourseShow from './components/course/CourseShow'
import DifficultyCreate from './components/difficulty/DifficultyCreate'
import DifficultyEdit from './components/difficulty/DifficultyEdit'
import DifficultyList from './components/difficulty/DifficultyList'
import DifficultyShow from './components/difficulty/DifficultyShow'
import LectureCreate from './components/lecture/LectureCreate'
import LectureEdit from './components/lecture/LectureEdit'
import LectureShow from './components/lecture/LectureShow'
import Button from '../components/core/Button'
import LoginPage from '../pages/login/[redirectUri]'
import {useAuth} from '../AuthUserContext'
import QuizCreate from './components/quiz/QuizCreate'
import QuizEdit from './components/quiz/QuizEdit'
import QuizShow from './components/quiz/QuizShow'
import QuizQuestionCreate from './components/quiz-question/QuizQuestionCreate'
import QuizQuestionEdit from './components/quiz-question/QuizQuestionEdit'
import QuizQuestionShow from './components/quiz-question/QuizQuestionShow'
import QuizQuestionAnswerCreate from './components/quiz-question-answer/QuizQuestionAnswerCreate'
import QuizQuestionAnswerEdit from './components/quiz-question-answer/QuizQuestionAnswerEdit'
import QuizQuestionAnswerShow from './components/quiz-question-answer/QuizQuestionAnswerShow'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const AdminApp = ({user, logout}) => {
  const [dataProvider, setDataProvider] = useState(null)

  useEffect(() => {
    try {
      const fetchJson = async (url, options = {}) => {
        options.headers = new Headers({
          Authorization: `Bearer ${await user.getIdToken()}`,
          ...options.headers,
        })
        return fetchUtils.fetchJson(url, options)
      }
      setDataProvider(simpleRestProvider(API_URL, fetchJson))
    } catch (e) {
      setDataProvider(null)
    }
  }, [])

  const LogoutButton = () => <Button onClick={logout}>Odhlásiť</Button>

  return (
    <>
      {dataProvider && (
        <Admin
          disableTelemetry
          dataProvider={dataProvider}
          logoutButton={LogoutButton}
          loginPage={LoginPage}
          basename="admin"
        >
          <Resource
            name="course"
            list={CourseList}
            create={CourseCreate}
            edit={CourseEdit}
            show={CourseShow}
          />
          <Resource
            name="difficulty"
            list={DifficultyList}
            create={DifficultyCreate}
            edit={DifficultyEdit}
            show={DifficultyShow}
          />
          <Resource
            name="author"
            list={AuthorList}
            create={AuthorCreate}
            edit={AuthorEdit}
            show={AuthorShow}
          />
          <Resource
            name="chapter"
            create={ChapterCreate}
            edit={ChapterEdit}
            show={ChapterShow}
          />
          <Resource
            name="lecture"
            create={LectureCreate}
            edit={LectureEdit}
            show={LectureShow}
          />
          <Resource
            name="quiz"
            create={QuizCreate}
            edit={QuizEdit}
            show={QuizShow}
          />
          <Resource
            name="quiz/question"
            create={QuizQuestionCreate}
            edit={QuizQuestionEdit}
            show={QuizQuestionShow}
          />
          <Resource
            name="quiz/question/answer"
            create={QuizQuestionAnswerCreate}
            edit={QuizQuestionAnswerEdit}
            show={QuizQuestionAnswerShow}
          />
        </Admin>
      )}
    </>
  )
}

const AdminAppUserWrapper = () => {
  const {user, isLoading, logout} = useAuth()
  const router = useRouter()

  if (isLoading) return <CircularProgress />

  if (!user) {
    router.push(`/login/${encodeURIComponent('/admin')}`)
  }

  return <AdminApp user={user} logout={logout} />
}

export default AdminAppUserWrapper
