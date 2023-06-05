import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {GetStaticProps, NextPage} from 'next'
import * as Api from '../../../api'
import {CourseOverview} from '../../../types'
import styled from 'styled-components'
import Button from '../../../components/core/Button'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import Flex from '../../../components/core/Flex'
import BackLink from '../../../components/core/BackLink'
import * as Utils from '../../../utils'
import {
  AiOutlineClockCircle,
  AiOutlineQuestionCircle,
  AiOutlineVideoCamera,
} from 'react-icons/ai'
import DifficultyIcon from '../../../theme/icons/DifficultyIcon'
import Rating from '../../../components/core/Rating'
import Avatar from '../../../components/core/Avatar'
import CircullarProgressWithLabel from '../../../components/CircullarProgressWithLabel'
import {useRouter} from 'next/router'
import CourseContent from '../../../components/domain/course/CourseContent'
import PageContentWrapper from '../../../components/PageContentWrapper'
import NavBar from '../../../components/NavBar'
import {useAuth} from '../../../AuthUserContext'
import {UserAndQueryGuard} from '../../../QueryGuard'
import {useGetCourseOverview} from '../../../api/courseOverview'
import CourseReviews from '../../../components/domain/course-review/CourseReviews'
import NextLink from '../../../components/core/NextLink'
import Loading from '../../../components/Loading'
import {device} from '../../../theme/device'
import VideoWrapper from '../../../components/domain/video/VideoWrapper'
import dynamic from 'next/dynamic'
import Head from '../../../components/Head'
import {prefixWithHost, routes} from '../../../routes'
import SidebarCourseReviews from '../../../components/domain/course-review/SidebarCourseReviews'

type Props = {
  slug: string
  courseOverview: null | CourseOverview
}

const LazyCourseDescription = dynamic(
  () => import('../../../components/core/MarkdownView'),
  {
    ssr: false,
  },
)

const CourseDetailPage: NextPage<Props> = ({slug, courseOverview}: Props) => {
  const {user} = useAuth()
  const getCourseOverview = useGetCourseOverview(slug, !!user)

  return (
    <UserAndQueryGuard
      user={user}
      fallbackData={courseOverview}
      fallbackComponent={
        <>
          <NavBar />
          <PageContentWrapper>
            <Flex direction="column" justifyContent="center" gap="48px">
              <Heading variant="h3" align="center">
                Pre tento kurz nemáš dostatočné oprávnenie
              </Heading>
              <NextLink href={routes.root}>
                <Heading variant="h4" withAccentUnderline>
                  Prejsť na hlavnú stránku
                </Heading>
              </NextLink>
            </Flex>
          </PageContentWrapper>
        </>
      }
      {...getCourseOverview}
    >
      {(_courseOverview) => {
        return (
          <>
            <Head
              title={`${_courseOverview.name} | Street of Code`}
              description={_courseOverview.shortDescription}
              url={prefixWithHost(routes.kurzy.slug(_courseOverview.slug))}
              imageUrl={_courseOverview.iconUrl}
            />
            <NavBar />
            <CourseDetailContent courseOverview={_courseOverview} />
          </>
        )
      }}
    </UserAndQueryGuard>
  )
}

