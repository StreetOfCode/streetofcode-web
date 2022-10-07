import {Slide} from 'pure-react-carousel'
import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../AuthUserContext'
import {QueryGuard} from '../../QueryGuard'
import {device} from '../../theme/device'
import {CourseOverview} from '../../types'
import {useGetCourses} from '../api/courses'
import NextLink from '../core/NextLink'
import CourseCard from '../domain/course/CourseCard'
import Slider, {SliderTemplateProps} from '../Slider'

type Props = {
  className?: string
  courses: CourseOverview[]
} & HTMLAttributes<HTMLElement>

const XL_SIZE_WIDTH = 300
const L_SIZE_WIDTH = 300
const M_SIZE_WIDTH = 300
const S_SIZE_WIDTH = 250
const WIDTH_BUFFER = 64
const HEIGHT_BUFFER = 48

export const CoursesSliderWrapper = ({className, courses}: Props) => {
  const {user} = useAuth()
  const getCoursesQuery = useGetCourses(!!user)

  if (user) {
    return (
      <QueryGuard {...getCoursesQuery}>
        {(courses: CourseOverview[]) => {
          return <CoursesSlider className={className} courses={courses} />
        }}
      </QueryGuard>
    )
  } else {
    return <CoursesSlider className={className} courses={courses} />
  }
}

const CoursesSliderTemplate = ({
  className,
  displayItemsCount,
  slideWidth,
  slideHeight,
  courses,
}: SliderTemplateProps & Props) => {
  return (
    <Slider
      className={className}
      items={courses}
      showItemsCount={displayItemsCount}
      slideWidth={slideWidth}
      slideHeight={slideHeight}
      itemLayout={(course, i) => {
        return (
          <StyledSlide index={i} key={i}>
            <NextLink href={`/kurzy/${course.slug}`}>
              <StyledCourseCard course={course} />
            </NextLink>
          </StyledSlide>
        )
      }}
    />
  )
}

const CoursesSlider = ({className, courses}: Props) => {
  return (
    <>
      <XLCoursesSlider
        className={className}
        courses={courses}
        displayItemsCount={Math.min(3, courses.length)}
        slideWidth={XL_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={XL_SIZE_WIDTH * 1.5 + HEIGHT_BUFFER}
      />
      <LCoursesSlider
        className={className}
        courses={courses}
        displayItemsCount={Math.min(2, courses.length)}
        slideWidth={L_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={L_SIZE_WIDTH * 1.5 + HEIGHT_BUFFER}
      />
      <MCoursesSlider
        className={className}
        courses={courses}
        displayItemsCount={1}
        slideWidth={M_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={M_SIZE_WIDTH * 1.5 + HEIGHT_BUFFER}
      />
      <SCoursesSlider
        className={className}
        courses={courses}
        displayItemsCount={1}
        slideWidth={S_SIZE_WIDTH + WIDTH_BUFFER}
        slideHeight={S_SIZE_WIDTH * 1.5 + HEIGHT_BUFFER}
      />
    </>
  )
}

const XLCoursesSlider = styled(CoursesSliderTemplate)`
  @media ${device.XL} {
    display: block;
  }

  @media ${device.L} {
    display: none;
  }
`

const LCoursesSlider = styled(CoursesSliderTemplate)`
  display: none;

  @media ${device.L} {
    display: block;
  }

  @media ${device.M} {
    display: none;
  }
`

const MCoursesSlider = styled(CoursesSliderTemplate)`
  display: none;

  @media ${device.M} {
    display: block;
  }

  @media ${device.S} {
    display: none;
  }
`

const SCoursesSlider = styled(CoursesSliderTemplate)`
  display: none;

  @media ${device.S} {
    display: block;
  }
`

const StyledCourseCard = styled(CourseCard)`
  margin: 0 auto;

  @media ${device.XL} {
    width: ${XL_SIZE_WIDTH}px;
  }

  @media ${device.L} {
    display: ${L_SIZE_WIDTH}px;
  }

  @media ${device.M} {
    display: ${M_SIZE_WIDTH}px;
  }

  @media ${device.S} {
    display: ${S_SIZE_WIDTH}px;
  }
`

const StyledSlide = styled(Slide)`
  margin-top: 24px;
`

export default CoursesSliderWrapper
