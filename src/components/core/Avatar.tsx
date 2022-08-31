import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

type Props = {
  className?: string
  altName: string
  src: string
  sizePx: number
}

/***
 * Avatar is circle shaped image
 */
const Avatar = ({className, altName, src, sizePx}: Props) => {
  return (
    <StyledAvatar
      className={className}
      alt={altName}
      src={src}
      width={sizePx}
      height={sizePx}
    />
  )
}

const StyledAvatar = styled(Image)`
  border-radius: 50%;
`

export default Avatar