import React from 'react'
import {Edit, NumberInput, SimpleForm, TextInput} from 'react-admin'

const DifficultyEdit = () => {
  return (
    <Edit title="Edit a difficulty">
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput source="name" />
        <NumberInput source="skillLevel" />
      </SimpleForm>
    </Edit>
  )
}

export default DifficultyEdit
