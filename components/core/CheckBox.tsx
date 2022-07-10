import React, {HTMLAttributes} from 'react'
import {MdCheckBoxOutlineBlank, MdCheckBox} from 'react-icons/md'
import styled, {css} from 'styled-components'
import Flex from './Flex'
import Text from './Text'

type Props = {
  className?: string
  label?: string
  checked: boolean
  onToggle: (newValue: boolean) => void
} & HTMLAttributes<HTMLElement>

const CheckBox = ({className, checked, label, onToggle, ...props}: Props) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggle(!checked)
  }

  return (
    <WrapperFlex className={className} {...props} alignSelf="flex-start" gap="8px" onClick={(e) => handleClick(e)}>
      {checked && <CheckedIcon />}
      {!checked && <UncheckedIcon />}
      {label && <Label>{label}</Label>}
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`

const iconStyle = css`
  width: 18px;
  height: 18px;
  color: ${(props) => props.theme.accentColor};
`

const CheckedIcon = styled(MdCheckBox)`
  ${iconStyle}
`

const UncheckedIcon = styled(MdCheckBoxOutlineBlank)`
  ${iconStyle}
`

const Label = styled(Text)`
  display: inline;
`

export default CheckBox
