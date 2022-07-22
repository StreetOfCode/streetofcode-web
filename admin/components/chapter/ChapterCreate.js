import React from 'react'
import {Create, NumberInput, SimpleForm, TextInput} from 'react-admin'

const redirect = (basePath, id, data) => `/course/${data.courseId}/show`

const ChapterCreate = (props) => {
  return (
    <Create title="Create a chapter" {...props}>
      <SimpleForm redirect={redirect}>
        <NumberInput disabled source="courseId" />
        <TextInput source="name" />
        <NumberInput source="chapterOrder" />
      </SimpleForm>
    </Create>
  )
}

export default ChapterCreate
