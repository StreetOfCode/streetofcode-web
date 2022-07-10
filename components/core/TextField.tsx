import React, {ChangeEvent, HTMLAttributes} from 'react'
import {TextField as MuiTextField} from '@material-ui/core'

import styled from 'styled-components'

type Props = {
  className?: string
  text: string
  onTextChanged: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  maxLength?: number
  itemBefore?: React.ReactNode
  errorText?: string
} & HTMLAttributes<HTMLElement>

const TextField = ({
  className,
  text,
  onTextChanged,
  label,
  maxLength,
  itemBefore,
  errorText,
  ...props}: Props,
) => {
  return (
    <InputBox className={className} {...props}>
      {itemBefore}
      <StyledTextField
        placeholder={label}
        value={text}
        onChange={onTextChanged}
        multiline
        minRows={1}
        maxRows={6}
        fullWidth
        inputProps={{
          maxLength,
        }}
        helperText={maxLength && `${text.length}/${maxLength}`}
        spellCheck={false}
      />
      {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
    </InputBox>
  )
}

const InputBox = styled.div`
  width: 100%;
  padding: 12px;
  padding-bottom: 4px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.accentColor};
`

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.dangerColor};
  font-size: 14px;
`

const StyledTextField = styled(MuiTextField)`

  .MuiFormHelperText-root {
    color: #545454;
    text-align: right;
  }

  .MuiInput-underline::before {
    all: unset;
  }

  .MuiInput-underline::after {
    all: unset;
  }

  .MuiInputBase-input {
    color: ${(props) => props.theme.secondaryColor};
  }
`

export default TextField
