import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
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
    <Slider className={className} items={podcasts} showItemsCount={showPodcastsCount} itemLayout={(podcast, i) => {
      return (
        <Flex key={i} direction="column" gap="16px">
          <Heading variant="h3">{podcast.title}</Heading>
          <a href={podcast.podcastUrl} target="blank">
            <PodcastImage src={podcast.imageUrl} alt={podcast.name} />
          </a>
        </Flex>
      )
    }}
    />
  )
}

const PodcastImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 22px;
  border: ${(props) => `4px solid ${props.theme.accentColor}`};
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
  }
`


export default PodcastsSlider
