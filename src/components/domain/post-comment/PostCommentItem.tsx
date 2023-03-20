import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import useEditItemActions from '../../../hooks/useEditItemActions'
import {PostComment} from '../../../types'
import {formatDateTime, subtractDates} from '../../../utils'
import {useDeletePostComment} from '../../../api/postComments'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import Text from '../../core/Text'
import Loading from '../../Loading'
import UserAvatar from '../user/UserAvatar'
import EditPostComment from './EditPostComment'
import {device} from '../../../theme/device'

type PostCommentItemProps = {
  postId: string
  comment: PostComment
}

const PostCommentItem = ({postId, comment}: PostCommentItemProps) => {
  const {userId, isLoading} = useAuth()

  const deletePostCommentMutation = useDeletePostComment(comment.id, postId)

  const onDelete = async () => {
    await deletePostCommentMutation.mutateAsync()
  }

  const isUpdatingAllowed = userId != null && comment.userId === userId

  const [isEditing, onEdited, onEditCancelled, EditItemActions] =
    useEditItemActions({
      deleteAction: onDelete,
      dialogTitle: 'Zmazať komentár?',
      disabled: !isUpdatingAllowed,
    })

  if (isLoading) return <Loading />

  return (
    <CommentItem>
      <Flex gap="12px" alignSelf="stretch">
        <LeftColumn
          direction="column"
          alignSelf="flex-start"
          gap="8px"
          justifyContent="center"
        >
          <UserAvatar
            src={comment.imageUrl}
            name={comment.userName || 'Anonym'}
            sizePx={42}
          />
          <EditItemActions />
        </LeftColumn>
        {!isEditing && (
          <CommentField>
            <Flex direction="column" alignItems="flex-start" gap="8px">
              <Flex
                justifyContent="space-between"
                alignSelf="stretch"
                alignItems="flex-start"
              >
                <Text size="very-small">{comment.userName || 'Anonym'}</Text>
                <CommentTimeWrapper
                  gap="6px"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Text size="very-small">
                    {formatDateTime(comment.createdAt)}
                  </Text>
                  {subtractDates(comment.updatedAt, comment.createdAt) >
                    500 && (
                    <Text size="very-small" color="secondary">
                      (upravené)
                    </Text>
                  )}
                </CommentTimeWrapper>
              </Flex>
              <MarkdownView children={comment.commentText} />
            </Flex>
          </CommentField>
        )}
        {isEditing && (
          <EditPostComment
            postId={postId}
            comment={comment}
            onCommentEdited={onEdited}
            onCancelled={onEditCancelled}
          />
        )}
      </Flex>
    </CommentItem>
  )
}

const CommentItem = styled.div`
  align-self: stretch;
`

const LeftColumn = styled(Flex)`
  width: 70px;
`

const CommentField = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-accent);
`

const CommentTimeWrapper = styled(Flex)`
  @media ${device.XS} {
    flex-direction: column;
    gap: 2px;
  }
`

export default PostCommentItem
