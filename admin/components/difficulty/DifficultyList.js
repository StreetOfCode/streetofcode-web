import React from 'react'
import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  ShowButton,
  TextField,
  NumberField,
} from 'react-admin'

const DifficultyList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <NumberField source="skillLevel" />
        <EditButton />
        <DeleteWithConfirmButton />
        <ShowButton />
      </Datagrid>
    </List>
  )
}

export default DifficultyList
