import React from 'react'
import styled from 'styled-components'
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
import {useGetCourses} from '../../api/courses'
import {UserAndQueryGuard} from '../../QueryGuard'
import VoteNextCourse from '../../components/domain/vote/VoteNextCourse'
import {device} from '../../theme/device'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'

interface Props {
  courses: CourseOverview[]
}

const CoursesPage: NextPage<Props> = ({courses}) => {
  const {user} = useAuth()
  const getCoursesQuery = useGetCourses(!!user)

  return (
    <UserAndQueryGuard user={user} fallbackData={courses} {...getCoursesQuery}>
      {(_courses) => {
        return (
          <>
            <Head
              title="Kurzy | Street of Code"
              description="Nauč sa s nami programovať!"
              url={prefixWithHost(routes.kurzy.index)}
            />
            <NavBar />
            <CoursesPageContent courses={_courses} />
          </>
        )
      }}
    </UserAndQueryGuard>
  )
}

const CoursesPageContent = ({courses}: Props) => {
  const {user} = useAuth()

  const shouldIncludeMyCourses = (courses: CourseOverview[]) => {
    return user && courses.filter((c) => c.userProgressMetadata).length > 0
  }

  return (
    <PageContentWrapper>
      <>
        {shouldIncludeMyCourses(courses) && (
          <>
            <MyCoursesFlexWrapper
              direction="column"
              gap="36px"
              alignItems="flex-start"
            >
              <Heading variant="h4" withAccentUnderline normalWeight>
                Moje kurzy
              </Heading>
              <Courses
                courses={courses.filter((c) => c.userProgressMetadata)}
                shouldLinkToTakeCourse
              />
              {courses.filter((c) => !c.userProgressMetadata).length > 0 && (
                <>
                  <Heading variant="h4" withAccentUnderline normalWeight>
                    Ďalšie kurzy
                  </Heading>
                  <Courses
                    courses={courses.filter((c) => !c.userProgressMetadata)}
                  />
                </>
              )}
              <VoteNextCourse />
            </MyCoursesFlexWrapper>
          </>
        )}
        {!shouldIncludeMyCourses(courses) && (
          <>
            <Flex direction="column" gap="36px">
              <div>
                <Heading align="center" variant="h2">
                  Nauč sa s nami
                </Heading>
                <Heading align="center" variant="h2" color="accent">
                  programovať
                </Heading>
              </div>
              <Text align="center" size="large">
                Vyber si z našich kurzov
              </Text>
              <Courses courses={courses} />
              <VoteNextCourse />
            </Flex>
          </>
        )}
      </>
    </PageContentWrapper>
  )
}

const MyCoursesFlexWrapper = styled(Flex)`
  @media ${device.M} {
    align-items: center;
  }
`

export const getStaticProps = async () => {
  const response = await Api.noAuthFetch(Api.coursesOverviewUrl())

  const courses = (response.ok ? await response.json() : []) as CourseOverview[]

  return {
    props: {courses},
  }
}

export default CoursesPage
