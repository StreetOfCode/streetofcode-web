import React from 'react'
import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  ShowButton,
  TextField,
} from 'react-admin'

const AuthorList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <TextField source="slug" />
        <TextField source="description" />
        <TextField source="imageUrl" />
        <TextField source="coursesTitle" />
        <TextField source="email" />
        <EditButton />
        <DeleteWithConfirmButton />
        <ShowButton />
      </Datagrid>
    </List>
  )
}

export default AuthorList
