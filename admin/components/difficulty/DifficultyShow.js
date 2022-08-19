import React from 'react'
import {NumberField, Show, SimpleShowLayout, TextField} from 'react-admin'

const DifficultyShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="name" />
        <NumberField source="skillLevel" />
      </SimpleShowLayout>
    </Show>
  )
}

export default DifficultyShow
