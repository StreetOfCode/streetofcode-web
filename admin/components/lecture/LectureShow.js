import React from 'react'
import {
  DateField,
  NumberField,
  Link,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
  Button,
  Datagrid,
  ReferenceManyField,
  ShowButton,
  DeleteWithConfirmButton,
  EditButton,
} from 'react-admin'
import {MarkdownField} from '../../custom/MarkdownField'

const LectureShow = () => {

  const CreateQuiz = () => {
    const record = useRecordContext()
    if (!record) return null

    return (
      <Button
        component={Link}
        to={{
          pathname: '/quiz/create',
          search: `?source=${JSON.stringify({lectureId: record.id})}`,
        }}
      >Create new quiz
      </Button>
    )
  }

  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField label="Chapter" source="chapter.id" reference="chapter" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceManyField label="Quizzes" reference="quiz" target="lectureId">
          <Datagrid>
            <ReferenceField label="Quiz" source="id" reference="quiz" link="show">
              <TextField source="title" />
            </ReferenceField>
            <ShowButton />
            <DeleteWithConfirmButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <CreateQuiz />
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
