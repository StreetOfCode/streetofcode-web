import React from 'react'
import {NumberField, ReferenceField, Show, SimpleShowLayout, TextField} from 'react-admin'

const QuizShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField label="Lecture" source="lecture.id" reference="lecture" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="subtitle" />
        <TextField source="finishedMessage" />
      </SimpleShowLayout>
    </Show>
  )
}

export default QuizShow
