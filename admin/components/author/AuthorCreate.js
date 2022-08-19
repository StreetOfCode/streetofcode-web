import React from 'react'
import {Create, SimpleForm, TextInput} from 'react-admin'

const AuthorCreate = () => {
  return (
    <Create title="Create a author">
      <SimpleForm>
        <TextInput required source="name" />
        <TextInput required source="slug" />
        <TextInput required source="description" />
        <TextInput required source="imageUrl" />
        <TextInput required source="coursesTitle" />
        <TextInput required source="email" />
      </SimpleForm>
    </Create>
  )
}

export default AuthorCreate
