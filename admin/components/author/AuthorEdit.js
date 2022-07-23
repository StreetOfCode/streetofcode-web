import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput} from 'react-admin'

const AuthorEdit = (props) => {
  return (
    <Edit undoable={false} title="Edit a author" {...props}>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="slug" />
        <TextInput source="description" />
        <TextInput required source="imageUrl" />
        <TextInput required source="coursesTitle" />
        <TextInput required source="email" />
      </SimpleForm>
    </Edit>
  )
}

export default AuthorEdit
