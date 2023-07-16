import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import {
  AiOutlineClockCircle,
  AiOutlineVideoCamera,
  AiOutlineQuestionCircle,
} from 'react-icons/ai'
import Flex from '../../core/Flex'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Rating from '../../core/Rating'
import Avatar from '../../core/Avatar'
import CircullarProgressWithLabel from '../../CircullarProgressWithLabel'
import DifficultyIcon from '../../../theme/icons/DifficultyIcon'
import {CourseOverview} from '../../../types'
import {
  formatDurationFromMinutes,
  getCourseProgressPercent,
  numOfLecturesText,
  numOfQuizzesText,
} from '../../../utils'
import {device} from '../../../theme/device'

const CourseCard = ({
  course,
  className,
}: {
  course: CourseOverview
  className?: string
}) => {
  let lecturesCount = 0
  let courseDuration = ''
  let quizzesCount = 0
  let progressValuePercent
  if (course != null) {
    lecturesCount = course.chapters
      .map((chapter) => chapter.lectures)
      .flat().length
    courseDuration = formatDurationFromMinutes(course.courseDurationMinutes)
    quizzesCount = course.chapters
      .flatMap((ch) => ch.lectures)
      .filter((le) => le.lectureType === 'QUIZ').length

    if (course.userProgressMetadata) {
      const progressData = course.userProgressMetadata
      progressValuePercent = getCourseProgressPercent(
        progressData.lecturesViewed,
        progressData.courseLecturesCount,
      )
    }
  }

  return (
    <WrapperFlex
      direction="column"
      justifyContent="space-between"
      className={className}
    >
      <Flex justifyContent="space-between" alignSelf="stretch">
        <PriceTag>
          <Text uppercase weight="bold" color="primary">
            ZADARMO
          </Text>
        </PriceTag>
        <RatingWrapper
          readOnly
          value={course.reviewsOverview.averageRating}
          customSize="28px"
        />
      </Flex>
      <Flex direction="column" gap="24px">
        <Flex direction="column" gap="8px">
          <Heading variant="h5" align="center" color="accent" uppercase>
            {course.name}
          </Heading>
          <Text align="center" size="small">
            {course.shortDescription}
          </Text>
        </Flex>
        <Flex direction="column" gap="12px">
          <CourseIconImageWrapper>
            <Image
              alt={`${course.name}`}
              src={course.iconUrl}
              layout="fill"
              priority
            />
          </CourseIconImageWrapper>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignSelf="stretch">
        <CourseInfoItemsWrapper
          direction="column"
          alignItems="flex-start"
          alignSelf="flex-start"
          gap="12px"
        >
          <CourseInfoItem>
            <DifficultyIcon difficultyLevel={course.difficulty.skillLevel} />
            <Text size="very-small">{course.difficulty?.name}</Text>
          </CourseInfoItem>
          <CourseInfoItem>
            <AiOutlineClockCircle />
            <Text size="very-small">{courseDuration}</Text>
          </CourseInfoItem>
        </CourseInfoItemsWrapper>
        <CourseInfoItemsWrapper
          direction="column"
          alignItems="flex-start"
          alignSelf="flex-start"
          gap="12px"
        >
          <CourseInfoItem>
            <AiOutlineVideoCamera />
            <Text size="very-small">
              {lecturesCount} {numOfLecturesText(lecturesCount)}
            </Text>
          </CourseInfoItem>
          {quizzesCount > 0 && (
            <CourseInfoItem>
              <AiOutlineQuestionCircle />
              <Text size="very-small">
                {quizzesCount} {numOfQuizzesText(quizzesCount)}
              </Text>
            </CourseInfoItem>
          )}
        </CourseInfoItemsWrapper>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        alignSelf="stretch"
        gap="12px"
      >
        <CourseInfoItem authorItem>
          <Avatar
            altName={course.author?.name}
            src={course.author?.imageUrl}
            sizePx={25}
          />
          <Text size="very-small">{course.author?.name}</Text>
        </CourseInfoItem>
        {progressValuePercent && (
          <ProgressWrapper value={progressValuePercent} accentColor />
        )}
      </Flex>
    </WrapperFlex>
  )
}

const PriceTag = styled.div`
  padding: 4px 12px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background-color: var(--color-accent);
  margin-left: -28px;

  @media ${device.S} {
    margin-left: -22px;
  }
`
const RatingWrapper = styled(Rating)`
  @media ${device.S} {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`

const WrapperFlex = styled(Flex)`
  width: 300px;
  aspect-ratio: 1 / 1.55;

  padding: 32px 24px;
  border-right: var(--color-accent) 4px solid;
  border-left: var(--color-accent) 4px solid;
  box-shadow: 0px 2px 2px var(--color-shadow), 0px -2px 2px var(--color-shadow);
  border-radius: 16px;
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: 250ms ease-in-out;
    box-shadow: 0px 4px 10px var(--color-shadow),
      0px -4px 10px var(--color-shadow);
  }

  @media ${device.S} {
    width: 250px;
    padding: 26px 18px;
    aspect-ratio: 1 / 1.65;
  }
`

const ProgressWrapper = styled(CircullarProgressWithLabel)`
  margin-top: 4px;
`

const CourseIconImageWrapper = styled.div`
  position: relative;
  width: 80px;
  aspect-ratio: 1;

  @media ${device.S} {
    width: 60px;
  }
`

const CourseInfoItemsWrapper = styled(Flex)`
  @media ${device.S} {
    gap: 8px;
  }
`

const CourseInfoItem = styled.div<{authorItem?: boolean}>`
  display: flex;
  gap: 8px;
  align-items: center;

  * {
    color: ${(props) =>
      props.authorItem
        ? 'var(--color-secondary)'
        : 'var(--color-course-info-icon)'};
  }

  svg {
    width: 28px;
    height: 28px;
  }
`

export default CourseCard
