import React from 'react'
import {
  Edit,
  NumberInput,
  SimpleForm,
  useRedirect,
  BooleanInput,
} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const QuizQuestionAnswerEdit = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'quiz/question', data.questionId)
  }

  const transform = (data) => ({
    id: data.id,
    questionId: data.questionId,
    text: data.text,
    isCorrect: data.isCorrect,
  })

  return (
    <Edit
      transform={transform}
      mutationMode="pessimistic"
      mutationOptions={{onSuccess: onSuccessHandler}}
      title="Edit a quiz question answer"
    >
      <SimpleForm>
        <NumberInput disabled source="id" />
        <NumberInput disabled source="questionId" />
        <MarkdownInput required source="text" />
        <BooleanInput label="Is correct" source="isCorrect" />
      </SimpleForm>
    </Edit>
  )
}

export default QuizQuestionAnswerEdit
