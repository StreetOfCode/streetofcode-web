import React from 'react'
import styled from 'styled-components'
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
`

export default Courses
