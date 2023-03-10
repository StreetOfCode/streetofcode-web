import React from 'react'
import {Post} from '../../../../wp/types'
import NextLink from '../../../core/NextLink'
import Flex from '../../../core/Flex'
import Heading from '../../../core/Heading'
import GridWrapper from '../GridWrapper'
import PostPreviewCard from '../PostPreviewCard'
import {routes} from '../../../../routes'
import {getTagFromUrlParam} from '../postUtils'

type Props = {
  tag: string
  posts: Post[]
}

const TagBlogPosts = ({tag, posts}: Props) => {
  if (posts.length === 0) {
    return <></>
  }

  tag = getTagFromUrlParam(tag, posts[0])
  return (
    <Flex direction="column" gap="36px">
      <div>
        <Heading inline align="center" variant="h2">
          {tag}
        </Heading>
        <Heading inline variant="h2" color="accent">
          {' '}
          články
        </Heading>
      </div>
      <GridWrapper>
        {posts.map((post, i) => (
          <NextLink key={i} href={routes.clanky.slug(post.slug || '')}>
            <PostPreviewCard post={post} />
          </NextLink>
        ))}
      </GridWrapper>
    </Flex>
  )
}

export default TagBlogPosts
