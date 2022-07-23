import React from 'react'
import {NextPage} from 'next'
import Flex from '../../components/core/Flex'
import Heading from '../../components/core/Heading'
import Text from '../../components/core/Text'
import {CourseOverview} from '../../types'
import Courses from '../../components/domain/course/Courses'
import * as Api from '../../api'
import PageContentWrapper from '../../components/PageContentWrapper'
import NavBar from '../../components/NavBar'
import {useAuth} from '../../AuthUserContext'
import {useGetCourses} from '../../components/api/courses'
import {QueryGuard} from '../../QueryGuard'
import VoteNextCourse from '../../components/domain/vote/VoteNextCourse'

interface Props {
  courses: CourseOverview[]
}

const CoursesPage: NextPage<Props> = ({courses}) => {
  const {user} = useAuth()
  const getCoursesQuery = useGetCourses(!!user)

  if (user) {
    return (
      <QueryGuard {...getCoursesQuery}>
        {(courses: CourseOverview[]) => {
          return (
            <>
              <NavBar />
              <CoursesPageContent courses={courses} />
            </>
          )
        }}
      </QueryGuard>
    )
  } else {
    return (
      <>
        <NavBar />
        <CoursesPageContent courses={courses} />
      </>
    )
  }
}

const CoursesPageContent = ({courses}: Props) => {
  const {user} = useAuth()

  const shouldIncludeMyCourses = (courses: CourseOverview[]) => {
    return user && courses.filter((c) => c.userProgressMetadata).length > 0
  }

  return (
    <PageContentWrapper><>
      {shouldIncludeMyCourses(courses) && <>
        <Flex direction="column" gap="36px" alignItems="flex-start">
          <Heading variant="h3" withAccentUnderline normalWeight>
            Moje kurzy
          </Heading>
          <Courses courses={courses.filter((c) => c.userProgressMetadata)} />
          {courses.filter((c) => !c.userProgressMetadata).length > 0 &&
          <>
            <Heading variant="h3" withAccentUnderline normalWeight>
              Ďalšie kurzy
            </Heading>
            <Courses courses={courses.filter((c) => !c.userProgressMetadata)} />
          </>
          }
          <VoteNextCourse />
        </Flex>
      </>}
      {!shouldIncludeMyCourses(courses) && <>
        <Flex direction="column" gap="36px">
          <div>
            <Heading align="center" variant="h1">Nauč sa s nami</Heading>
            <Heading align="center" variant="h1" color="accent">programovať</Heading>
          </div>
          <Text align="center" size="large">Vyber si z našich kurzov</Text>
          <Courses courses={courses} />
          <VoteNextCourse />
        </Flex>
      </>}
    </>
    </PageContentWrapper>
  )
}

export const getStaticProps = async () => {
  const response = await Api.noAuthFetch(Api.coursesOverviewUrl())

  const courses = await response.json() as CourseOverview[]

  return {
    props: {courses}, // will be passed to the page component as props
  }
}

export default CoursesPage
