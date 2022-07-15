import React from 'react'
import {
  CircularProgress,
} from '@material-ui/core'
import {GetStaticProps, NextPage} from 'next'
import * as Api from '../../api'
import {CourseOverview} from '../../types'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '../../components/core/Button'
import Heading from '../../components/core/Heading'
import Text from '../../components/core/Text'
import Flex from '../../components/core/Flex'
import BackLink from '../../components/core/BackLink'
import * as Utils from '../../utils'
import MarkdownView from '../../components/core/MarkdownView'
import {AiOutlineClockCircle, AiOutlineQuestionCircle, AiOutlineVideoCamera} from 'react-icons/ai'
import DifficultyIcon from '../../theme/icons/DifficultyIcon'
import Rating from '../../components/core/Rating'
import Avatar from '../../components/core/Avatar'
import CircullarProgressWithLabel from '../../components/CircullarProgressWithLabel'
import {useRouter} from 'next/router'
import CourseContent from '../../components/domain/course/CourseContent'
import PageContentWrapper from '../../components/PageContentWrapper'
import NavBar from '../../components/NavBar'


type Props = {
  courseOverview: CourseOverview
}

const CourseDetailPage: NextPage<Props> = ({courseOverview}: Props) => {
  return (
    <>
      <NavBar />
      <CourseDetailContent courseOverview={courseOverview} />
    </>
  )
}

const CourseDetailContent = ({courseOverview}: {courseOverview: CourseOverview}) => {
  // const {user, isLoading: isUserLoading} = useUser()

  // const location = useLocation()
  // const history = useHistory()
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

  const handleAuthorClicked = (authorId: number) => {
    router.push(`/author/${authorId}`)
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
      <BackLink to={'/courses'} text={'Späť na kurzy'} />
      <Flex justifyContent="space-between">
        <Flex direction="column" alignSelf="flex-start" alignItems="flex-start" gap="32px" style={{maxWidth: '50%'}}>
          <Heading variant="h1" normalWeight>{courseOverview.name}</Heading>
          <Text size="large">{courseOverview.shortDescription}</Text>
          <MarkdownView children={courseOverview.longDescription} />
          <Heading variant="h2" normalWeight>Obsah</Heading>
          <CourseContent course={courseOverview} />
          {/* TODO add course review is not finished */}
          {/* <CourseReviews courseId={courseOverview.id} /> */}
        </Flex>

        <CardFlex direction="column" gap="12px" alignSelf="flex-start">
          {renderThubmnailOrTrailer()}
          {/* {isUserLoading && <CircularProgress />} */}
          <LinkWrapper href={url} passHref>
            <StyledA>
              <StyledButton variant="accent">
                {courseOverview.userProgressMetadata ? 'pokračovať v kurze' : 'spustiť kurz'}
              </StyledButton>
            </StyledA>
          </LinkWrapper>
          {/* {!isUserLoading && user && <LinkWrapper href={url} passHref>
            <StyledA>
              <StyledButton variant="accent">
                {courseOverview.userProgressMetadata ? 'pokračovať v kurze' : 'spustiť kurz'}
              </StyledButton>
            </StyledA>
          </LinkWrapper>} */}
          {/* {!isUserLoading && !user && (
            <LinkWrapper href={`/login/${encodeURIComponent(location.pathname)}`} passHref>
              <StyledA>
                <StyledButton variant="accent">Pre spustenie kurzu sa najprv prihlás</StyledButton>
              </StyledA>
            </LinkWrapper>
          )} */}
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
            {/* TODO when course review is changed then reload this component */}
            <Flex direction="column" alignItems="flex-start" alignSelf="flex-start" gap="12px">
              <CourseInfoItem>
                <Rating readOnly value={courseOverview.reviewsOverview.averageRating} />
                <Text>({courseOverview.reviewsOverview.numberOfReviews})</Text>
              </CourseInfoItem>
              <CourseInfoItem clickable onClick={() => handleAuthorClicked(courseOverview.author.id)}>
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

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  align-self: stretch;
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

const StyledA = styled.a`
  text-decoration: none;
  color: unset;
`

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const response = await Api.authFetch(Api.courseOverviewUrl(context?.params?.id))

//   const courseOverview = await response.json() as CourseOverview

//   return {
//     props: {courseOverview}, // will be passed to the page component as props
//   }
// }

// toto je pre jeden kurz
export const getStaticProps: GetStaticProps = async (context) => {
  const response = await Api.noAuthFetch(Api.courseOverviewUrl(context?.params?.id))

  const courseOverview = await response.json() as CourseOverview

  return {
    props: {courseOverview}, // will be passed to the page component as props
  }
}

// tomuto povieme ze vsetky idecka ktore najdu v tom requeste tak nech to prebuildi na serveri a nachysta
export const getStaticPaths = async () => {
  const response = await Api.noAuthFetch(Api.coursesOverviewUrl())
  const courses = await response.json() as CourseOverview[]

  const ids = courses.map((course) => course.id)
  const paths = ids.map((id) => ({params: {id: id.toString()}}))

  return {
    paths,
    fallback: false,
  }
}

export default CourseDetailPage
