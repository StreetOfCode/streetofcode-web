import React from 'react'
import {
  Create,
  SimpleForm,
  NumberInput,
  useRedirect,
  BooleanInput,
} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const QuizQuestionAnswerCreate = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'quiz/question', data.questionId)
  }

  const transform = (data) => ({
    questionId: data.quizQuestionId,
    text: data.text,
    isCorrect: data.isCorrect,
  })

  return (
    <Create
      title="Create a quiz question answer"
      mutationOptions={{onSuccess: onSuccessHandler}}
      transform={transform}
    >
      <SimpleForm>
        <NumberInput disabled source="quizQuestionId" />
        <MarkdownInput required source="text" />
        <BooleanInput label="Is correct" source="isCorrect" />
      </SimpleForm>
    </Create>
  )
}

export default QuizQuestionAnswerCreate
