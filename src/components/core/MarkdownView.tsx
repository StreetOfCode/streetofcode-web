import React, {HTMLAttributes} from 'react'
import ReactMarkdown from 'react-markdown'
import {SpecialComponents} from 'react-markdown/lib/ast-to-react'
import {NormalComponents} from 'react-markdown/lib/complex-types'
import styled from 'styled-components'
import Heading from './Heading'
import Text from './Text'

type Props = {
  children: string
  className?: string
  customComponents?:
    | Partial<
        Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
      >
    | undefined
} & HTMLAttributes<HTMLElement>

const MarkdownView = ({
  children,
  customComponents,
  className,
  ...props
}: Props) => {
  return (
    <StyledMarkdown
      className={className}
      children={children}
      linkTarget="_blank"
      components={{
        ...{
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
          code: ({children}) => <Code children={children} />,
          pre: ({children}) => <Pre children={children} />,
        },
        ...customComponents,
      }}
      {...props}
    />
  )
}

const Pre = styled.pre`
  margin: 0;
  padding: 0;
  max-width: 100%;
`

const Code = styled.code`
  max-width: 100%;
  color: ${(props) => props.theme.secondaryColor};
  display: inline-block;
  overflow: scroll;
  vertical-align: middle;
  padding-bottom: 16px;
`

const StyledHeading = styled(Heading)<{marginBottomPx?: number}>`
  margin-bottom: ${(props) =>
    props.marginBottomPx && `${props.marginBottomPx}px`};
`

const StyledMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;

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
