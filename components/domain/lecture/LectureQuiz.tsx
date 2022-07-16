import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {Lecture} from '../../../types'
import {useGetQuizzesByLecture} from '../../api/quiz'
import Quiz from './quiz/Quiz'

const LectureQuiz = (props: { lecture: Lecture }) => {
  const quizzesByLecture = useGetQuizzesByLecture(props.lecture.id)

  return (
    <>
      <QueryGuard {...quizzesByLecture}>
        {(quizes) => {
          return (
            <>
              {
                quizes.map((q, i) => {
                  return (<Quiz key={i} quiz={q} lecture={props.lecture} />)
                })

              }
            </>
          )
        }}
      </QueryGuard>
    </>
  )
}


export default LectureQuiz
