import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  altName: string
  src: string
  sizePx?: number
} & HTMLAttributes<HTMLElement>

/***
 * Avatar is circle shaped image
 */
const Avatar = ({className, altName, src, sizePx, ...props}: Props) => {
  return (
    <StyledAvatar
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      alt={altName}
      src={src}
      sizePx={sizePx}
      {...props}
    />
  )
}

const StyledAvatar = styled.img<{sizePx?: number}>`
  border-radius: 50%;
  aspect-ratio: 1;
  width: ${(props) => `${props.sizePx}px`};
`

export default Avatar
