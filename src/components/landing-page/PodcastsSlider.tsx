import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import Slider from '../Slider'
import {podcasts} from './podcasts'

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
      itemLayout={(podcast, i) => {
        return (
          <Flex key={i} direction="column" gap="16px">
            <Heading variant="h3">{podcast.title}</Heading>
            <ImageWrapper href={podcast.podcastUrl} target="blank">
              <StyledImage
                src={podcast.imageUrl}
                alt={podcast.name}
                layout="fill"
                priority
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

  width: 300px;
  aspect-ratio: 1;
  }
`

const StyledImage = styled(Image)`
  border-radius: 20px;
`

export default PodcastsSlider
