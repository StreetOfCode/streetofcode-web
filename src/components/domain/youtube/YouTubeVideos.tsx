import React from 'react'
import NextLink from '../../core/NextLink'
import Flex from '../../core/Flex'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import GridWrapper from '../../GridWrapper'
import {routes} from '../../../routes'
import {YouTubeVideo} from '../../../types'
import YouTubePreviewCard from '../youtube/YouTubePreviewCard'
import TextField from '../../core/TextField'
import styled from 'styled-components'

type Props = {
  videos: YouTubeVideo[]
}

const YouTubeVideos = ({videos}: Props) => {
  const [filteredVideos, setFilteredVideos] =
    React.useState<YouTubeVideo[]>(videos)
  const [search, setSearch] = React.useState<string>('')

  React.useEffect(() => {
    if (!search) {
      setFilteredVideos(videos)
      return
    }

    setFilteredVideos(
      videos.filter((video) => {
        const title = video.snippet.title.toLowerCase()
        const description = video.snippet.description.toLowerCase()
        const searchLower = search.toLowerCase()
        return title.includes(searchLower) || description.includes(searchLower)
      }),
    )
  }, [search, videos])

  return (
    <Flex direction="column" gap="36px">
      <Flex direction="column" gap="16px">
        <HeaderWrapper>
          <Heading inline align="center" variant="h2">
            Naše
          </Heading>
          <Heading inline variant="h2" color="accent" align="center">
            {' '}
            YouTube videá
          </Heading>
        </HeaderWrapper>
        <Text align="center">
          Robíme videá o všeličom. Javascript, Python, CSS, úvahy programátora,
          tipy pre programátorov atď.
        </Text>
        <a href="https://www.youtube.com/@streetofcode" target="_blank">
          Náš YouTube kanál nájdeš tu!
        </a>
      </Flex>
      <SearchTextField
        text={search}
        onTextChanged={(e) => setSearch(e.target.value)}
        label="Filtrovať"
        disableMultiline
      />
      <GridWrapper>
        {filteredVideos.map((video, i) => (
          <NextLink key={i} href={routes.videa.slug(video.id || '')}>
            <YouTubePreviewCard video={video} />
          </NextLink>
        ))}
      </GridWrapper>
    </Flex>
  )
}

const HeaderWrapper = styled.div`
  text-align: center;
`

const SearchTextField = styled(TextField)`
  align-self: center;
  max-width: 300px;
`

export default YouTubeVideos
