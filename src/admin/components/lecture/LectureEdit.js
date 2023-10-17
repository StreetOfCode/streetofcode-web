import React from 'react'
import {
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  useRedirect,
} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const LectureEdit = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'chapter', data.chapter.id)
  }

  return (
    <Edit
      title="Edit a lecture"
      mutationMode="pessimistic"
      mutationOptions={{onSuccess: onSuccessHandler}}
    >
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput source="name" />
        <NumberInput source="lectureOrder" />
        <TextInput required={false} source="videoUrl" />
        <BooleanInput source="allowPreviewWhenPaid" defaultChecked={false} />
        <MarkdownInput source="content" />
      </SimpleForm>
    </Edit>
  )
}

export default LectureEdit
