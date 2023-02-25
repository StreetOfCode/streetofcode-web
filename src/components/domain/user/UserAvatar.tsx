import {StaticImageData} from 'next/image'
import React from 'react'
import styled from 'styled-components'
import {createAvatarName} from '../../../utils'
import Avatar from '../../core/Avatar'
import Flex from '../../core/Flex'
import Text from '../../core/Text'

type Props = {
  className?: string
  src?: string | StaticImageData
  priority?: boolean
  name: string
  sizePx: number
  placeholder?: boolean
}

// If user has imageUrl then creates circle shaped avatar from image
// otherwise create circle shaped initials
const UserAvatar = ({
  className,
  src,
  priority,
  name,
  sizePx,
  placeholder,
}: Props) => {
  if (src) {
    return (
      <Avatar
        className={className}
        src={src}
        altName={name}
        sizePx={sizePx}
        priority={priority}
        placeholder={placeholder}
      />
    )
  } else {
    return (
      <InitialsAvatar
        className={className}
        alignItems="center"
        justifyContent="center"
        sizePx={sizePx}
      >
        <Text>{createAvatarName(name)}</Text>
      </InitialsAvatar>
    )
  }
}

const InitialsAvatar = styled(Flex)<{sizePx: number}>`
  width: ${(props) => `${props.sizePx}px`};
  height: ${(props) => `${props.sizePx}px`};
  border-radius: 50%;
  border: 2px solid var(--color-secondary); // TODO this is probably not working
  margin: 0 auto;
`

export default UserAvatar
