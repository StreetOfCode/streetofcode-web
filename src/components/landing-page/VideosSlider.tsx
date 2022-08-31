import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {device} from '../../theme/device'
import Slider from '../Slider'
import {videos} from './videos'
import Flex from '../core/Flex'
import Heading from '../core/Heading'

type Props = {
  className?: string
  showVideosCount: number
} & HTMLAttributes<HTMLElement>

const VideosSlider = ({className, showVideosCount}: Props) => {
  return (
    <Slider
      className={className}
      items={videos}
      showItemsCount={showVideosCount}
      itemLayout={(video, i) => {
        return (
          <Flex key={i} direction="column" gap="16px">
            <Heading variant="h4" maxWidth="430px" align="center">
              {video.name}
            </Heading>
            <ImageWrapper href={video.youtubeUrl} target="blank">
              <StyledImage
                src={video.imageUrl}
                alt={video.name}
                layout="fill"
              />
            </ImageWrapper>
          </Flex>
        )
      }}
    />
  )
}

const ImageWrapper = styled.a`
  position: relative;
  border-radius: 22px;
  border: ${(props) => `2px solid ${props.theme.accentColor} !important`};

  width: 448px;
  aspect-ratio: 16 / 9;

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #d6d6d6;
  }

  @media ${device.mobile} {
    width: 300px;

    &:hover {
      transform: unset;
      transition: unset;
      box-shadow: unset;
    }
  }
`

const StyledImage = styled(Image)`
  border-radius: 22px;
`

export default VideosSlider
