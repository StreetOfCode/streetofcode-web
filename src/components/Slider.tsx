import React from 'react'
import styled, {css} from 'styled-components'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import {device} from '../theme/device'
import {
  CarouselProvider,
  Slider as PureSlider,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import Flex from './core/Flex'

export type SliderTemplateProps = {
  className?: string
  displayItemsCount: number
  slideWidth: number
  slideHeight: number
}

type Props<T> = {
  className?: string
  items: T[]
  showItemsCount: number
  slideWidth: number
  slideHeight: number
  startAtMiddle?: boolean
  itemLayout: (item: T, index: number) => React.ReactElement
}

const Slider = <T,>({
  className,
  items,
  itemLayout,
  showItemsCount,
  slideWidth,
  slideHeight,
  startAtMiddle,
}: Props<T>) => {
  return (
    <StyledCarouselProvider
      className={className}
      currentSlide={startAtMiddle ? Math.floor(items.length / 2) : 0} // start at the middle
      visibleSlides={showItemsCount}
      totalSlides={items.length}
      naturalSlideWidth={slideWidth}
      naturalSlideHeight={slideHeight}
      lockOnWindowScroll
    >
      <PureSlider>{items.map((item, i) => itemLayout(item, i))}</PureSlider>
      <ButtonFlexWrapper gap="12px" justifyContent="center">
        <StyledButtonBack>
          <IconLeft />
        </StyledButtonBack>
        <StyledButtonNext>
          <IconRight />
        </StyledButtonNext>
      </ButtonFlexWrapper>
    </StyledCarouselProvider>
  )
}

const StyledCarouselProvider = styled(CarouselProvider)<{
  naturalSlideWidth: number
  visibleSlides: number
}>`
  width: calc(${(props) => props.naturalSlideWidth * props.visibleSlides}px);
  margin: 0 auto;

  .carousel__slider {
    touch-action: pan-y;
  }

  .carousel__back-button:disabled,
  .carousel__next-button:disabled {
    &:hover {
      cursor: unset;
    }

    svg {
      opacity: 0.3;
    }
  }
`

const ButtonFlexWrapper = styled(Flex)`
  margin-top: 12px;
`

const iconStyle = css`
  align-self: center;
  width: 40px;
  height: 40px;
  color: ${(props) => props.theme.accentColor};

  @media ${device.S} {
    width: 24px;
    height: 24px;
  }
`

const buttonStyle = css`
  background-color: unset;
  border: none;
`

const StyledButtonNext = styled(ButtonNext)`
  ${buttonStyle}
`

const StyledButtonBack = styled(ButtonBack)`
  ${buttonStyle}
`

const IconLeft = styled(FaChevronLeft)`
  ${iconStyle}
`

const IconRight = styled(FaChevronRight)`
  ${iconStyle}
`

export default Slider
