import React from 'react'
import styled from 'styled-components'
import {Maybe, Post} from '../../../wp/types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import {formatDate} from '../../../utils'

type Props = {
  className?: string
  isPodcast?: boolean
  post: Post
}

/***
 * Works with blog posts and podcasts.
 */
const PostView = ({className, isPodcast, post}: Props) => {
  const authorName = post.author
    ? post.author.node?.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node?.name
    : null

  post.content = redirectLinks(post.content)

  return (
    <WrapperFlex
      className={className}
      direction="column"
      gap="12px"
      alignItems="flex-start"
    >
      {post.date && <Text size="small">{formatDate(new Date(post.date))}</Text>}
      <Heading variant="h2">{post.title}</Heading>
      {post.content && (
        <Text size="large" dangerouslySetInnerHTML={{__html: post.content}} />
      )}
      {!isPodcast && authorName && <Text weight="bold">{authorName}</Text>}
    </WrapperFlex>
  )
}

/***
 * Redirect links to our podcasts and blogs.
 * Some links have https, some http.
 * TODO: We could possibly do this via .htaccess
 */
const redirectLinks = (content: Maybe<string> | undefined) => {
  if (!content) {
    return content
  }

  for (const splitted of content.split('a href="')) {
    if (splitted.startsWith('https://streetofcode.sk/podcast/')) {
      const link = splitted.substring(0, splitted.indexOf('/"'))
      const updatedLink = link
        .replace('podcast', 'podcasty')
        .replace('https://streetofcode.sk', '')
      content = content.replace(link, updatedLink)
      continue
    }

    if (splitted.startsWith('http://streetofcode.sk/podcast/')) {
      const link = splitted.substring(0, splitted.indexOf('/"'))
      const updatedLink = link
        .replace('podcast', 'podcasty')
        .replace('http://streetofcode.sk', '')
      content = content.replace(link, updatedLink)
      continue
    }

    if (splitted.startsWith('https://streetofcode.sk/blog/')) {
      const link = splitted.substring(0, splitted.indexOf('/"'))
      const updatedLink = link
        .replace('blog', 'clanky')
        .replace('https://streetofcode.sk', '')
      content = content.replace(link, updatedLink)
      continue
    }

    if (splitted.startsWith('http://streetofcode.sk/blog/')) {
      const link = splitted.substring(0, splitted.indexOf('/"'))
      const updatedLink = link
        .replace('blog', 'clanky')
        .replace('http://streetofcode.sk', '')
      content = content.replace(link, updatedLink)
      continue
    }
  }

  return content
}

const WrapperFlex = styled(Flex)`
  max-width: 900px;

  p {
    width: 100%;
    margin: 28px 0;

    audio {
      margin: 14px 0;
    }
  }

  // youtube video
  @media (max-width: 610px) {
    iframe {
      width: 400px;
      height: 225px;
    }
  }

  // youtube video
  @media (max-width: 450px) {
    iframe {
      width: 320px;
      height: 180px;
    }
  }
`

export default PostView
