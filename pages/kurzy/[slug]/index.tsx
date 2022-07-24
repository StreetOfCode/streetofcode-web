import React from 'react'
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
import MarkdownView from '../../../components/core/MarkdownView'
import {AiOutlineClockCircle, AiOutlineQuestionCircle, AiOutlineVideoCamera} from 'react-icons/ai'
import DifficultyIcon from '../../../theme/icons/DifficultyIcon'
import Rating from '../../../components/core/Rating'
import Avatar from '../../../components/core/Avatar'
import CircullarProgressWithLabel from '../../../components/CircullarProgressWithLabel'
import {useRouter} from 'next/router'
import CourseContent from '../../../components/domain/course/CourseContent'
import PageContentWrapper from '../../../components/PageContentWrapper'
import NavBar from '../../../components/NavBar'
import {useAuth} from '../../../AuthUserContext'
import {QueryGuard} from '../../../QueryGuard'
import {useGetCourseOverview} from '../../../components/api/courseOverview'
import CourseReviews from '../../../components/domain/course-review/CourseReviews'
import NextLink from '../../../components/core/NextLink'
import Loading from '../../../components/Loading'


type Props = {
  slug: string
  courseOverview: null | CourseOverview
}

const CourseDetailPage: NextPage<Props> = ({slug, courseOverview}: Props) => {
  const {user} = useAuth()
  const getCourseOverview = useGetCourseOverview(slug, !!user)

  if (user) {
    return (
      <QueryGuard {...getCourseOverview}>
        {(courseOverview: CourseOverview) => {
          return (
            <>
              <NavBar />
              <CourseDetailContent courseOverview={courseOverview} />
            </>
          )
        }}
      </QueryGuard>
    )
  } else if (!courseOverview) {
    // this can happend when unathorized (not admin) user tries to access course which is not public
    return (
      <h1>Pre tento kurz nemáš dostatočné oprávnenie</h1>
    )
  } else {
    return (
      <>
        <NavBar />
        <CourseDetailContent courseOverview={courseOverview} />
      </>
    )
  }
}

