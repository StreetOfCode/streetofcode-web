import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Button, {Size} from '../../core/Button'

type Props = {
  className?: string
  tag: string
  handleOnClick?: (tag: string) => void
  selected?: boolean
  size?: Size
} & HTMLAttributes<HTMLElement>

const Tag = ({
  className,
  selected,
  handleOnClick,
  tag,
  size,
  ...props
}: Props) => {
  return (
    <TagButton
      className={className}
      onClick={(e: React.MouseEvent) => {
        if (handleOnClick) {
          e.stopPropagation()
          e.preventDefault()

          handleOnClick(tag)
        }
      }}
      selected={selected}
      noWrap
      size={size}
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
