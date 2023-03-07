import React from 'react'
import parse, {Element, Text as HtmlParserText} from 'html-react-parser'
import styled from 'styled-components'
import {Maybe, Post} from '../../../wp/types'
import Flex from '../../core/Flex'
import {device} from '../../../theme/device'
import SyntaxHighlighter from '../../SyntaxHighlighter'
import {routes} from '../../../routes'
import AuthorAndDate from './AuthorAndDate'
import PostComments from '../post-comment/PostComments'
import Tag from '../buttons/Tag'
import {convertTagToUrlParam} from '../../../utils'
import NextLink from '../../core/NextLink'
import Heading from '../../core/Heading'
import GridWrapper from './GridWrapper'
import RecommendedPostPreview from './RecommendedPostPreview'

type Props = {
  className?: string
  isPodcast?: boolean
  post: Post
  recommendedPosts: Post[]
}

/***
 * Works with blog posts and podcasts.
 */
const PostView = ({className, isPodcast, post, recommendedPosts}: Props) => {
  const authorName = post.author
    ? post.author.node?.firstName && post.author.node.lastName
      ? `${post.author.node.firstName} ${post.author.node.lastName}`
      : post.author.node?.name
    : null

  post.content = redirectLinks(post.content)

  const postContentElements = parse(post.content || '', {
    replace: (domNode) => {
      // Code in `pre` tags wasn't being "line folded" and so an article
      // containing a long line of code would be zoomed out so that line
      // would fit onto the display's width. In addition there was no syntax
      // highlighting. So we replace those elements with `react-syntax-highlighter`
      // which wraps lines as expected and also provides syntax highlighting.
      if (domNode instanceof Element && domNode.name === 'pre') {
        if (domNode.children.length === 0) {
          return null
        }

        return (
          <SyntaxHighlighter
            language={
              'data-enlighter-language' in domNode.attribs
                ? domNode.attribs['data-enlighter-language']
                : ''
            }
          >
            {(domNode.children[0] as HtmlParserText).data}
          </SyntaxHighlighter>
        )
      } else if (domNode instanceof Element && domNode.name === 'figure') {
        domNode.attribs['style'] = 'max-width: 100%'
        return domNode
      }

      return null
    },
  })

  return (
    <FlexWrapper
      className={className}
      direction="column"
      gap="12px"
      alignItems="flex-start"
    >
      <StyledPostTitle>{post.title}</StyledPostTitle>
      <AuthorAndTagsWrapper gap="16px">
        <AuthorAndDateWrapper>
          <AuthorAndDate
            date={post.date || undefined}
            authorName={authorName || undefined}
            isPodcast={isPodcast}
          />
        </AuthorAndDateWrapper>
        <TagsFlex justifyContent="center" gap="8px">
          {post.tags?.nodes?.map(
            (tag, i) =>
              tag?.name && (
                <NextLink
                  key={i}
                  href={routes.clanky.tag(convertTagToUrlParam(tag.name))}
                  blankTarget
                >
                  <Tag size="small" tag={tag?.name} selected={false} />
                </NextLink>
              ),
          )}
        </TagsFlex>
      </AuthorAndTagsWrapper>
      {post.content && <PostContent>{postContentElements}</PostContent>}
      <PostComments postId={post.id} postTitle={post.title || 'empty'} />
      {recommendedPosts.length > 0 && (
        <>
          <Heading variant="h4">Čítaj ďalej</Heading>
          <RecommendedPostsWrapper>
            {recommendedPosts.map((post, i) => (
              <NextLink key={i} href={routes.clanky.slug(post.slug || '')}>
                <RecommendedPostPreview post={post} />
              </NextLink>
            ))}
          </RecommendedPostsWrapper>
        </>
      )}
    </FlexWrapper>
  )
}

/***
 * Redirect links to our podcasts and blogs.
 * Some links have https, some http.
 */
const redirectLinks = (content: Maybe<string> | undefined) => {
  const linksToRedirect = [
    {
      originalUrl: 'https://wp.streetofcode.sk/podcast',
      newUrl: routes.podcast.index,
    },
    {
      originalUrl: 'http://wp.streetofcode.sk/podcast',
      newUrl: routes.podcast.index,
    },
    {
      originalUrl: 'https://wp.streetofcode.sk/blog',
      newUrl: routes.clanky.index,
    },
    {
      originalUrl: 'http://wp.streetofcode.sk/blog',
      newUrl: routes.clanky.index,
    },
  ]

  for (const {originalUrl, newUrl} of linksToRedirect) {
    content = content?.replaceAll(originalUrl, newUrl)
  }

  return content
}

const AuthorAndTagsWrapper = styled(Flex)`
  @media ${device.S} {
    align-self: left;
    align-items: flex-start;
    flex-direction: column;
  }
`

const FlexWrapper = styled(Flex)`
  width: clamp(320px, 100%, 750px);
  margin: 0 auto;
`

const AuthorAndDateWrapper = styled.div`
  flex-shrink: 0;
`

// Special case when we don't want tu use our Heading component
const StyledPostTitle = styled.h1`
  font-size: 42px;
  font-weight: bold;
  color: var(--color-secondary);

  @media ${device.S} {
    font-size: 32px;
  }
`

const TagsFlex = styled(Flex)`
  flex-wrap: wrap;
  padding: 8px 0;
`

const PostContent = styled.div`
  max-width: 100%;

  line-height: 1.6em;
  font-size: 18px;
  font-weight: 100;

  color: var(--color-secondary);

  p:first-of-type {
    margin-top: 0;
  }

  p {
    width: 100%;
    margin-bottom: 30px;
    padding: 0;

    audio {
      margin: 14px 0;
    }

    > * {
      max-width: 100%;
    }
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 10px;
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

  // youtube video
  @media ${device.XS} {
    iframe {
      width: 240px;
      height: 135px;
    }

    code {
      display: inline-block;
      overflow: scroll;
      vertical-align: middle;
      padding-bottom: 4px;
    }
  }
`

const RecommendedPostsWrapper = styled(GridWrapper)`
  @media ${device.L} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.M} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.S} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.XS} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default PostView
