import React from 'react'
import {Post} from '../../../../wp/types'
import NextLink from '../../../core/NextLink'
import Flex from '../../../core/Flex'
import Heading from '../../../core/Heading'
import Text from '../../../core/Text'
import GridWrapper from '../GridWrapper'
import PostPreviewCard from '../PostPreviewCard'

type Props = {
  posts: Post[]
}

const Podcasts = ({posts}: Props) => {
  return (
    <Flex direction="column" gap="36px">
      <Flex direction="column" gap="16px">
        <div>
          <Heading inline align="center" variant="h2">
            Náš
          </Heading>
          <Heading inline variant="h2" color="accent">
            {' '}
            podcast
          </Heading>
        </div>
        <Text align="center">
          O programovaní, softvérovom inžinierstve a niekedy aj o živote ako
          takom.
        </Text>
      </Flex>
      <GridWrapper>
        {posts?.map((post, i) => (
          <NextLink key={i} href={`/podcast/${post.slug}`}>
            <PostPreviewCard isPodcast post={post} />
          </NextLink>
        ))}
      </GridWrapper>
    </Flex>
  )
}

export default Podcasts
