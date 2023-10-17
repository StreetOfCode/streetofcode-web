import React from 'react'
import {
  BooleanInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  useRedirect,
} from 'react-admin'
import {MarkdownInput} from '../../custom/MarkdownInput'

const LectureCreate = () => {
  const redirect = useRedirect()

  const onSuccessHandler = (data) => {
    redirect('show', 'chapter', data.chapter.id)
  }

  return (
    <Create
      mutationOptions={{onSuccess: onSuccessHandler}}
      title="Create a lecture"
    >
      <SimpleForm>
        <NumberInput disabled source="chapterId" />
        <TextInput source="name" />
        <NumberInput source="lectureOrder" />
        <TextInput required={false} source="videoUrl" />
        <BooleanInput source="allowPreviewWhenPaid" defaultChecked={false} />
        <MarkdownInput source="content" />
      </SimpleForm>
    </Create>
  )
}

export default LectureCreate
