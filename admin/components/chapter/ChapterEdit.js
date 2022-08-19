import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput, useRedirect} from 'react-admin'

const ChapterEdit = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'chapter', data.id)
  }

  return (
    <Edit title="Edit a chapter" mutationMode="pessimistic" mutationOptions={{onSuccess: onSuccessHandler}}>
      <SimpleForm>
        <NumberInput disabled source="courseId" />
        <TextInput source="name" />
        <NumberInput source="chapterOrder" />
      </SimpleForm>
    </Edit>
  )
}

export default ChapterEdit
