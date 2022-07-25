import React from 'react'
import styled from 'styled-components'
import useEditItemActions from '../../../hooks/useEditItemActions'
import {CourseReview} from '../../../types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Rating from '../../core/Rating'
import EditCourseReview from './EditCourseReview'
import {useDeleteCourseReview} from '../../api/courseReviews'
import {useAuth} from '../../../AuthUserContext'
import UserAvatar from '../user/UserAvatar'
import Loading from '../../Loading'

type CourseReviewItemProps = {
  review: CourseReview
  courseSlug: string
}

const CourseReviewItem = ({review, courseSlug}: CourseReviewItemProps) => {
  const {userId, isLoading} = useAuth()

  const deleteCourseReviewMutation = useDeleteCourseReview(review.id, review.courseId, courseSlug)

  const onDelete = async () => {
    await deleteCourseReviewMutation.mutateAsync()
  }

  const isUpdatingAllowed = review.userId === userId

  const [isEditing, onEdited, onEditCancelled, EditItemActions] = useEditItemActions({
    deleteAction: onDelete,
    dialogTitle: 'Zmazať hodnotenie?',
    disabled: !isUpdatingAllowed,
  })

  if (isLoading) return <Loading />

  return (
    <ReviewItem>
      <Flex gap="12px" alignSelf="stretch">
        <LeftColumn direction="column" alignSelf="stretch" gap="8px" justifyContent="center">
          <UserAvatar imageUrl={review.imageUrl} name={review.userName} sizePx={42} />
          <EditItemActions />
        </LeftColumn>
        {!isEditing && (
          <ReviewField>
            <Flex direction="column" alignItems="flex-start" gap="8px">
              <Flex justifyContent="space-between" alignSelf="stretch">
                <Rating readOnly value={review.rating} />
                <Text size="very-small">{review.userName}</Text>
              </Flex>
              <Text>{review.text}</Text>
            </Flex>
          </ReviewField>
        )}
        {isEditing &&
          <EditCourseReview review={review} onCancelled={onEditCancelled} onEdited={onEdited} courseSlug={courseSlug} />
        }
      </Flex>
    </ReviewItem>

  )
}

const ReviewItem = styled.div`
  align-self: stretch;
`

const LeftColumn = styled(Flex)`
  width: 70px;
`

const ReviewField = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.accentColor};
`

export default CourseReviewItem
