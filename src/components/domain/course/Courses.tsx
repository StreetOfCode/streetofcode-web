import React from 'react'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {device} from '../../../theme/device'
import {CourseOverview} from '../../../types'
import * as Utils from '../../../utils'
import NextLink from '../../core/NextLink'
import CourseCard from './CourseCard'

const Courses = ({
  courses,
  shouldLinkToTakeCourse = false,
}: {
  courses: CourseOverview[]
  shouldLinkToTakeCourse?: boolean
}) => {
  return (
    <Wrapper>
      {courses.map((c) => {
        const link = shouldLinkToTakeCourse
          ? Utils.getTakeCourseUrl(c)
          : routes.kurzy.slug(c.slug)
        return (
          <NextLink key={c.id} href={link}>
            <CourseCard course={c} />
          </NextLink>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;

  @media ${device.M} {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media ${device.S} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default Courses
