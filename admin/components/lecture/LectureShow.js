import React from 'react'
import {DateField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField} from 'react-admin'
import {MarkdownField} from '../../custom/MarkdownField'

const LectureShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField label="Chapter" source="chapter.id" reference="chapter" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <NumberField source="lectureOrder" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="videoUrl" />
        <MarkdownField addLabel source="content" />
      </SimpleShowLayout>
    </Show>
  )
}

export default LectureShow
