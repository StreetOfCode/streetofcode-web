import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Button from '../../../core/Button'
import CheckBox from '../../../core/CheckBox'
import Flex from '../../../core/Flex'
import Text from '../../../core/Text'
import {
  QuizQuestion as IQuizQuestion,
  QuizQuestionAnswer,
  QuizQuestionUserAnswer,
} from '../../../../types'
import RadioGroup from '../../../core/RadioGroup'
import {useTheme} from '../../../../hooks/useTheme'
import {useSubmitUserAnswer} from '../../../../api/quizQuestionUserAnswers'
import MarkdownView from '../../../core/MarkdownView'

const QuizAnswer = ({quizAnswer}: {quizAnswer: QuizQuestionAnswer}) => {
  return (
    <MarkdownView
      children={quizAnswer.text}
      customComponents={{
        p: ({children}) => <Text color="inherit" children={children} />,
      }}
    />
  )
}

export const QuizQuestion = ({
  question,
  onQuestionFinished,
  onEmptyAnswers,
  questionNumber,
  previouslySelectedAnswers,
}: {
  question: IQuizQuestion
  onQuestionFinished: (wasAnsweredCorrectly: boolean) => void
  onEmptyAnswers: () => void
  questionNumber: number
  previouslySelectedAnswers: QuizQuestionUserAnswer[]
}) => {
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([])
  const [wasAnsweredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null,
  )
  const {theme} = useTheme()
  const submitUserAnswer = useSubmitUserAnswer(question.quiz.id)

  useEffect(() => {
    if (previouslySelectedAnswers.length === 0) {
      onEmptyAnswers()
    }

    const savedAnswers = previouslySelectedAnswers.filter(
      (a) => a.question.id === question.id,
    )

    if (savedAnswers.length === 0) {
      setAnsweredCorrectly(null)
    } else {
      const isAnsweredCorrectly =
        savedAnswers.filter((x) => x.isCorrect).length !== 0
      setAnsweredCorrectly(isAnsweredCorrectly)
      onQuestionFinished(isAnsweredCorrectly)
    }

    setSelectedAnswerIds(
      previouslySelectedAnswers
        .filter((a) => a.question.id === question.id)
        .map((a) => a.answer)
        .map((a) => {
          return a.id
        }),
    )
  }, [previouslySelectedAnswers])

  const onAnswerSelected = (answer: QuizQuestionAnswer): string => {
    if (selectedAnswerIds.includes(answer.id)) {
      setSelectedAnswerIds(selectedAnswerIds.filter((id) => id !== answer.id))
      return ''
    }

    if (question.type === 'SINGLE_CHOICE') {
      setSelectedAnswerIds([answer.id])
    } else {
      setSelectedAnswerIds([...selectedAnswerIds, answer.id])
    }

    return ''
  }

  const onSubmit = async () => {
    const correctness = await submitUserAnswer.mutateAsync({
      questionId: question.id,
      answerIds: selectedAnswerIds,
    })

    setAnsweredCorrectly(correctness.isCorrect)
    onQuestionFinished(correctness.isCorrect)
  }

  return (
    <Flex
      alignSelf="stretch"
      alignItems="stretch"
      gap="12px"
      direction="column"
    >
      {wasAnsweredCorrectly}
      <MarkdownView
        children={question.text}
        customComponents={{
          p: ({children}) => <Text weight="bold" children={children} />,
        }}
      />
      {question.type === 'SINGLE_CHOICE' && (
        <RadioGroup
          disabled={wasAnsweredCorrectly !== null}
          applyColor={(i: number) => {
            const shouldBeColoredGreen =
              selectedAnswerIds[0] === question.answers[i].id &&
              wasAnsweredCorrectly

            if (shouldBeColoredGreen) {
              return theme.successColor
            }

            const shouldBeColoredRed =
              wasAnsweredCorrectly === false &&
              selectedAnswerIds[0] === question.answers[i].id
            if (shouldBeColoredRed) {
              return theme.dangerColor
            }

            return undefined
          }}
          selected={question.answers
            .map((x) => x.id)
            .indexOf(selectedAnswerIds[0])}
          onRadioClick={(i: number) => onAnswerSelected(question.answers[i])}
        >
          {question.answers.map((a) => (
            <QuizAnswer key={a.id} quizAnswer={a} />
          ))}
        </RadioGroup>
      )}

      {question.type === 'MULTIPLE_CHOICE' && (
        <Flex gap="12px" alignSelf="stretch" direction="column">
          {question.answers.map((a) => {
            const shouldBeColoredGreen =
              wasAnsweredCorrectly === true && selectedAnswerIds.includes(a.id)
            const shouldBeColoredRed =
              wasAnsweredCorrectly === false && selectedAnswerIds.includes(a.id)

            let checkedColor
            if (shouldBeColoredGreen) {
              checkedColor = theme.successColor
            } else if (shouldBeColoredRed) {
              checkedColor = theme.dangerColor
            } else {
              checkedColor = theme.accentColor
            }

            const isToggled = selectedAnswerIds.includes(a.id)

            return (
              <WrappedFlex
                alignSelf="stretch"
                key={a.id}
                backgroundColor={isToggled ? checkedColor : theme.primaryColor}
                direction="column"
                color={isToggled ? theme.primaryColor : theme.secondaryColor}
                borderColor={
                  wasAnsweredCorrectly !== null && isToggled
                    ? checkedColor
                    : theme.accentColor
                }
                onClick={() => {
                  if (!wasAnsweredCorrectly) onAnswerSelected(a)
                }}
              >
                <CheckBox
                  label={a.text}
                  labelColor={
                    isToggled ? theme.primaryColor : theme.secondaryColor
                  }
                  disabled={wasAnsweredCorrectly !== null}
                  checkedColor={theme.primaryColor}
                  onToggle={() => onAnswerSelected(a)}
                  checked={selectedAnswerIds.includes(a.id)}
                  size="20px"
                />
              </WrappedFlex>
            )
          })}
        </Flex>
      )}
      <Flex alignSelf="stretch" justifyContent="space-between">
        {wasAnsweredCorrectly === null && (
          <Button
            disabled={selectedAnswerIds.length === 0}
            variant="accent"
            onClick={() => onSubmit()}
          >
            Skontrolovať
          </Button>
        )}
        {wasAnsweredCorrectly && (
          <AnswerFeedbackText>Správne!</AnswerFeedbackText>
        )}
        {wasAnsweredCorrectly === false && (
          <TryAgainButton
            onClick={() => {
              setAnsweredCorrectly(null)
              setSelectedAnswerIds([])
            }}
          >
            Skúsiť znova
          </TryAgainButton>
        )}

        <Text>
          {question.questionOrder}/{questionNumber}
        </Text>
      </Flex>
    </Flex>
  )
}

const AnswerFeedbackText = styled.span`
  display: block;
  color: var(--color-success);
  text-align: center;

  font-size: 16px;
`

const TryAgainButton = styled(Button)`
  background-color: var(--color-danger);
  color: var(--color-primary);
  border: none;
  font-weight: bold;
`

const WrappedFlex = styled(Flex)<{
  backgroundColor?: string
  color?: string
  borderColor?: string
}>`
  border: 1px solid ${(props) => props.borderColor};
  padding: 12px;
  padding-left: 24px;
  border-radius: 12px;
  color: ${(props) => props.color};
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`
