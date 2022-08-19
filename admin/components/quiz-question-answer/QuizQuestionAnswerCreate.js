import React from 'react'
import {Create, SimpleForm, NumberInput, TextInput, useRedirect, BooleanInput} from 'react-admin'

const QuizQuestionAnswerCreate = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'quiz/question', data.questionId)
  }

  const transform = (data) => (
    {
      questionId: data.quizQuestionId,
      text: data.text,
      isCorrect: data.isCorrect,
    }
  )

  return (
    <Create
      title="Create a quiz question answer"
      mutationOptions={{onSuccess: onSuccessHandler}}
      transform={transform}
    >
      <SimpleForm>
        <NumberInput disabled source="quizQuestionId" />
        <TextInput required source="text" />
        <BooleanInput label="Is correct" source="isCorrect" />
      </SimpleForm>
    </Create>
  )
}

export default QuizQuestionAnswerCreate
