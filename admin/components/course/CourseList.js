import React from 'react'
import {
  Datagrid,
  DateField,
  List,
  ReferenceField,
  EditButton,
  ShowButton,
  TextField,
  DeleteWithConfirmButton,
} from 'react-admin'

const CourseList = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField
          label="Course"
          source="id"
          reference="course"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="slug" />
        <TextField source="status" />
        <TextField source="shortDescription" />
        <ReferenceField label="Author" source="author.id" reference="author">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          label="Difficulty"
          source="difficulty.id"
          reference="difficulty"
        >
          <TextField source="name" />
        </ReferenceField>
        <DateField source="updatedAt" />
        <DeleteWithConfirmButton />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  )
}

export default CourseList
