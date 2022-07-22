import React from 'react'
import styled from 'styled-components'
import '@uiw/react-md-editor/markdown-editor.css'
import dynamic from 'next/dynamic'
import {useController} from 'react-hook-form'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  {ssr: false},
)


export const MarkdownInput = ({source}) => {
  const {
    field: {onChange, value},
  } = useController({
    name: source,
  })

  return (<div>
    <span>{source}</span>
    <StyledMDEditor height={500} value={value} onChange={onChange} />
  </div>)
}

const StyledMDEditor = styled(MDEditor)`
  width: 1200px;
  margin: 12px 0 24px 0;
`
