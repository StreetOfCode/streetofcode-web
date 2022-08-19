import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput} from 'react-admin'

const AuthorEdit = () => {
  return (
    <Edit title="Edit a author">
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
