import React from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'
import {CourseStatus} from '../../../types'

const courseStatusChoices = []
for (const status in CourseStatus) {
  if (isNaN(Number(status))) {
    const statusChoice = new Map()
    statusChoice['id'] = status
    statusChoice['name'] = status
    courseStatusChoices.push(statusChoice)
  }
}

const transform = (data) => ({
  id: data.id,
  authorId: data.author.id,
  difficultyId: data.difficulty.id,
  name: data.name,
  slug: data.slug,
  shortDescription: data.shortDescription,
  longDescription: data.longDescription,
  resources: data.resources,
  trailerUrl: data.trailerUrl,
  thumbnailUrl: data.thumbnailUrl,
  iconUrl: data.iconUrl,
  status: data.status,
  courseOrder: data.courseOrder,
})

const CourseEdit = () => {
  return (
    <Edit title="Edit a course" transform={transform}>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <ReferenceInput
          required
          label="Author"
          source="author.id"
          reference="author"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
          required
          label="Difficulty"
          source="difficulty.id"
          reference="difficulty"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput required source="name" />
        <TextInput required source="slug" />
        <NumberInput required source="courseOrder" />
        <TextInput required source="shortDescription" />
        <MarkdownInput source="longDescription" />
        <MarkdownInput source="resources" />
        <TextInput source="trailerUrl" />
        <TextInput source="thumbnailUrl" />
        <TextInput required source="iconUrl" />
        <SelectInput source="status" choices={courseStatusChoices} />
      </SimpleForm>
    </Edit>
  )
}

export default CourseEdit
