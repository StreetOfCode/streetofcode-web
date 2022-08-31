import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {Lecture} from '../../../types'
import {useGetQuizzesByLecture} from '../../api/quiz'
import Quiz from './quiz/Quiz'

type Props = {
  lecture: Lecture
}

const LectureQuiz = ({lecture}: Props) => {
  const quizzesByLecture = useGetQuizzesByLecture(lecture.id)

  return (
    <QueryGuard {...quizzesByLecture}>
      {(quizes) => {
        return (
          <>
            {quizes.map((q, i) => {
              return <Quiz key={i} quiz={q} lecture={lecture} />
            })}
          </>
        )
      }}
    </QueryGuard>
  )
}

export default LectureQuiz
