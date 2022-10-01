import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import Slider from '../Slider'
import {podcasts} from './podcasts'
import {device} from '../../theme/device'

type Props = {
  className?: string
  showPodcastsCount: number
} & HTMLAttributes<HTMLElement>

const PodcastsSlider = ({className, showPodcastsCount}: Props) => {
  return (
    <Slider
      className={className}
      items={podcasts}
      showItemsCount={showPodcastsCount}
      itemLayout={(podcast, i, visible) => {
        return (
          <FlexWrapper key={i} direction="column" gap="16px" visible={visible}>
            <Heading variant="h3">{podcast.title}</Heading>
            <ImageWrapper href={podcast.podcastUrl} target="blank">
              <StyledImage
                src={podcast.image}
                alt={podcast.name}
                layout="fill"
                priority
              />
            </ImageWrapper>
          </FlexWrapper>
        )
      }}
    />
  )
}

const FlexWrapper = styled(Flex)<{visible: boolean}>`
  // If display is set to none, then image is refetched in background and slider will be faster
  display: ${(props) => (props.visible ? 'flex' : 'none')};
`

const ImageWrapper = styled.a`
  position: relative;
  border-radius: 22px;
  border: ${(props) => `2px solid ${props.theme.accentColor} !important`};

  width: 300px;
  aspect-ratio: 1;

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #d6d6d6;
  }

  // special one-time only case
  @media (max-width: 1200px) {
    width: 260px;
  }

  @media ${device.mobile} {
    &:hover {
      transform: unset;
      transition: unset;
      box-shadow: unset;
    }
  }
`

const StyledImage = styled(Image)`
  border-radius: 20px;
`

export default PodcastsSlider
