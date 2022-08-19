import React from 'react'
import {Create, NumberInput, SimpleForm, TextInput, useRedirect} from 'react-admin'

const ChapterCreate = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'course', data.course.id)
  }

  return (
    <Create title="Create a chapter" mutationOptions={{onSuccess: onSuccessHandler}} >
      <SimpleForm>
        <NumberInput disabled source="courseId" />
        <TextInput source="name" />
        <NumberInput source="chapterOrder" />
      </SimpleForm>
    </Create>
  )
}

export default ChapterCreate