const CourseDetailContent = ({
  courseOverview,
}: {
  courseOverview: CourseOverview
}) => {
  const {user, isLoading} = useAuth()
  const courseReviewsRef = useRef<null | HTMLDivElement>(null)
  const router = useRouter()
  const [sidebarReviewsVisible, setSidebarReviewsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (courseReviewsRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          courseReviewsRef.current.offsetTop
        ) {
          setSidebarReviewsVisible(false)
        } else {
          setSidebarReviewsVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [courseReviewsRef])

  if (!courseOverview.thumbnailUrl && !courseOverview.trailerUrl) return null

  const handleCourseReviewsRefClick = () => {
    if (courseReviewsRef.current) {
      courseReviewsRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  let lecturesCount = 0
  let url = ''
  let courseDuration = ''
  let quizzesCount = 0
  let progressValuePercent
  if (courseOverview != null) {
    lecturesCount = courseOverview.chapters
      .map((chapter) => chapter.lectures)
      .flat().length
    url = Utils.getTakeCourseUrl(courseOverview)
    courseDuration = Utils.formatDurationFromMinutes(
      courseOverview.courseDurationMinutes,
    )
    quizzesCount = courseOverview.chapters
      .flatMap((ch) => ch.lectures)
      .filter((le) => le.lectureType === 'QUIZ').length

    if (courseOverview.userProgressMetadata) {
      const progressData = courseOverview.userProgressMetadata
      progressValuePercent = Utils.getCourseProgressPercent(
        progressData.lecturesViewed,
        progressData.courseLecturesCount,
      )
    }
  }

  const handleAuthorClicked = (authorSlug: string) => {
    router.push(routes.lektor.slug(authorSlug))
  }

  const renderThubmnailOrTrailer = (): React.ReactNode => {
    if (courseOverview.trailerUrl) {
      return <VideoWrapper vimeoVideoId={courseOverview.trailerUrl} />
    } else {
      if (!courseOverview.thumbnailUrl) return null

      return (
        <CardImageWrapper>
          <Image
            alt={courseOverview.name}
            src={courseOverview.thumbnailUrl}
            layout="fill"
            priority
          />
        </CardImageWrapper>
      )
    }
  }
  return (
    <PageContentWrapper>
      <BackLink to={routes.kurzy.index} text={'Späť na kurzy'} />
      <WrapperFlex justifyContent="space-between" gap="24px">
        <CourseDetailsFlex
          direction="column"
          alignSelf="flex-start"
          alignItems="flex-start"
          gap="24px"
        >
          <Heading variant="h1" normalWeight>
            {courseOverview.name}
          </Heading>
          <Text size="large">{courseOverview.shortDescription}</Text>
          <LazyCourseDescription children={courseOverview.longDescription} />
          <Heading variant="h3" normalWeight>
            Obsah
          </Heading>
          <CourseContent course={courseOverview} />
          <CourseReviews
            courseOverview={courseOverview}
            innerRef={courseReviewsRef}
          />
        </CourseDetailsFlex>

        <CardFlex direction="column" gap="12px" alignSelf="flex-start">
          {renderThubmnailOrTrailer()}
          {isLoading && <Loading />}
          {!isLoading && user && (
            <NextLink
              href={{pathname: url, query: {autoplay: 'false'}}}
              alignSelf="stretch"
            >
              <StyledButton variant="accent" disableHoverTransform>
                {courseOverview.userProgressMetadata
                  ? 'Pokračovať v kurze'
                  : 'Spustiť kurz'}
              </StyledButton>
            </NextLink>
          )}
          {!isLoading && !user && (
            <NextLink
              href={routes.login.redirectUri(
                encodeURIComponent(location.pathname),
              )}
              alignSelf="stretch"
            >
              <StyledButton variant="accent">
                Pre spustenie kurzu sa najprv prihlás
              </StyledButton>
            </NextLink>
          )}
          <Flex justifyContent="space-between" alignSelf="stretch">
            <Flex
              direction="column"
              alignItems="flex-start"
              alignSelf="flex-start"
              gap="12px"
            >
              <CourseInfoItem>
                <DifficultyIcon
                  difficultyLevel={courseOverview.difficulty.skillLevel}
                />
                <Text>{courseOverview.difficulty?.name}</Text>
              </CourseInfoItem>
              <CourseInfoItem>
                <AiOutlineClockCircle />
                <Text>{courseDuration}</Text>
              </CourseInfoItem>
              <CourseInfoItem>
                <AiOutlineVideoCamera />
                <Text>
                  {lecturesCount} {Utils.numOfLecturesText(lecturesCount)}
                </Text>
              </CourseInfoItem>
              {quizzesCount > 0 && (
                <CourseInfoItem>
                  <AiOutlineQuestionCircle />
                  <Text>
                    {quizzesCount} {Utils.numOfQuizzesText(quizzesCount)}
                  </Text>
                </CourseInfoItem>
              )}
            </Flex>
            <Flex
              direction="column"
              alignItems="flex-end"
              alignSelf="stretch"
              justifyContent="space-between"
              gap="12px"
            >
              <Flex direction="column" gap="12px" alignItems="flex-end">
                <CourseInfoItem clickable onClick={handleCourseReviewsRefClick}>
                  <Rating
                    readOnly
                    value={courseOverview.reviewsOverview.averageRating}
                  />
                  <Text>
                    ({courseOverview.reviewsOverview.numberOfReviews})
                  </Text>
                </CourseInfoItem>
                <CourseInfoItem
                  clickable
                  onClick={() =>
                    handleAuthorClicked(courseOverview.author.slug)
                  }
                >
                  <Avatar
                    altName={courseOverview.author.name}
                    src={courseOverview.author.imageUrl}
                    sizePx={28}
                    priority
                  />
                  <Text>{courseOverview.author.name}</Text>
                </CourseInfoItem>
              </Flex>
              {progressValuePercent && (
                <CourseInfoItem>
                  <CircullarProgressWithLabel
                    size="28px"
                    withoutTextInMiddle
                    value={progressValuePercent}
                  />
                  <Text>{progressValuePercent}% dokončených</Text>
                </CourseInfoItem>
              )}
              {!progressValuePercent && (
                <Text uppercase color="accent" weight="bold">
                  zadarmo
                </Text>
              )}
            </Flex>
          </Flex>
          {sidebarReviewsVisible && (
            <StyledSidebarCourseReviews courseOverview={courseOverview} />
          )}
          {sidebarReviewsVisible &&
            courseOverview.reviewsOverview.numberOfReviews > 0 && (
              <AllReviewsText
                color="accent"
                withAccentUnderline
                onClick={handleCourseReviewsRefClick}
              >
                Zobraziť všetky hodnotenia
              </AllReviewsText>
            )}
        </CardFlex>
      </WrapperFlex>
    </PageContentWrapper>
  )
}

const WrapperFlex = styled(Flex)`
  @media ${device.S} {
    flex-direction: column;
    gap: 32px;
  }
`

const CourseDetailsFlex = styled(Flex)`
  max-width: 50%;

  @media ${device.S} {
    max-width: 100%;
    order: 2;
  }
`

const CourseInfoItem = styled.div<{clickable?: boolean}>`
  display: flex;
  gap: 12px;
  align-items: center;

  cursor: ${(props) => (props.clickable ? 'pointer' : 'unset')};

  svg {
    color: var(--color-secondary);
    width: 28px;
    height: 28px;
  }
`

const StyledButton = styled(Button)`
  width: 100%;
`

const CardFlex = styled(Flex)`
  width: 400px;
  position: sticky;
  top: 80px;

  @media ${device.M} {
    position: static;
  }

  @media ${device.S} {
    align-self: center;
    width: 100%;
    order: 1;
  }
`

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
`
const StyledSidebarCourseReviews = styled(SidebarCourseReviews)`
  margin-top: 24px;
  margin-bottom: 8px;

  @media ${device.S} {
    display: none;
  }
`

const AllReviewsText = styled(Text)`
  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
    opacity: 0.8;
  }

  @media ${device.S} {
    display: none;
  }
`

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug as string
  const response = await Api.noAuthFetch(Api.courseOverviewUrl(slug))

  const courseOverview = response.ok
    ? ((await response.json()) as CourseOverview)
    : null

  return {props: {slug, courseOverview}}
}

export const getStaticPaths = async () => {
  const response = await Api.noAuthFetch(Api.courseSlugsUrl())
  const slugs = (response.ok ? await response.json() : []) as string[]

  const paths = slugs.map((slug) => ({params: {slug}}))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default CourseDetailPage
