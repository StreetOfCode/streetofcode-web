import React from 'react'
import {NumberField, ReferenceField, Show, SimpleShowLayout, TextField, BooleanField} from 'react-admin'

const QuizQuestionAnswerShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField label="Quiz Question" source="quizQuestion.id" reference="quiz/question" link="show">
          <TextField source="text" />
        </ReferenceField>
        <TextField source="text" />
        <BooleanField source="isCorrect" />
      </SimpleShowLayout>
    </Show>
  )
}

export default QuizQuestionAnswerShow
