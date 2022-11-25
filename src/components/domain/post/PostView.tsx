import React from 'react'
import parse, {Element, Text as HtmlParserText} from 'html-react-parser'
import styled from 'styled-components'
import {Maybe, Post} from '../../../wp/types'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import Heading from '../../core/Heading'
import {formatDate} from '../../../utils'
import {device} from '../../../theme/device'
import SyntaxHighlighter from '../../SyntaxHighlighter'

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
    <WrapperFlex
      className={className}
      direction="column"
      gap="12px"
      alignItems="flex-start"
    >
      {post.date && <Text size="small">{formatDate(new Date(post.date))}</Text>}
      <Heading variant="h2">{post.title}</Heading>
      {post.content && <PostContent>{postContentElements}</PostContent>}
      {!isPodcast && authorName && <Text weight="bold">{authorName}</Text>}
    </WrapperFlex>
  )
}

/***
 * Redirect links to our podcasts and blogs.
 * Some links have https, some http.
 */
const redirectLinks = (content: Maybe<string> | undefined) => {
  const linksToRedirect = [
    {originalUrl: 'https://wp.streetofcode.sk/podcast', newUrl: '/podcast'},
    {originalUrl: 'http://wp.streetofcode.sk/podcast', newUrl: '/podcast'},
    {originalUrl: 'https://wp.streetofcode.sk/blog', newUrl: '/clanky'},
    {originalUrl: 'http://wp.streetofcode.sk/blog', newUrl: '/clanky'},
  ]

  for (const {originalUrl, newUrl} of linksToRedirect) {
    content = content?.replaceAll(originalUrl, newUrl)
  }

  return content
}

const PostContent = styled.div`
  max-width: 100%;

  color: ${(props) => props.theme.secondaryColor};

  p {
    width: 100%;
    margin: 28px 0;

    audio {
      margin: 14px 0;
    }

    > * {
      max-width: 100%;
    }
  }

  code {
    display: inline-block;
    overflow: scroll;
    vertical-align: middle;
    padding-bottom: 4px;
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
  }
`

const WrapperFlex = styled(Flex)`
  max-width: 900px;
`

export default PostView
