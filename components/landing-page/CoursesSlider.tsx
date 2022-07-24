import React, {} from 'react'
import {useAuth} from '../../AuthUserContext'
import {QueryGuard} from '../../QueryGuard'
import {CourseOverview} from '../../types'
import {useGetCourses} from '../api/courses'
import NextLink from '../core/NextLink'
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
        <NextLink key={i} href={`/kurzy/${course.slug}`}>
          <CourseCard course={course} />
        </NextLink>
      )}}
    />
  )
}

export default CoursesSliderWrapper
