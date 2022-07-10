import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {CourseOverview} from '../../../types'
import CourseCard from './CourseCard'

const Courses = ({courses}: { courses: CourseOverview[] }) => {
  return (
    <Wrapper>
      {courses.map((c) => (
        <StyledLink key={c.id} href={`/course/${c.id}`} passHref>
          <StyledA>
            <CourseCard course={c} />
          </StyledA>
        </StyledLink>
      ))}
    </Wrapper>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledA = styled.a`
  text-decoration: none;
  color: unset;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
`

export default Courses