const CourseDetailContent = ({courseOverview}: {courseOverview: CourseOverview}) => {
  const {user, isLoading} = useAuth()

  const router = useRouter()

  if (!courseOverview.thumbnailUrl && !courseOverview.trailerUrl) return null

  let lecturesCount = 0
  let url = ''
  let courseDuration = ''
  let quizzesCount = 0
  let progressValuePercent
  if (courseOverview != null) {
    lecturesCount = courseOverview.chapters.map((chapter) => chapter.lectures).flat().length
    url = Utils.getTakeCourseUrl(courseOverview)
    courseDuration = Utils.formatDurationFromMinutes(courseOverview.courseDurationMinutes)
    quizzesCount = courseOverview.chapters.flatMap((ch) => ch.lectures).filter((le) => le.lectureType === 'QUIZ').length

    if (courseOverview.userProgressMetadata) {
      const progressData = courseOverview.userProgressMetadata
      progressValuePercent = (progressData.lecturesViewed / progressData.courseLecturesCount) * 100
    }
  }

  const handleAuthorClicked = (authorSlug: string) => {
    router.push(`/lektor/${authorSlug}`)
  }

  const renderThubmnailOrTrailer = (): React.ReactNode => {
    if (courseOverview.trailerUrl) {
      return (<VideoWrapper>
        <iframe
          title={courseOverview.name}
          src={`${courseOverview.trailerUrl}?rel=0&modestbranding=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
          allowFullScreen
        />
      </VideoWrapper>)
    } else {
      if (!courseOverview.thumbnailUrl) return null

      return <CardImage alt={courseOverview.name} src={courseOverview.thumbnailUrl} />
    }
  }
  return (
    <PageContentWrapper>
      <BackLink to={'/kurzy'} text={'Späť na kurzy'} />
      <Flex justifyContent="space-between">
        <Flex direction="column" alignSelf="flex-start" alignItems="flex-start" gap="32px" style={{maxWidth: '50%'}}>
          <Heading variant="h1" normalWeight>{courseOverview.name}</Heading>
          <Text size="large">{courseOverview.shortDescription}</Text>
          <MarkdownView children={courseOverview.longDescription} />
          <Heading variant="h2" normalWeight>Obsah</Heading>
          <CourseContent course={courseOverview} />
          <CourseReviews courseOverview={courseOverview} />
        </Flex>

        <CardFlex direction="column" gap="12px" alignSelf="flex-start">
          {renderThubmnailOrTrailer()}
          {isLoading && <Loading />}
          {!isLoading && user && <NextLink href={url} alignSelf="stretch">
            <StyledButton variant="accent">
              {courseOverview.userProgressMetadata ? 'pokračovať v kurze' : 'spustiť kurz'}
            </StyledButton>
          </NextLink>}
          {!isLoading && !user && (
            <NextLink href={`/login/${encodeURIComponent(location.pathname)}`} alignSelf="stretch">
              <StyledButton variant="accent">Pre spustenie kurzu sa najprv prihlás</StyledButton>
            </NextLink>
          )}
          <Flex justifyContent="space-between" alignSelf="stretch">
            <Flex direction="column" alignItems="flex-start" alignSelf="flex-start" gap="12px">
              <CourseInfoItem>
                <DifficultyIcon difficultyLevel={courseOverview.difficulty.skillLevel} />
                <Text>{courseOverview.difficulty?.name}</Text>
              </CourseInfoItem>
              <CourseInfoItem>
                <AiOutlineClockCircle />
                <Text>{courseDuration}</Text>
              </CourseInfoItem>
              <CourseInfoItem>
                <AiOutlineVideoCamera />
                <Text>{lecturesCount} {Utils.numOfLecturesText(lecturesCount)}</Text>
              </CourseInfoItem>
              {quizzesCount > 0 && <CourseInfoItem>
                <AiOutlineQuestionCircle />
                <Text>{quizzesCount} {Utils.numOfQuizzesText(quizzesCount)}</Text>
              </CourseInfoItem>}
            </Flex>
            <Flex direction="column" alignItems="flex-start" alignSelf="flex-start" gap="12px">
              <CourseInfoItem>
                <Rating readOnly value={courseOverview.reviewsOverview.averageRating} />
                <Text>({courseOverview.reviewsOverview.numberOfReviews})</Text>
              </CourseInfoItem>
              <CourseInfoItem clickable onClick={() => handleAuthorClicked(courseOverview.author.slug)}>
                <Avatar altName={courseOverview.author.name} src={courseOverview.author.imageUrl} />
                <Text>{courseOverview.author.name}</Text>
              </CourseInfoItem>
              {progressValuePercent && <CourseInfoItem>
                <CircullarProgressWithLabel size="28px" withoutTextInMiddle value={progressValuePercent} />
                <Text>{progressValuePercent}% dokončených</Text>
              </CourseInfoItem>}
            </Flex>
          </Flex>
        </CardFlex>
      </Flex>
    </PageContentWrapper>

  )
}

const CourseInfoItem = styled.div<{clickable?: boolean}>`
  display: flex;
  gap: 12px;
  align-items: center;

  cursor: ${(props) => props.clickable ? 'pointer' : 'unset'};

  svg, img {
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
`

const CardImage = styled.img``

// TODO make VideoWrapper component (use here and in LectureDetail)
const VideoWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug as string
  const response = await Api.noAuthFetch(Api.courseOverviewUrl(slug))

  if (!response.ok) {
    return {
      props: {slug, courseOverview: null},
    }
  } else {
    const courseOverview = await response.json() as CourseOverview
    return {
      props: {slug, courseOverview},
    }
  }
}

export const getStaticPaths = async () => {
  const response = await Api.noAuthFetch(Api.courseSlugsUrl())
  const slugs = await response.json() as string[]

  const paths = slugs.map((slug) => ({params: {slug}}))

  return {
    paths,
    fallback: false,
  }
}

export default CourseDetailPage
