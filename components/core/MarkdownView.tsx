import React, {HTMLAttributes} from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Heading from './Heading'
import Text from './Text'

type Props = {
  children: string
  className?: string
} & HTMLAttributes<HTMLElement>

const MarkdownView = ({children, className, ...props}: Props) => {
  return (
    <StyledMarkdown
      className={className}
      children={children}
      linkTarget="_blank"
      components={{
        h1: ({children}) => <Heading variant="h1" normalWeight children={children} />,
        h2: ({children}) => <Heading variant="h2" normalWeight children={children} />,
        h3: ({children}) => <Heading variant="h3" normalWeight children={children} />,
        p: ({children}) => <Text children={children} />,
      }}
      {...props}
    />
  )
}

const StyledMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ul {
    margin: 0;
    list-style-type: '- ';

    li {
      margin-bottom: 8px;
      font-size: 16px;

      :last-child {
        margin-bottom: 0;
      }
    }
  }
`

export default MarkdownView
