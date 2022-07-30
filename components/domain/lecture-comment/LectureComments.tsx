import React from 'react'
import styled from 'styled-components'
import {LectureComment} from '../../../types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import AddLectureComment from './AddLectureComment'
import LectureCommentItem from './LectureCommentItem'
import {QueryGuard} from '../../../QueryGuard'
import {useGetLectureComments} from '../../api/lectureComments'
import {useAuth} from '../../../AuthUserContext'
import Loading from '../../Loading'
import {device} from '../../../theme/device'

type LectureCommentsProps = {
  lectureId: number
}

const LectureComments = ({lectureId}: LectureCommentsProps) => {
  const {userId, isLoading} = useAuth()

  const canAddComment = !!userId

  const useLectureComments = useGetLectureComments(lectureId)

  if (isLoading) return <Loading />

  return (
    <QueryGuard {...useLectureComments}>
      {(lectureComments) => {
        return (
          <LectureCommentsContent
            lectureId={lectureId}
            lectureComments={lectureComments}
            canAddComment={canAddComment}
          />
        )
      }}
    </QueryGuard>
  )
}

const LectureCommentsContent = ({
  lectureId,
  lectureComments,
  canAddComment,
}: {
  lectureId: number
  lectureComments: LectureComment[]
  canAddComment: boolean
}) => {
  return (
    <WrapperFlex direction="column"  gap="32px">
      <Flex gap="16px" alignSelf="flex-start">
        <Heading variant="h3" normalWeight>Komentáre</Heading>
        <Text>({lectureComments.length})</Text>
      </Flex>

      {canAddComment &&
        <AddLectureComment lectureId={lectureId} />
      }

      <Flex direction="column" gap="16px" alignSelf="stretch">
        {lectureComments.map((lectureComment) => (
          <LectureCommentItem
            key={lectureComment.id}
            lectureId={lectureId}
            comment={lectureComment}
          />
        ))}
      </Flex>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  width: 500px;

  @media ${device.tablet} {
    width: 400px;
  }

  @media ${device.mobile} {
    width: 100%;
  }
`


export default LectureComments
