import React from 'react'
import MuiRating, {RatingProps} from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import styled from 'styled-components'
import Flex from './Flex'
import Text from './Text'

type Props = {
  className?: string
  customSize?: string
} & RatingProps

const Rating = ({
  className,
  name,
  value,
  readOnly,
  customSize,
  precision,
  ...props
}: Props) => {
  if (readOnly && !value) {
    return (
      <Flex gap="6px">
        <FilledStar />
        <Text size="large" color="accent">
          -
        </Text>
      </Flex>
    )
  }

  return (
    <StyledRating
      className={className}
      name={name}
      precision={precision || 0.5}
      value={value}
      readOnly={readOnly}
      icon={<FilledStar style={{fontSize: customSize}} />}
      emptyIcon={<EmptyStar style={{fontSize: customSize}} />}
      {...props}
    />
  )
}

const FilledStar = styled(StarIcon)`
  color: var(--color-accent) !important;
`

const EmptyStar = styled(StarIcon)`
  color: #dbcdf8 !important;
`

const StyledRating = styled(MuiRating)``

export default Rating
