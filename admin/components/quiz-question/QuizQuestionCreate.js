import React from 'react'
import {
  Create,
  SimpleForm,
  NumberInput,
  TextInput,
  useRedirect,
  SelectInput,
} from 'react-admin'

const QuizQuestionCreate = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'quiz', data.quiz.id)
  }

  return (
    <Create
      title="Create a quiz question"
      mutationOptions={{onSuccess: onSuccessHandler}}
    >
      <SimpleForm>
        <NumberInput disabled source="quizId" />
        <NumberInput required source="questionOrder" />
        <TextInput required source="text" />
        <SelectInput
          required
          source="type"
          label="Type"
          choices={[
            {id: 'SINGLE_CHOICE', name: 'Single choice'},
            {id: 'MULTIPLE_CHOICE', name: 'Multiple choice'},
          ]}
        />
      </SimpleForm>
    </Create>
  )
}

export default QuizQuestionCreate
