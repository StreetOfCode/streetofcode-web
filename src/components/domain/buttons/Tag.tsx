import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Button from '../../core/Button'

type Props = {
  className?: string
  tag: string
  handleOnSelected: (tag: string) => void
  selected?: boolean
} & HTMLAttributes<HTMLElement>

const Tag = ({className, selected, handleOnSelected, tag, ...props}: Props) => {
  return (
    <TagButton
      className={className}
      onClick={() => handleOnSelected(tag)}
      selected={selected}
      noWrap
      {...props}
    >
      {tag}
    </TagButton>
  )
}

const TagButton = styled(Button)<{selected?: boolean}>`
  border-color: ${(props) => props.selected && 'var(--color-accent)'};
  color: ${(props) => props.selected && 'var(--color-accent)'};

  transition: 100ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 100ms ease-in-out;
  }
`

export default Tag
