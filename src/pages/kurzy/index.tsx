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
import {
  informatika101Link,
  pavolReview,
  springBootKotlinLink,
  theodorReview,
} from '../../testimonials'
import {CourseReviewContainer} from '../../components/domain/course-review/CourseReviewItem'
import {HiOutlineArrowNarrowRight, HiSparkles} from 'react-icons/hi'

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
              <BottomContentWraper />
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
                Vyber si svoj kurz programovania
              </Text>
              <Courses courses={courses} />
              <BottomContentWraper />
            </Flex>
          </>
        )}
      </>
    </PageContentWrapper>
  )
}

const BottomContentWraper = () => {
  return (
    <>
      <Testimonials />
      <VoteNextCourse />
      <Text align="center" size="large">
        Chceš sa naučiť vyvíjať softvér? Ak hľadáš online kurz programovania, si
        tu správne. Zameriavame sa na programovanie pre úplných začiatočníkov aj
        pre pokročilých. Vyber si svoj kurz IT a začni ešte dnes.
      </Text>
    </>
  )
}

const Testimonials = () => {
  return (
    <Flex
      direction="column"
      gap="48px"
      alignItems="flex-start"
      alignSelf="flex-start"
    >
      <TestimonialsHeading>
        <Heading inline variant="h5">
          Na našich kurzoch si dávame {}
        </Heading>
        <Flex gap="8px" style={{display: 'inline-block'}}>
          <Heading inline variant="h5" color="accent">
            extra
          </Heading>
          <SparksIcon />
        </Flex>
        <Heading inline variant="h5">
          {' '}
          záležať
        </Heading>
      </TestimonialsHeading>
      <TestimonialsFlexWrapper
        gap="32px"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        <Flex direction="column" gap="16px">
          <Testimonial
            review={pavolReview}
            courseSlug={''}
            isEditing={false}
            onEditCancelled={() => {
              /* */
            }}
            onEdited={() => {
              /* */
            }}
            EditItemActions={() => <></>}
          />
          <Flex gap="8px" alignSelf="flex-start">
            <TestimonialArrowIcon />
            {informatika101Link}
          </Flex>
        </Flex>
        <Flex direction="column" gap="16px">
          <Testimonial
            review={theodorReview}
            courseSlug={''}
            isEditing={false}
            onEditCancelled={() => {
              /* */
            }}
            onEdited={() => {
              /* */
            }}
            EditItemActions={() => <></>}
          />
          <Flex gap="8px" alignSelf="flex-start">
            <TestimonialArrowIcon />
            {springBootKotlinLink}
          </Flex>
        </Flex>
      </TestimonialsFlexWrapper>
    </Flex>
  )
}

const MyCoursesFlexWrapper = styled(Flex)`
  @media ${device.M} {
    align-items: center;
  }
`

const TestimonialsFlexWrapper = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
    align-self: center;
  }
`

const TestimonialsHeading = styled.div`
  margin-top: 24px;
`

const Testimonial = styled(CourseReviewContainer)`
  min-width: 300px;
  max-width: 450px;
`

const TestimonialArrowIcon = styled(HiOutlineArrowNarrowRight)`
  width: 16px;
  height: 16px;
  margin-left: 72px;
  color: var(--color-secondary);
`

const SparksIcon = styled(HiSparkles)`
  width: 16px;
  height: 16px;
  transform: rotate(180deg);
  margin-left: 2px;
  margin-bottom: 16px;
  margin-right: -6px;
  color: var(--color-accent);

  @media ${device.S} {
    width: 14px;
    height: 14px;
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
