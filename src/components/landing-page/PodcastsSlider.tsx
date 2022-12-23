import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import Slider, {SliderTemplateProps} from '../Slider'
import {device} from '../../theme/device'
import {Slide} from 'pure-react-carousel'
import {useGetAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import {useAuth} from '../../AuthUserContext'
import {QueryGuard} from '../../QueryGuard'
import {
  CATEGORY_NAME,
  COUNT_IN_SLIDER,
} from '../domain/post/podcast/podcast-constants'

type Props = {
  className?: string
  podcasts: Post[]
} & HTMLAttributes<HTMLElement>

const XL_SIZE_WIDTH = 300
const L_SIZE_WIDTH = 300
const M_SIZE_WIDTH = 260
const S_SIZE_WIDTH = 260
const WIDTH_BUFFER = 48
const HEIGHT_BUFFER = 64

const PodcastSliderWrapper = ({className, podcasts}: Props) => {
  const {user} = useAuth()
  const getPodcastsQuery = useGetAllPosts(CATEGORY_NAME, COUNT_IN_SLIDER)

  if (user) {
    return (
      <QueryGuard {...getPodcastsQuery}>
        {(_podcasts) => {
          return <PodcastsSlider className={className} podcasts={_podcasts} />
        }}
      </QueryGuard>
    )
  } else {
    return <PodcastsSlider className={className} podcasts={podcasts} />
  }
}

const PodcastsSliderTemplate = ({
  className,
  displayItemsCount,
  slideWidth,
  slideHeight,
  podcasts,
}: SliderTemplateProps & Props) => {
  return (
    <Slider
      className={className}
      items={podcasts}
      showItemsCount={displayItemsCount}
      slideWidth={slideWidth}
      slideHeight={slideHeight}
      itemLayout={(post, i) => {
        return (
          <StyledSlide index={i} key={i}>
            <Flex direction="column" gap="16px">
              <Heading variant="h3">{post.title?.split('–')[0]}</Heading>
              <ImageWrapper href={`podcast/${post.slug || ''}`}>
                <StyledImage
                  src={post.featuredImage?.node?.sourceUrl || ''}
                  alt={post.title || ''}
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

const PodcastsSlider = ({className, podcasts}: Props) => {
  return (
    <>
      <XLPodcastsSlider
        className={className}
        podcasts={podcasts}
        displayItemsCount={3}
        slideWidth={XL_SIZE_WIDTH + WIDTH_BUFFER * 1.5}
        slideHeight={XL_SIZE_WIDTH + HEIGHT_BUFFER * 1.5}
      />
      <LPodcastsSlider
        className={className}
        podcasts={podcasts}
        displayItemsCount={2}
        slideWidth={L_SIZE_WIDTH + WIDTH_BUFFER * 1.5}
        slideHeight={L_SIZE_WIDTH + HEIGHT_BUFFER * 1.5}
      />
      <MPodcastsSlider
        className={className}
        podcasts={podcasts}
        displayItemsCount={2}
        slideWidth={M_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={M_SIZE_WIDTH + HEIGHT_BUFFER}
      />
      <SPodcastsSlider
        className={className}
        podcasts={podcasts}
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
  border: 2px solid var(--color-accent) !important;

  width: ${XL_SIZE_WIDTH}px;
  aspect-ratio: 1;

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px var(--color-shadow);
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

export default PodcastSliderWrapper
