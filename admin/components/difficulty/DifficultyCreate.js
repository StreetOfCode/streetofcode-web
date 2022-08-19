import React from 'react'
import {Create, SimpleForm, TextInput, NumberInput} from 'react-admin'

const DifficultyCreate = () => {
  return (
    <Create title="Create a difficulty">
      <SimpleForm redirect="list">
        <TextInput required source="name" />
        <NumberInput required source="skillLevel" />
      </SimpleForm>
    </Create>
  )
}

export default DifficultyCreate
