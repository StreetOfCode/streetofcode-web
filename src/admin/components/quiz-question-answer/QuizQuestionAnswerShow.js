import React from 'react'
import {
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
} from 'react-admin'
import {MarkdownField} from '../../custom/MarkdownField'

const QuizQuestionAnswerShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField
          label="Quiz Question"
          source="questionId"
          reference="quiz/question"
          link="show"
        >
          <TextField source="text" />
        </ReferenceField>
        <MarkdownField addLabel source="text" />
        <BooleanField source="isCorrect" />
      </SimpleShowLayout>
    </Show>
  )
}

export default QuizQuestionAnswerShow
