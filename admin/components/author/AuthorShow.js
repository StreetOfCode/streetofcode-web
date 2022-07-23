import React from 'react'
import {NumberField, Show, SimpleShowLayout, TextField} from 'react-admin'

const AuthorShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />
        <TextField source="slug" />
        <TextField source="description" />
        <TextField source="imageUrl" />
        <TextField source="coursesTitle" />
        <TextField source="email" />
      </SimpleShowLayout>
    </Show>
  )
}

export default AuthorShow
