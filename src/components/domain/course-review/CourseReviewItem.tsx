import React from 'react'
import styled from 'styled-components'
import useEditItemActions from '../../../hooks/useEditItemActions'
import {CourseReview} from '../../../types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Rating from '../../core/Rating'
import EditCourseReview from './EditCourseReview'
import {useDeleteCourseReview} from '../../../api/courseReviews'
import {useAuth} from '../../../AuthUserContext'
import UserAvatar from '../user/UserAvatar'
import Loading from '../../Loading'

type CourseReviewItemProps = {
  className?: string
  review: CourseReview
  courseSlug: string
  allowUpdating?: boolean
}

const CourseReviewItem = ({
  className,
  review,
  courseSlug,
  allowUpdating,
}: CourseReviewItemProps) => {
  const {userId, isLoading} = useAuth()

  const deleteCourseReviewMutation = useDeleteCourseReview(
    review.id,
    review.courseId,
    courseSlug,
  )

  const onDelete = async () => {
    await deleteCourseReviewMutation.mutateAsync()
  }

  const isUpdatingAllowed = allowUpdating && review.userId === userId

  const [isEditing, onEdited, onEditCancelled, EditItemActions] =
    useEditItemActions({
      deleteAction: onDelete,
      dialogTitle: 'Zmazať hodnotenie?',
      disabled: !isUpdatingAllowed,
    })

  if (isLoading) return <Loading />

  return (
    <CourseReviewContainer
      className={className}
      review={review}
      courseSlug={courseSlug}
      isEditing={isEditing}
      onEdited={onEdited}
      onEditCancelled={onEditCancelled}
      EditItemActions={EditItemActions}
    />
  )
}

export const CourseReviewContainer = ({
  className,
  review,
  courseSlug,
  isEditing,
  onEdited,
  onEditCancelled,
  EditItemActions,
}: CourseReviewItemProps & {
  isEditing: boolean
  onEdited: () => void
  onEditCancelled: () => void
  EditItemActions: React.FC
}) => {
  return (
    <ReviewItem className={className}>
      <Flex gap="12px" alignSelf="stretch">
        <LeftColumn
          direction="column"
          alignSelf="flex-start"
          gap="8px"
          justifyContent="center"
        >
          <UserAvatar
            src={review.imageUrl || review.staticImage}
            name={review.userName}
            sizePx={42}
          />
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
        {isEditing && (
          <EditCourseReview
            review={review}
            onCancelled={onEditCancelled}
            onEdited={onEdited}
            courseSlug={courseSlug}
          />
        )}
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
  border: 1px solid var(--color-accent);
`

export default CourseReviewItem
