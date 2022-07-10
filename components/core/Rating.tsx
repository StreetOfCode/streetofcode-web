import React from 'react'
import {Rating as MuiRating, RatingProps} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import styled from 'styled-components'

type Props = {
  className?: string
  customSize?: string
} & RatingProps

const Rating = ({className, name, value, readOnly, customSize, precision, ...props}: Props) => {
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
  color: ${(props) => props.theme.accentColor};
`

const EmptyStar = styled(StarIcon)`
  color: #DBCDF8;
`

const StyledRating = styled(MuiRating)``


export default Rating
