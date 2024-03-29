import React from 'react'
import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useRedirect,
} from 'react-admin'

const QuizEdit = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'lecture', data.lectureId)
  }

  return (
    <Edit
      mutationOptions={{onSuccess: onSuccessHandler}}
      mutationMode="pessimistic"
      title="Edit a quiz"
    >
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput required source="title" />
        <TextInput source="subtitle" />
        <TextInput source="finishedMessage" />
      </SimpleForm>
    </Edit>
  )
}

export default QuizEdit
