import React from 'react'
import {Create, NumberInput, SimpleForm, TextInput} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const redirect = (basePath, id, data) => `/chapter/${data.chapterId}/show`

const LectureCreate = (props) => {
  return (
    <Create title="Create a lecture" {...props}>
      <SimpleForm redirect={redirect}>
        <NumberInput disabled source="chapterId" />
        <TextInput source="name" />
        <NumberInput source="lectureOrder" />
        <TextInput required={false} source="videoUrl" />
        <MarkdownInput source="content" />
      </SimpleForm>
    </Create>
  )
}

export default LectureCreate
