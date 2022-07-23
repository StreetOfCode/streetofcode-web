import React from 'react'
import {Create, SimpleForm, TextInput, SelectInput, ReferenceInput} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const CourseCreate = (props) => {
  return (
    <Create title="Create a course" {...props}>
      <SimpleForm redirect="list">
        <ReferenceInput required label="Author" source="authorId" reference="author">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput required label="Difficulty" source="difficultyId" reference="difficulty">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput required source="name" />
        <TextInput required source="slug" />
        <TextInput required source="shortDescription" />
        <MarkdownInput source="longDescription" />
        <MarkdownInput source="resources" />
        <TextInput source="trailerUrl" />
        <TextInput source="thumbnailUrl" />
        <TextInput required source="iconUrl" />
        <TextInput disabled source="status" defaultValue="DRAFT" />
      </SimpleForm>
    </Create>
  )
}

export default CourseCreate
