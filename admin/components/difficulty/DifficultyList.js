import React from 'react'
import {Datagrid, DeleteWithConfirmButton, EditButton, List, ShowButton, TextField, NumberField} from 'react-admin'

const DifficultyList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <NumberField source="skillLevel" />
        <EditButton basePath="difficulty" />
        <DeleteWithConfirmButton basePath="difficulty" />
        <ShowButton basePath="difficulty" />
      </Datagrid>
    </List>
  )
}

export default DifficultyList
