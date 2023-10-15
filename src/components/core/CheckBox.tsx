import React, {HTMLAttributes} from 'react'
import {MdCheckBoxOutlineBlank, MdCheckBox} from 'react-icons/md'
import styled from 'styled-components'
import Flex, {AlignItems} from './Flex'
import Text from './Text'
import {assert} from '../../utils'

type Props = {
  className?: string
  label?: string
  labelComponent?: React.ReactNode
  labelColor?: string
  checked: boolean
  disabled?: boolean
  onToggle?: (newValue: boolean) => void
  checkedColor?: string
  size?: string
  alignSelf?: AlignItems
} & HTMLAttributes<HTMLElement>

const CheckBox = ({
  className,
  checkedColor,
  disabled,
  size,
  checked,
  label,
  labelComponent,
  labelColor,
  onToggle,
  alignSelf,
  ...props
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled || !onToggle) {
      e.preventDefault()
      return
    }

    e.preventDefault()
    e.stopPropagation()
    onToggle(!checked)
  }

  if (label) {
    assert(
      !labelComponent,
      'Either label or labelComponent must be provided, not both.',
    )
  } else if (labelComponent) {
    assert(!label, 'Either label or labelComponent must be provided, not both.')
  }

  return (
    <WrapperFlex
      className={className}
      {...props}
      alignSelf={alignSelf || 'flex-start'}
      gap="8px"
      onClick={(e) => handleClick(e)}
      disabled={disabled}
    >
      {checked && (
        <CheckedIcon disabled={disabled} size={size} color={checkedColor} />
      )}
      {!checked && (
        <UncheckedIcon disabled={disabled} size={size} color={checkedColor} />
      )}
      {label && <Label labelColor={labelColor}>{label}</Label>}
      {labelComponent}
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)<{disabled?: boolean}>`
  ${(props) =>
    !props.disabled
      ? `
  &:hover {
    cursor: pointer;
  }`
      : ''}

  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`

const iconStyle = (props: {
  disabled?: boolean
  size?: string
  color?: string
}) => `
  width: ${props.size || '18px'};
  aspect-ratio: 1;
  flex-shrink: 0;
  color: ${props.color || 'var(--color-secondary)'};
  ${
    !props.disabled
      ? `
  :hover {
    cursor: pointer;
  }`
      : ''
  }
`

const CheckedIcon = styled(MdCheckBox)<{
  disabled?: boolean
  size?: string
  color?: string
}>`
  ${(props) => iconStyle(props)}
  ${(props) => (props.color ? `color: ${props.color}` : '')}
`

const UncheckedIcon = styled(MdCheckBoxOutlineBlank)<{
  disabled?: boolean
  size?: string
}>`
  ${(props) => iconStyle(props)}
`

const Label = styled(Text)<{labelColor?: string}>`
  display: inline;
  color: ${(props) =>
    props.labelColor ? props.labelColor : 'var(--color-secondary)'};
`

export default CheckBox
