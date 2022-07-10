import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {CourseOverview} from '../../types'
import CourseCard from '../domain/course/CourseCard'
import Slider from '../Slider'

const CoursesSlider = ({courses}: { courses: CourseOverview[] }) => {
  return (
    <Slider items={courses} showItemsCount={3} itemLayout={(course, i) => {
      return (
        <StyledLink key={i} href={`/course/${course.id}`} passHref>
          <StyledA>
            <CourseCard course={course} />
          </StyledA>
        </StyledLink>
      )}}
    />
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledA = styled.a`
  text-decoration: none;
  color: unset;
`

export default CoursesSlider
