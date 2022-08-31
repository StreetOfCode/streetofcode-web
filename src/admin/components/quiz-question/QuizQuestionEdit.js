import React from 'react'
import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useRedirect,
  SelectInput,
} from 'react-admin'

const QuizQuestionEdit = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'quiz', data.quiz.id)
  }

  const transform = (data) => ({
    id: data.id,
    quizId: data.quiz.id,
    questionOrder: data.questionOrder,
    text: data.text,
    type: data.type,
  })

  return (
    <Edit
      transform={transform}
      mutationMode="pessimistic"
      mutationOptions={{onSuccess: onSuccessHandler}}
      title="Edit a quiz question"
    >
      <SimpleForm>
        <NumberInput disabled source="id" />
        <NumberInput disabled source="quiz.id" />
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
    </Edit>
  )
}

export default QuizQuestionEdit
