import Link from 'next/link'
import React, {} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../AuthUserContext'
import {QueryGuard} from '../../QueryGuard'
import {CourseOverview} from '../../types'
import {useGetCourses} from '../api/courses'
import CourseCard from '../domain/course/CourseCard'
import Slider from '../Slider'

export const CoursesSliderWrapper = ({initialCourses}: { initialCourses: CourseOverview[] }) => {
  const {user} = useAuth()
  const getCoursesQuery = useGetCourses(!!user)

  if (user) {
    return (
      <QueryGuard {...getCoursesQuery}>
        {(courses: CourseOverview[]) => {
          return (
            <CoursesSlider courses={courses} />
          )
        }}
      </QueryGuard>
    )
  } else {
    return (
      <CoursesSlider courses={initialCourses} />
    )
  }
}

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

export default CoursesSliderWrapper
