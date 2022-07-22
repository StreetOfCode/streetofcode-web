import React from 'react'
import Button from '@material-ui/core/Button'
import {MarkdownField} from '../../custom/MarkdownField'

import {
  Datagrid,
  DateField,
  NumberField,
  Link,
  ReferenceField,
  ReferenceManyField,
  Show,
  ShowButton,
  EditButton,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin'

const CreateChapter = () => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <Button
      component={Link}
      to={{
        pathname: '/chapter/create',
        search: `?source=${JSON.stringify({courseId: record.id})}`,
      }}
    >
      Create new chapter
    </Button>
  )
}

const CourseShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField label="Author" source="author.id" reference="author" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Difficulty" source="difficulty.id" reference="difficulty">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <TextField source="shortDescription" />
        <MarkdownField addLabel source="longDescription" />
        <MarkdownField addLabel source="resources" />
        <TextField source="trailerUrl" />
        <TextField source="thumbnailUrl" />
        <TextField source="iconUrl" />
        <TextField source="status" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <ReferenceManyField label="Chapters" reference="chapter" target="courseId">
          <Datagrid>
            <ReferenceField label="Chapter" source="id" reference="chapter" link="show">
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="chapterOrder" />
            <DateField source="updatedAt" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <CreateChapter />
      </SimpleShowLayout>
    </Show>
  )
}

export default CourseShow
