import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../AuthUserContext'
import {QueryGuard} from '../../QueryGuard'
import {CourseOverview} from '../../types'
import {useGetCourses} from '../api/courses'
import NextLink from '../core/NextLink'
import CourseCard from '../domain/course/CourseCard'
import Slider from '../Slider'

type Props = {
  className?: string
  courses: CourseOverview[]
  showCoursesCount: number
} & HTMLAttributes<HTMLElement>

export const CoursesSliderWrapper = ({
  className,
  courses,
  showCoursesCount,
}: Props) => {
  const {user} = useAuth()
  const getCoursesQuery = useGetCourses(!!user)

  if (user) {
    return (
      <QueryGuard {...getCoursesQuery}>
        {(courses: CourseOverview[]) => {
          return (
            <CoursesSlider
              className={className}
              showCoursesCount={showCoursesCount}
              courses={courses}
            />
          )
        }}
      </QueryGuard>
    )
  } else {
    return (
      <CoursesSlider
        className={className}
        showCoursesCount={showCoursesCount}
        courses={courses}
      />
    )
  }
}

const CoursesSlider = ({className, courses, showCoursesCount}: Props) => {
  return (
    <Slider
      className={className}
      items={courses}
      showItemsCount={showCoursesCount}
      itemLayout={(course, i, visible) => {
        return (
          <Wrapper key={i} visible={visible}>
            <NextLink href={`/kurzy/${course.slug}`}>
              <CourseCard course={course} />
            </NextLink>
          </Wrapper>
        )
      }}
    />
  )
}

const Wrapper = styled.div<{visible: boolean}>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`

export default CoursesSliderWrapper
