import React from 'react'
import styled from 'styled-components'
import {createAvatarName} from '../../../utils'
import Avatar from '../../core/Avatar'
import Flex from '../../core/Flex'

type Props = {
  className?: string
  imageUrl?: string
  priority?: boolean
  name: string
  sizePx: number
}

// If user has imageUrl then creates circle shaped avatar from image
// otherwise create circle shaped initials
const UserAvatar = ({className, imageUrl, priority, name, sizePx}: Props) => {
  if (imageUrl) {
    return (
      <Avatar
        className={className}
        src={imageUrl}
        altName={name}
        sizePx={sizePx}
        priority={priority}
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
        {createAvatarName(name)}
      </InitialsAvatar>
    )
  }
}

const InitialsAvatar = styled(Flex)<{sizePx: number}>`
  width: ${(props) => `${props.sizePx}px`};
  height: ${(props) => `${props.sizePx}px`};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.secondaryColor}; // TODO this is probably not working
  margin: 0 auto;
`

export default UserAvatar
