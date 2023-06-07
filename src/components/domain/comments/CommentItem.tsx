import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import useEditItemActions from '../../../hooks/useEditItemActions'
import {Comment, CommentEditRequest} from '../../../types'
import {formatDate, formatDateTime} from '../../../utils'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import Text from '../../core/Text'
import Loading from '../../Loading'
import UserAvatar from '../user/UserAvatar'
import {device} from '../../../theme/device'
import {UseMutationResult} from 'react-query'
import EditableComment from './EditableComment'

type CommentItemProps = {
  entityId: string
  comment: Comment
  useEditMutation: (
    commentId: number,
    entityId: string,
  ) => UseMutationResult<Comment, unknown, CommentEditRequest, unknown>
  useDeleteMutation: (
    commentId: number,
    entityId: string,
  ) => UseMutationResult<void, unknown, void, unknown>
}

const CommentItem = ({
  entityId,
  comment,
  useEditMutation,
  useDeleteMutation,
}: CommentItemProps) => {
  const {userId, isLoading} = useAuth()
  const editMutation = useEditMutation(comment.id, entityId)
  const deleteMutation = useDeleteMutation(comment.id, entityId)

  const isUpdatingAllowed = comment.userId === userId

  const [isEditing, onEdited, onEditCancelled, EditItemActions] =
    useEditItemActions({
      deleteAction: () => deleteMutation.mutateAsync(),
      dialogTitle: 'Zmazať komentár?',
      disabled: !isUpdatingAllowed,
    })

  if (isLoading) return <Loading />

  return (
    <CommentItemWrapper>
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
              <Flex justifyContent="space-between" alignSelf="stretch">
                <CommentTimeWrapper
                  gap="6px"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Text size="very-small">
                    {formatDateTime(comment.createdAt)}
                  </Text>
                  {comment.updatedAt > comment.createdAt && (
                    <Text size="very-small">
                      (upravené {formatDate(comment.updatedAt)})
                    </Text>
                  )}
                </CommentTimeWrapper>
                <Text size="very-small">{comment.userName}</Text>
              </Flex>
              <MarkdownView children={comment.commentText} />
            </Flex>
          </CommentField>
        )}
        {isEditing && (
          <EditableComment
            initialText={comment.commentText}
            onEditCancelled={onEditCancelled}
            onSubmit={async ({commentText}: {commentText: string}) => {
              const comment = await editMutation.mutateAsync({commentText})
              onEdited()
              return comment
            }}
          />
        )}
      </Flex>
    </CommentItemWrapper>
  )
}

const CommentItemWrapper = styled.div`
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
  @media ${device.S} {
    flex-direction: column;
    gap: 2px;
  }
`

export default CommentItem
