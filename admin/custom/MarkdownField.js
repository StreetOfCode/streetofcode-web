import React from 'react'
import MarkdownView from '../../components/core/MarkdownView'
import {useRecordContext} from 'react-admin'

export const MarkdownField = ({source}) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <MarkdownView children={record[source]} />
  )

}
