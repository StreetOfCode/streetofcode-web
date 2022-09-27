import React from 'react'
import {
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
  EditButton,
  ShowButton,
  DeleteWithConfirmButton,
  useRecordContext,
  Button,
  Link,
} from 'react-admin'

const QuizShow = () => {
  const CreateQuizQuestion = () => {
    const record = useRecordContext()
    if (!record) return null

    return (
      <Button
        component={Link}
        to={{
          pathname: '/quiz/question/create',
          search: `?source=${JSON.stringify({quizId: record.id})}`,
        }}
      >
        Create new quiz question
      </Button>
    )
  }

  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField
          label="Lecture"
          source="lectureId"
          reference="lecture"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="subtitle" />
        <TextField source="finishedMessage" />
        <ReferenceManyField
          label="Quiz questions"
          reference="quiz/question"
          target="quizId"
        >
          <Datagrid>
            <ReferenceField
              label="Quiz question"
              source="id"
              reference="quiz/question"
              link="show"
            >
              <TextField source="text" />
            </ReferenceField>
            <NumberField source="questionOrder" />
            <ShowButton />
            <DeleteWithConfirmButton />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
        <CreateQuizQuestion />
      </SimpleShowLayout>
    </Show>
  )
}

export default QuizShow
