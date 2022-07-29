import React from 'react'
import styled from 'styled-components'
import {device} from '../../../theme/device'
import {CourseOverview} from '../../../types'
import NextLink from '../../core/NextLink'
import CourseCard from './CourseCard'

const Courses = ({courses}: { courses: CourseOverview[] }) => {
  return (
    <Wrapper>
      {courses.map((c) => (
        <NextLink key={c.id} href={`/kurzy/${c.slug}`}>
          <CourseCard course={c} />
        </NextLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media ${device.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default Courses
