import React, {ChangeEvent, HTMLAttributes} from 'react'
import MuiTextField from '@material-ui/core/TextField'

import styled from 'styled-components'

type Props = {
  className?: string
  text: string
  onTextChanged: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  maxLength?: number
  itemBefore?: React.ReactNode
  errorText?: string
  disabled?: boolean
} & HTMLAttributes<HTMLElement>

const TextField = ({
  className,
  text,
  onTextChanged,
  label,
  maxLength,
  itemBefore,
  errorText,
  disabled,
  ...props}: Props,
) => {
  return (
    <InputBox className={className} itemBefore={itemBefore} {...props}>
      {itemBefore}
      <StyledTextField
        placeholder={label}
        value={text}
        onChange={onTextChanged}
        multiline
        minRows={1}
        maxRows={6}
        fullWidth
        disabled={disabled}
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

const InputBox = styled.div<{itemBefore?: React.ReactNode}>`
  width: 100%;
  padding: 12px;
  padding-top: ${(props) => props.itemBefore ? '12px' : '4px'};
  padding-bottom: 4px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.accentColor};
`

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.dangerColor};
  font-size: 14px;
`

const StyledTextField = styled(MuiTextField)<{disabled?: boolean}>`

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
