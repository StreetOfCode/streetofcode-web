import React from 'react'
import {Post} from '../../../../wp/types'
import NextLink from '../../../core/NextLink'
import Flex from '../../../core/Flex'
import Heading from '../../../core/Heading'
import Text from '../../../core/Text'
import GridWrapper from '../GridWrapper'
import PostPreviewCard from '../PostPreviewCard'
import {routes} from '../../../../routes'

type Props = {
  posts: Post[]
}

const BlogPosts = ({posts}: Props) => {
  return (
    <Flex direction="column" gap="36px">
      <Flex direction="column" gap="16px">
        <div>
          <Heading inline align="center" variant="h2">
            Naše
          </Heading>
          <Heading inline variant="h2" color="accent">
            {' '}
            články
          </Heading>
        </div>
        <Text align="center">
          Píšeme o všeličom. Tutorály, rozhovory, blogy.
        </Text>
      </Flex>
      <GridWrapper>
        {posts?.map((post, i) => (
          <NextLink key={i} href={routes.clanky.slug(post.slug || '')}>
            <PostPreviewCard post={post} />
          </NextLink>
        ))}
      </GridWrapper>
    </Flex>
  )
}

export default BlogPosts
