import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const redirect = (basePath, id, data) => `/lecture/${data.id}/show`

const LectureEdit = (props) => {
  return (
    <Edit undoable={false} title="Edit a lecture" {...props}>
      <SimpleForm redirect={redirect}>
        <NumberInput disabled source="id" />
        <TextInput source="name" />
        <NumberInput source="lectureOrder" />
        <TextInput required={false} source="videoUrl" />
        <MarkdownInput source="content" />
      </SimpleForm>
    </Edit>
  )
}

export default LectureEdit
