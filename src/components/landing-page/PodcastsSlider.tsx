import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import Slider, {SliderTemplateProps} from '../Slider'
import {podcasts} from './podcasts'
import {device} from '../../theme/device'
import {Slide} from 'pure-react-carousel'

type Props = {
  className?: string
} & HTMLAttributes<HTMLElement>

const XL_SIZE_WIDTH = 300
const L_SIZE_WIDTH = 300
const M_SIZE_WIDTH = 260
const S_SIZE_WIDTH = 260
const WIDTH_BUFFER = 48
const HEIGHT_BUFFER = 64

const PodcastsSliderTemplate = ({
  className,
  displayItemsCount,
  slideWidth,
  slideHeight,
}: SliderTemplateProps) => {
  return (
    <Slider
      className={className}
      items={podcasts}
      showItemsCount={displayItemsCount}
      slideWidth={slideWidth}
      startAtMiddle
      slideHeight={slideHeight}
      itemLayout={(podcast, i) => {
        return (
          <StyledSlide index={i} key={i}>
            <Flex direction="column" gap="16px">
              <Heading variant="h3">{podcast.title}</Heading>
              <ImageWrapper href={podcast.podcastUrl}>
                <StyledImage
                  src={podcast.image}
                  alt={podcast.name}
                  layout="fill"
                  priority
                />
              </ImageWrapper>
            </Flex>
          </StyledSlide>
        )
      }}
    />
  )
}

const PodcastsSlider = ({className}: Props) => {
  return (
    <>
      <XLPodcastsSlider
        className={className}
        displayItemsCount={3}
        slideWidth={XL_SIZE_WIDTH + WIDTH_BUFFER * 1.5}
        slideHeight={XL_SIZE_WIDTH + HEIGHT_BUFFER * 1.5}
      />
      <LPodcastsSlider
        className={className}
        displayItemsCount={2}
        slideWidth={L_SIZE_WIDTH + WIDTH_BUFFER * 1.5}
        slideHeight={L_SIZE_WIDTH + HEIGHT_BUFFER * 1.5}
      />
      <MPodcastsSlider
        className={className}
        displayItemsCount={2}
        slideWidth={M_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={M_SIZE_WIDTH + HEIGHT_BUFFER}
      />
      <SPodcastsSlider
        className={className}
        displayItemsCount={1}
        slideWidth={S_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={S_SIZE_WIDTH + HEIGHT_BUFFER}
      />
    </>
  )
}

const XLPodcastsSlider = styled(PodcastsSliderTemplate)`
  @media ${device.XL} {
    display: block;
  }

  @media ${device.L} {
    display: none;
  }
`

const LPodcastsSlider = styled(PodcastsSliderTemplate)`
  display: none;

  @media ${device.L} {
    display: block;
  }

  @media ${device.M} {
    display: none;
  }
`

const MPodcastsSlider = styled(PodcastsSliderTemplate)`
  display: none;

  @media ${device.M} {
    display: block;
  }

  @media ${device.S} {
    display: none;
  }
`

const SPodcastsSlider = styled(PodcastsSliderTemplate)`
  display: none;

  @media ${device.S} {
    display: block;
  }
`

const StyledSlide = styled(Slide)`
  margin-top: 24px;
`

const ImageWrapper = styled.a`
  position: relative;
  border-radius: 22px;
  border: ${(props) => `2px solid ${props.theme.accentColor} !important`};

  width: ${XL_SIZE_WIDTH}px;
  aspect-ratio: 1;

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: ${(props) => `1px 8px 20px ${props.theme.shadowColor}`};
  }

  @media ${device.M} {
    width: ${M_SIZE_WIDTH}px;
  }

  @media ${device.S} {
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
