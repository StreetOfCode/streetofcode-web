import React, {useState} from 'react'
import styled from 'styled-components'
import {Post} from '../../../../wp/types'
import NextLink from '../../../core/NextLink'
import Flex from '../../../core/Flex'
import Heading from '../../../core/Heading'
import Text from '../../../core/Text'
import GridWrapper from '../GridWrapper'
import PostPreviewCard from '../PostPreviewCard'
import {routes} from '../../../../routes'
import PostTag from '../../buttons/PostTag'
import {createMapOfPostsByTag, getTopNTags} from '../postUtils'
import {TOP_TAGS_COUNT} from './clanky-constants'

type Props = {
  posts: Post[]
}

const ALL_TAG = 'všetky'

const BlogPosts = ({posts}: Props) => {
  const [selectedTag, setSelectedTag] = useState(ALL_TAG)
  const postsByTag = createMapOfPostsByTag(posts)
  const topTags = [ALL_TAG, ...getTopNTags(postsByTag, TOP_TAGS_COUNT)]

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
      <TagsFlex justifyContent="center" gap="12px">
        {topTags.map((tag, i) => (
          <PostTag
            key={i}
            tag={tag}
            handleOnClick={setSelectedTag}
            selected={tag === selectedTag}
          />
        ))}
      </TagsFlex>
      <GridWrapper>
        {(selectedTag === ALL_TAG ? posts : postsByTag.get(selectedTag))?.map(
          (post, i) => (
            <NextLink key={i} href={routes.clanky.slug(post.slug || '')}>
              <PostPreviewCard post={post} />
            </NextLink>
          ),
        )}
      </GridWrapper>
    </Flex>
  )
}

const TagsFlex = styled(Flex)`
  flex-wrap: wrap;
`

export default BlogPosts
