import React from 'react'
import {Datagrid, DeleteWithConfirmButton, EditButton, List, ShowButton, TextField} from 'react-admin'

const AuthorList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="slug" />
        <TextField source="description" />
        <TextField source="imageUrl" />
        <TextField source="coursesTitle" />
        <TextField source="email" />
        <EditButton basePath="author" />
        <DeleteWithConfirmButton basePath="author" />
        <ShowButton basePath="author" />
      </Datagrid>
    </List>
  )
}

export default AuthorList
