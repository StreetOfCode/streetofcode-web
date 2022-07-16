import React, {useRef, useState} from 'react'
import {Lecture, QuestionId, Quiz as IQuiz} from '../../../../types'
import {QuizQuestion} from './QuizQuestion'
import {QueryGuard} from '../../../../QueryGuard'
import Heading from '../../../core/Heading'
import Flex from '../../../core/Flex'
import Text from '../../../core/Text'
import styled from 'styled-components'
import {useGetQuizQuestionsByQuiz} from '../../../api/quizQuestions'


const Quiz = ({quiz, lecture}: {quiz: IQuiz, lecture: Lecture}) => {
  const [questionsFinished, setQuestionsFinished] = useState<QuestionId[]>([])

  const questionsFinishedRef = useRef(questionsFinished)
  questionsFinishedRef.current = questionsFinished

  const setQuestionFinished = (questionId: QuestionId, isAnsweredCorrectly: boolean) => {
    if (questionsFinished.includes(questionId) && !isAnsweredCorrectly) {
      setQuestionsFinished(questionsFinished.filter((x) => x !== questionId))
      return
    } else if (questionsFinished.includes(questionId) && isAnsweredCorrectly) {
      return
    }

    if (isAnsweredCorrectly) {
      setQuestionsFinished([...questionsFinishedRef.current, questionId])
    }
  }

  const quizQuestionsByQuiz = useGetQuizQuestionsByQuiz(quiz.id)

  return (
    <Flex direction="column">
      <QueryGuard {...quizQuestionsByQuiz}>
        {(quizQuestions) => {
          return (
            <Flex gap="36px" direction="column">
              <Flex direction="column" gap="36px">
                { lecture.content && lecture.videoUrl &&
                  <Heading variant="h2" withAccentUnderline normalWeight align="center" >{ quiz.title }</Heading> }
                <Heading variant="h4" align="center" normalWeight>{ quiz.subtitle }</Heading>
              </Flex>

              <QuizQuestionWrapperFlex direction="column" gap="60px">
                {
                  quizQuestions.map((q) => {
                    return (
                      <>
                        <QuizQuestion
                          key={q.id}
                          question={q}
                          questionNumber={quiz.questionIds.length}
                          onQuestionFinished={(isAnsweredCorrectly: boolean) =>
                            setQuestionFinished(q.id, isAnsweredCorrectly)}
                        />
                      </>
                    )
                  })
                }

                {
                  questionsFinished.length === quiz.questionIds.length &&
                  <h1>{quiz.finishedMessage}</h1>
                }

              </QuizQuestionWrapperFlex>
            </Flex>
          )
        }}
      </QueryGuard>

      <MarginedText align="right" weight="bold">
        {questionsFinished.length}/{quiz.questionIds.length} správnych odpovedí
      </MarginedText>
    </Flex>
  )
}

const MarginedText = styled(Text)`
  margin-top: 48px;
  align-self: flex-end;
`

const QuizQuestionWrapperFlex = styled(Flex)`
  width: 450px;
`

export default Quiz
