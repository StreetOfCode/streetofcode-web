import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import {device} from '../../theme/device'
import {videos} from './videos'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import {Slide} from 'pure-react-carousel'
import Slider, {SliderTemplateProps} from '../Slider'

type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const XL_SIZE_WIDTH = 448
const L_SIZE_WIDTH = 400
const M_SIZE_WIDTH = 360
const S_SIZE_WIDTH = 300
const XS_SIZE_WIDTH = 260
const WIDTH_BUFFER = 48
const HEIGHT_BUFFER = 64

const VideoSliderTemplate: React.FC<SliderTemplateProps> = ({
  displayItemsCount,
  slideWidth,
  slideHeight,
  className,
}) => {
  return (
    <Slider
      className={className}
      items={videos}
      showItemsCount={displayItemsCount}
      slideWidth={slideWidth}
      slideHeight={slideHeight}
      startAtMiddle
      itemLayout={(video, i) => {
        return (
          <StyledSlide index={i} key={i}>
            <Flex direction="column" gap="16px" justifyContent="center">
              <ImageWrapper href={video.youtubeUrl} target="blank">
                <StyledImage
                  src={video.image}
                  alt={video.name}
                  layout="fill"
                  priority
                />
              </ImageWrapper>
              <Heading variant="h5" maxWidth="430px" align="center">
                {video.name}
              </Heading>
            </Flex>
          </StyledSlide>
        )
      }}
    />
  )
}

const VideosSlider = ({className}: Props) => {
  return (
    <>
      <XLVideoSlider
        className={className}
        displayItemsCount={2}
        slideWidth={XL_SIZE_WIDTH + WIDTH_BUFFER * 1.5}
        slideHeight={XL_SIZE_WIDTH * (9 / 16) + HEIGHT_BUFFER * 1.5}
      />
      <LVideoSlider
        className={className}
        displayItemsCount={2}
        slideWidth={L_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={L_SIZE_WIDTH * (9 / 16) + HEIGHT_BUFFER}
      />
      <MVideoSlider
        className={className}
        displayItemsCount={1}
        slideWidth={M_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={M_SIZE_WIDTH * (9 / 16) + HEIGHT_BUFFER}
      />
      <SVideoSlider
        className={className}
        displayItemsCount={1}
        slideWidth={S_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={S_SIZE_WIDTH * (9 / 16) + HEIGHT_BUFFER}
      />
      <XSVideoSlider
        className={className}
        displayItemsCount={1}
        slideWidth={XS_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={XS_SIZE_WIDTH * (9 / 16) + HEIGHT_BUFFER}
      />
    </>
  )
}

const XLVideoSlider = styled(VideoSliderTemplate)`
  @media ${device.XL} {
    display: block;
  }

  @media ${device.L} {
    display: none;
  }
`

const LVideoSlider = styled(VideoSliderTemplate)`
  display: none;

  @media ${device.L} {
    display: block;
  }

  @media ${device.M} {
    display: none;
  }
`

const MVideoSlider = styled(VideoSliderTemplate)`
  display: none;

  @media ${device.M} {
    display: block;
  }

  @media ${device.S} {
    display: none;
  }
`

const SVideoSlider = styled(VideoSliderTemplate)`
  display: none;

  @media ${device.S} {
    display: block;
  }

  @media ${device.XS} {
    display: none;
  }
`

const XSVideoSlider = styled(VideoSliderTemplate)`
  display: none;

  @media ${device.XS} {
    display: block;
  }
`

const StyledSlide = styled(Slide)`
  margin-top: 24px;
  margin-bottom: 8px;
`
const ImageWrapper = styled.a`
  position: relative;
  border-radius: 22px;
  border: 2px solid var(--color-accent) !important;

  width: ${XL_SIZE_WIDTH}px;
  aspect-ratio: 16 / 9;

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px var(--color-shadow);
  }

  @media ${device.L} {
    width: ${L_SIZE_WIDTH}px;
  }

  @media ${device.M} {
    width: ${M_SIZE_WIDTH}px;
  }

  @media ${device.S} {
    width: ${S_SIZE_WIDTH}px;

    &:hover {
      transform: unset;
      transition: unset;
      box-shadow: unset;
    }
  }

  @media ${device.XS} {
    width: ${XS_SIZE_WIDTH}px;

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

export default VideosSlider
