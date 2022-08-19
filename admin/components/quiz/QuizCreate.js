import React from 'react'
import {Create, SimpleForm, NumberInput, TextInput, useRedirect} from 'react-admin'

const QuizCreate = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'lecture', data.lectureId)
  }

  return (
    <Create title="Create a quiz" mutationOptions={{onSuccess: onSuccessHandler}} >
      <SimpleForm>
        <NumberInput disabled source="lectureId" />
        <TextInput required source="title" />
        <TextInput source="subtitle" />
        <TextInput source="finishedMessage" />
      </SimpleForm>
    </Create>
  )
}

export default QuizCreate
