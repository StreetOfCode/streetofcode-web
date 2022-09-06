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
        h1: ({children}) => (
          <StyledHeading
            variant="h1"
            normalWeight
            children={children}
            marginBottomPx={12}
          />
        ),
        h2: ({children}) => (
          <StyledHeading
            variant="h2"
            normalWeight
            children={children}
            marginBottomPx={8}
          />
        ),
        h3: ({children}) => (
          <StyledHeading
            variant="h3"
            normalWeight
            children={children}
            marginBottomPx={4}
          />
        ),
        p: ({children}) => <Text children={children} />,
      }}
      {...props}
    />
  )
}

const StyledHeading = styled(Heading)<{marginBottomPx?: number}>`
  margin-bottom: ${(props) =>
    props.marginBottomPx && `${props.marginBottomPx}px`};
`

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
