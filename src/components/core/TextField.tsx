import React, {ChangeEvent, HTMLAttributes, useRef} from 'react'
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
  const inputRef = useRef<HTMLDivElement>()

  return (
    <InputBox
      className={className}
      itemBefore={itemBefore}
      borderColor={borderColor || 'accent'}
      inputBackgroundColor={inputBackgroundColor}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      {itemBefore}
      <StyledTextField
        placeholder={label}
        inputRef={inputRef}
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

  border: ${(props) => `1px solid var(--color-${props.borderColor})`};

  background-color: ${(props) => {
    if (!props.inputBackgroundColor) {
      return 'unset'
    }

    return `var(--color-${props.inputBackgroundColor})`
  }};
`

const ErrorMessage = styled.span`
  color: var(--color-danger);
  font-size: 14px;
`

const StyledTextField = styled(MuiTextField)<{disabled?: boolean}>`
  .MuiInputBase-input {
    font-family: soleil, sans-serif;
    color: var(--color-grey);
  }

  .MuiFormHelperText-root {
    font-family: soleil, sans-serif;
    color: var(--color-grey);
    text-align: right;
  }

  .MuiInput-underline::before {
    all: unset;
  }

  .MuiInput-underline::after {
    all: unset;
  }

  .MuiInputBase-input {
    color: var(--color-secondary);
  }
`

export default TextField
