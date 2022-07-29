import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Flex from '../core/Flex'
import Slider from '../Slider'
import {videos} from './videos'

type Props = {
  className?: string
  showVideosCount: number
} & HTMLAttributes<HTMLElement>

const VideosSlider = ({className, showVideosCount}: Props) => {
  return (
    <Slider className={className} items={videos} showItemsCount={showVideosCount} itemLayout={(video, i) => {
      return (
        <Flex key={i} direction="column" gap="16px">
          <a href={video.youtubeUrl} target="blank">
            <VideoImage src={video.imageUrl} alt={video.name} />
          </a>
        </Flex>
      )
    }}
    />
  )
}

const VideoImage = styled.img`
  width: 448px;
  height: 252px;
  border-radius: 22px;
  border: ${(props) => `4px solid ${props.theme.accentColor}`};
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
  }
`


export default VideosSlider
