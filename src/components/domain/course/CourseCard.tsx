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
      <Flex direction="column" gap="24px">
        <Flex direction="column" gap="8px">
          <Heading variant="h5" align="center" normalWeight>
            {course.name}
          </Heading>
          <Text align="center">{course.shortDescription}</Text>
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
          <Rating readOnly value={course.reviewsOverview.averageRating} />
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
            <Text size="small">{course.difficulty?.name}</Text>
          </CourseInfoItem>
          <CourseInfoItem>
            <AiOutlineClockCircle />
            <Text size="small">{courseDuration}</Text>
          </CourseInfoItem>
          <CourseInfoItem>
            <AiOutlineVideoCamera />
            <Text size="small">
              {lecturesCount} {numOfLecturesText(lecturesCount)}
            </Text>
          </CourseInfoItem>
          {quizzesCount > 0 && (
            <CourseInfoItem>
              <AiOutlineQuestionCircle />
              <Text size="small">
                {quizzesCount} {numOfQuizzesText(quizzesCount)}
              </Text>
            </CourseInfoItem>
          )}
        </CourseInfoItemsWrapper>
        <Flex
          direction="column"
          alignItems="flex-start"
          alignSelf="flex-end"
          gap="12px"
        >
          {progressValuePercent && (
            <CircullarProgressWithLabel
              value={progressValuePercent}
              accentColor
            />
          )}
          <CourseInfoItem>
            <Avatar
              altName={course.author?.name}
              src={course.author?.imageUrl}
              sizePx={25}
            />
            <Text size="small">{course.author?.name}</Text>
          </CourseInfoItem>
        </Flex>
      </Flex>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  width: 300px;
  aspect-ratio: 1 / 1.5;

  padding: 1em 0.5em;
  border: var(--color-accent) 2px solid;
  border-radius: 22px;
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px var(--color-shadow);
  }

  @media ${device.S} {
    width: 250px;
    aspect-ratio: 1 / 1.6;

    &:hover {
      transform: unset;
      transition: unset;
      box-shadow: unset;
    }
  }
`

const CourseIconImageWrapper = styled.div`
  position: relative;
  width: 100px;
  aspect-ratio: 1;

  @media ${device.S} {
    width: 75px;
  }
`

const CourseInfoItemsWrapper = styled(Flex)`
  @media ${device.S} {
    gap: 8px;
  }
`

const CourseInfoItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;
    color: var(--color-secondary);
  }
`

export default CourseCard
