import React from 'react'
import NextLink from '../../core/NextLink'
import Flex from '../../core/Flex'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import GridWrapper from '../../GridWrapper'
import {routes} from '../../../routes'
import {YouTubeVideo} from '../../../types'
import YouTubePreviewCard from '../youtube/YouTubePreviewCard'

type Props = {
  videos: YouTubeVideo[]
}

const YouTubeVideos = ({videos}: Props) => {
  return (
    <Flex direction="column" gap="36px">
      <Flex direction="column" gap="16px">
        <div>
          <Heading inline align="center" variant="h2">
            Naše
          </Heading>
          <Heading inline variant="h2" color="accent">
            {' '}
            YouTube videá
          </Heading>
        </div>
        <Text align="center">
          Robíme videá o všeličom. Javascript, Python, CSS, úvahy programátora,
          tipy pre programátorov atď.
        </Text>
        <a href="https://www.youtube.com/@streetofcode" target="_blank">
          Náš YouTube kanál nájdeš tu!
        </a>
      </Flex>
      <GridWrapper>
        {videos.map((video, i) => (
          <NextLink key={i} href={routes.videa.slug(video.id || '')}>
            <YouTubePreviewCard video={video} />
          </NextLink>
        ))}
      </GridWrapper>
    </Flex>
  )
}

export default YouTubeVideos
