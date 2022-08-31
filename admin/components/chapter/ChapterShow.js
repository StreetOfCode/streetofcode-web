import Button from '@material-ui/core/Button'
import React from 'react'
import {
  Datagrid,
  DateField,
  Link,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  Show,
  ShowButton,
  EditButton,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin'

const CreateLecture = () => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <Button
      component={Link}
      to={{
        pathname: '/lecture/create',
        search: `?source=${JSON.stringify({chapterId: record.id})}`,
      }}
    >
      Create new lecture
    </Button>
  )
}

const ChapterShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField
          label="Course"
          source="course.id"
          reference="course"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <NumberField source="chapterOrder" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <ReferenceManyField
          label="Lectures"
          reference="lecture"
          target="chapterId"
        >
          <Datagrid>
            <ReferenceField
              label="Lecture"
              source="id"
              reference="lecture"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="lectureOrder" />
            <DateField source="updatedAt" />
            <ShowButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <CreateLecture />
      </SimpleShowLayout>
    </Show>
  )
}

export default ChapterShow
