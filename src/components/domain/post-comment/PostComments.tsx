import React from 'react'
import {
  useAddPostComment,
  useDeletePostComment,
  useEditPostComment,
  useGetPostComments,
} from '../../../api/postComments'
import Comments from '../comments/Comments'

type PostCommentsProps = {
  postId: string
  postSlug: string
}

const PostComments = ({postId, postSlug}: PostCommentsProps) => {
  const getCommentsQuery = useGetPostComments(postId)
  const addCommentMutation = useAddPostComment(postId, postSlug)
  return (
    <Comments
      entityId={postId}
      allowAnonymous
      commentsQuery={getCommentsQuery}
      onAdd={({commentText}: {commentText: string}) =>
        addCommentMutation.mutateAsync({commentText})
      }
      useEditMutation={useEditPostComment}
      useDeleteMutation={useDeletePostComment}
    />
  )
}

export default PostComments
