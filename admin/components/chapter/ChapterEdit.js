import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput} from 'react-admin'

const redirect = (basePath, id, data) => `/chapter/${data.id}/show`

const ChapterEdit = (props) => {
  return (
    <Edit undoable={false} title="Edit a chapter" {...props}>
      <SimpleForm redirect={redirect}>
        <NumberInput disabled source="courseId" />
        <TextInput source="name" />
        <NumberInput source="chapterOrder" />
      </SimpleForm>
    </Edit>
  )
}

export default ChapterEdit
