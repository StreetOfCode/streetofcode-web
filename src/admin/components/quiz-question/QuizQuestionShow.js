import React from 'react'
import {
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
  ShowButton,
  DeleteWithConfirmButton,
  EditButton,
  useRecordContext,
  Button,
  Link,
  BooleanField,
} from 'react-admin'
import {MarkdownField} from '../../custom/MarkdownField'

const QuizQuestionShow = () => {
  const CreateQuizQuestionAnswer = () => {
    const record = useRecordContext()
    if (!record) return null

    return (
      <Button
        component={Link}
        to={{
          pathname: '/quiz/question/answer/create',
          search: `?source=${JSON.stringify({quizQuestionId: record.id})}`,
        }}
      >
        Create new quiz question answer
      </Button>
    )
  }

  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField
          label="Quiz"
          source="quiz.id"
          reference="quiz"
          link="show"
        >
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="questionOrder" />
        <MarkdownField addLabel source="text" />
        <TextField source="type" />
        <ReferenceManyField
          label="Quiz question answers"
          reference="quiz/question/answer"
          target="quizQuestionId"
        >
          <Datagrid>
            <ReferenceField
              label="Quiz question answer"
              source="id"
              reference="quiz/question/answer"
              link="show"
            >
              <TextField source="text" />
            </ReferenceField>
            <ReferenceField
              label="Correctness"
              source="id"
              reference="quiz/question/answer"
              link="show"
            >
              <BooleanField source="isCorrect" />
            </ReferenceField>
            <ShowButton />
            <EditButton />
            <DeleteWithConfirmButton />
          </Datagrid>
        </ReferenceManyField>
        <CreateQuizQuestionAnswer />
      </SimpleShowLayout>
    </Show>
  )
}

export default QuizQuestionShow
