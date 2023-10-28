import React, {ChangeEvent, HTMLAttributes, useRef} from 'react'
import MuiTextField from '@mui/material/TextField'
import styled from 'styled-components'
import Flex from './Flex'

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
  maxRows?: number
  disableMultiline?: boolean
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
  maxRows,
  disableMultiline,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLDivElement>()

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      gap="4px"
      alignSelf="stretch"
    >
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
          multiline={!disableMultiline}
          minRows={1}
          maxRows={maxRows || 6}
          fullWidth
          disabled={disabled}
          inputProps={{
            maxLength,
          }}
          helperText={maxLength && `${text.length}/${maxLength}`}
          spellCheck={false}
        />
      </InputBox>
      {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
    </Flex>
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

const StyledTextField = styled(MuiTextField)<{
  disabled?: boolean
  multiline?: boolean
}>`
  .MuiInputBase-root {
    padding: 0;
    font-family: soleil, sans-serif;
    color: var(--color-secondary);
    margin: 4px 0;

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }

  .MuiInputBase-input {
    padding: ${(props) => !props.multiline && '0'};
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
`

export default TextField
