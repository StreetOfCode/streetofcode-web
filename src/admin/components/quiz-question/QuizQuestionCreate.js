import React from 'react'
import {
  Create,
  SimpleForm,
  NumberInput,
  useRedirect,
  SelectInput,
} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

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
        <MarkdownInput required source="text" />
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
