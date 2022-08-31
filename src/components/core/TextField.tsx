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
  borderColor?: Color
  inputBackgroundColor?: Color
} & HTMLAttributes<HTMLElement>

type Color = 'primary' | 'secondary' | 'accent'

const TextField = ({
  className,
  text,
  onTextChanged,
  label,
  maxLength,
  itemBefore,
  errorText,
  disabled,
  borderColor,
  inputBackgroundColor,
  ...props
}: Props) => {
  return (
    <InputBox
      className={className}
      itemBefore={itemBefore}
      borderColor={borderColor || 'accent'}
      inputBackgroundColor={inputBackgroundColor}
      {...props}
    >
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

const InputBox = styled.div<{
  itemBefore?: React.ReactNode
  borderColor: Color
  inputBackgroundColor?: Color
}>`
  width: 100%;
  padding: 12px;
  padding-top: ${(props) => (props.itemBefore ? '12px' : '4px')};
  padding-bottom: 4px;
  border-radius: 12px;

  border: ${(props) => {
    if (props.borderColor === 'primary') {
      return `1px solid ${props.theme.primaryColor}`
    } else if (props.borderColor === 'secondary') {
      return `1px solid ${props.theme.secondaryColor}`
    } else {
      return `1px solid ${props.theme.accentColor}`
    }
  }};

  background-color: ${(props) => {
    if (!props.inputBackgroundColor) {
      return 'unset'
    }

    if (props.inputBackgroundColor === 'primary') {
      return props.theme.primaryColor
    } else if (props.inputBackgroundColor === 'secondary') {
      return props.theme.secondaryColor
    } else {
      return props.theme.accentColor
    }
  }};
`

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.dangerColor};
  font-size: 14px;
`

const StyledTextField = styled(MuiTextField)<{disabled?: boolean}>`
  .MuiInputBase-input {
    font-family: soleil, sans-serif;
    color: ${(props) => props.theme.greyColor};
  }

  .MuiFormHelperText-root {
    font-family: soleil, sans-serif;
    color: ${(props) => props.theme.greyColor};
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
