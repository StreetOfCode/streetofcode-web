import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {createAvatarName} from '../../../utils'
import Avatar from '../../core/Avatar'
import Flex from '../../core/Flex'

type Props = {
  imageUrl?: string
  name: string
  sizePx: number
} & HTMLAttributes<HTMLElement>

// If user has imageUrl then creates circle shaped avatar from image
// otherwise create circle shaped initials
const UserAvatar = ({imageUrl, name, sizePx, ...props}: Props) => {
  if (imageUrl) {
    return <Avatar src={imageUrl} altName={name} sizePx={sizePx} {...props} />
  } else {
    return (<InitialsAvatar alignItems="center" justifyContent="center" sizePx={sizePx} {...props}>
      {createAvatarName(name)}
    </InitialsAvatar>)
  }
}

const InitialsAvatar = styled(Flex)<{sizePx: number}>`
  width: ${(props) => `${props.sizePx}px`};
  height:${(props) => `${props.sizePx}px`};
  border-radius: 50%;
  border: 2px solid black;
  margin: 0 auto;
`

export default UserAvatar
