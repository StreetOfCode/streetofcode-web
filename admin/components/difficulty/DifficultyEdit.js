import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput} from 'react-admin'

const DifficultyEdit = (props) => {
  return (
    <Edit undoable={false} title="Edit a difficulty" {...props}>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput source="name" />
        <NumberInput source="skillLevel" />
      </SimpleForm>
    </Edit>
  )
}

export default DifficultyEdit
