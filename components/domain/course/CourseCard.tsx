import React from 'react'
import styled from 'styled-components'
import {AiOutlineClockCircle, AiOutlineVideoCamera, AiOutlineQuestionCircle} from 'react-icons/ai'
import Flex from '../../core/Flex'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Rating from '../../core/Rating'
import Avatar from '../../core/Avatar'
import CircullarProgressWithLabel from '../../CircullarProgressWithLabel'
import DifficultyIcon from '../../../theme/icons/DifficultyIcon'
import {CourseOverview} from '../../../types'
import {formatDurationFromMinutes, numOfLecturesText, numOfQuizzesText} from '../../../utils'

const CourseCard = ({course}: { course: CourseOverview }) => {
  let lecturesCount = 0
  let courseDuration = ''
  let quizzesCount = 0
  let progressValuePercent
  if (course != null) {
    lecturesCount = course.chapters.map((chapter) => chapter.lectures).flat().length
    courseDuration = formatDurationFromMinutes(course.courseDurationMinutes)
    quizzesCount = course.chapters.flatMap((ch) => ch.lectures).filter((le) => le.lectureType === 'QUIZ').length

    if (course.userProgressMetadata) {
      const progressData = course.userProgressMetadata
      progressValuePercent = (progressData.lecturesViewed / progressData.courseLecturesCount) * 100
    }
  }


  return (
    <WrapperFlex direction="column" justifyContent="space-between">
      <Flex direction="column" gap="24px">
        <Flex direction="column" gap="8px">
          <Heading variant="h4" align="center" normalWeight>{course.name}</Heading>
          <Text align="center">{course.shortDescription}</Text>
        </Flex>
        <Flex direction="column" gap="12px">
          <CourseImage loading="lazy" alt={`${course.name}`} src={course.iconUrl} />
          <Rating readOnly value={course.reviewsOverview.averageRating} />
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignSelf="stretch">
        <Flex direction="column" alignItems="flex-start" alignSelf="flex-start" gap="12px">
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
            <Text size="small">{lecturesCount} {numOfLecturesText(lecturesCount)}</Text>
          </CourseInfoItem>
          {quizzesCount > 0 && <CourseInfoItem>
            <AiOutlineQuestionCircle />
            <Text size="small">{quizzesCount} {numOfQuizzesText(quizzesCount)}</Text>
          </CourseInfoItem>}
        </Flex>
        <Flex direction="column" alignItems="flex-start" alignSelf="flex-end" gap="12px">
          {progressValuePercent && <CircullarProgressWithLabel value={progressValuePercent} accentColor />}
          <CourseInfoItem>
            <Avatar altName={course.author?.name} src={course.author?.imageUrl} />
            <Text size="small">{course.author?.name}</Text>
          </CourseInfoItem>

        </Flex>
      </Flex>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  width: 300px;
  height: 450px;
  padding: 1em 0.5em;
  border: ${(props) => props.theme.accentColor} 2px solid;
  border-radius: 22px;
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
  }
`

const CourseImage = styled.img`
  width: 100px;
  height: 100px;
`

const CourseInfoItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  svg, img {
    width: 25px;
    height: 25px;
    color: ${(props) => props.theme.secondaryColor};
  }
`


export default CourseCard
