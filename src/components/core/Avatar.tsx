import React from 'react'
import Image, {StaticImageData} from 'next/image'
import styled from 'styled-components'

type Props = {
  className?: string
  priority?: boolean
  altName: string
  src: string | StaticImageData
  sizePx: number
  placeholder?: boolean
}

/***
 * Avatar is circle shaped image
 */
const Avatar = ({className, altName, src, sizePx, placeholder}: Props) => {
  return (
    <StyledAvatar
      className={className}
      loading="eager"
      priority
      alt={altName}
      src={src}
      width={sizePx}
      height={sizePx}
      placeholder={placeholder ? 'blur' : undefined}
    />
  )
}

const StyledAvatar = styled(Image)`
  border-radius: 50%;
`

export default Avatar
