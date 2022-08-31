import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import Flex from '../components/core/Flex'
import {device} from '../theme/device'

const getInitialWindow = (numberOfItems: number, showItemsCount: number) => {
  // We want start and end be in the middle (based on numberOfItems)
  if (showItemsCount >= numberOfItems) {
    return {start: 0, end: numberOfItems - 1}
  }

  const middleIndex = Math.floor(numberOfItems / 2)
  let start = middleIndex
  let end = middleIndex

  let itemsCount = 0
  while (itemsCount < showItemsCount - 1) {
    start--
    end++
    itemsCount += 2
  }

  if (itemsCount === showItemsCount) {
    start += 1
  }

  return {start, end}
}

type Props<T> = {
  className?: string
  items: T[]
  showItemsCount: number
  itemLayout: (item: T, index: number) => React.ReactElement
}

type SliderWindow = {
  start: number
  end: number
}

const Slider = <T,>({
  className,
  items,
  itemLayout,
  showItemsCount,
}: Props<T>) => {
  const [{start, end}, setWindow] = useState<SliderWindow>(
    getInitialWindow(items.length, showItemsCount),
  )

  const handleLeftIconClick = () => {
    if (start > 0) {
      setWindow({start: start - 1, end: end - 1})
    }
  }

  const handRightIconClick = () => {
    if (end < items.length - 1) {
      setWindow({start: start + 1, end: end + 1})
    }
  }

  return (
    <WrapperFlex
      className={className}
      justifyContent="space-between"
      gap="32px"
      alignSelf="stretch"
    >
      <IconLeft onClick={handleLeftIconClick} disabled={start === 0} />
      {items.slice(start, end + 1).map((item, i) => itemLayout(item, i))}
      <IconRight
        onClick={handRightIconClick}
        disabled={end === items.length - 1}
      />
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  @media ${device.mobile} {
    gap: 8px;
  }
`

const iconStyle = css<{disabled: boolean}>`
  width: 40px;
  height: 40px;
  color: ${(props) => props.theme.accentColor};
  opacity: ${(props) => props.disabled && 0.7};
  flex-shrink: 0;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'unset' : 'pointer')};
  }

  @media ${device.mobile} {
    width: 24px;
    height: 24px;
  }
`

const IconLeft = styled(FaChevronLeft)<{disabled: boolean}>`
  ${iconStyle}
`

const IconRight = styled(FaChevronRight)<{disabled: boolean}>`
  ${iconStyle}
`

export default Slider
