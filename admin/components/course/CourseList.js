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

const CourseList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <ReferenceField label="Course" source="id" reference="course" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="status" />
        <TextField source="shortDescription" />
        <ReferenceField label="Author" source="author.id" reference="author">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Difficulty" source="difficulty.id" reference="difficulty">
          <TextField source="name" />
        </ReferenceField>
        <DateField source="updatedAt" />
        <DeleteWithConfirmButton basePath="course" />
        <EditButton basePath="course" />
        <ShowButton basePath="course" />
      </Datagrid>
    </List>
  )
}

export default CourseList
