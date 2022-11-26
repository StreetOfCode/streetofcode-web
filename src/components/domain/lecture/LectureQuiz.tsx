import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {Lecture} from '../../../types'
import {useGetQuizzesByLecture} from '../../api/quiz'
import Quiz from './quiz/Quiz'

type Props = {
  lecture: Lecture
  onHasQuiz: () => void
}

const LectureQuiz = ({lecture, onHasQuiz}: Props) => {
  const quizzesByLecture = useGetQuizzesByLecture(lecture.id)

  return (
    <QueryGuard {...quizzesByLecture}>
      {(quizes) => {
        return (
          <>
            {quizes.map((q, i) => {
              return (
                <Quiz
                  key={i}
                  quiz={q}
                  lecture={lecture}
                  onHasQuiz={onHasQuiz}
                />
              )
            })}
          </>
        )
      }}
    </QueryGuard>
  )
}

export default LectureQuiz
