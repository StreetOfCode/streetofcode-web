import React, {useState} from 'react'
import styled from 'styled-components'
import {Post} from '../../../../wp/types'
import NextLink from '../../../core/NextLink'
import Flex from '../../../core/Flex'
import Heading from '../../../core/Heading'
import Text from '../../../core/Text'
import GridWrapper from '../../../GridWrapper'
import PostPreviewCard from '../PostPreviewCard'
import {routes} from '../../../../routes'
import {createMapOfPostsByTag, getTopNTags} from '../postUtils'
import PostTag from '../../buttons/PostTag'
import {TOP_TAGS_COUNT} from './podcast-constants'

type Props = {
  posts: Post[]
}

const ALL_TAG = 'všetky'

const Podcasts = ({posts}: Props) => {
  const [selectedTag, setSelectedTag] = useState(ALL_TAG)
  const postsByTag = createMapOfPostsByTag(posts)
  const topTags = [ALL_TAG, ...getTopNTags(postsByTag, TOP_TAGS_COUNT)]

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
            <NextLink key={i} href={routes.podcast.slug(post.slug || '')}>
              <PostPreviewCard isPodcast post={post} />
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

export default Podcasts
