import React from 'react'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import NavBar from '../../components/NavBar'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'
import {youtubeVideosUrl} from '../../api'
import {YouTubeVideo} from '../../types'
import YouTubeVideos from '../../components/domain/youtube/YouTubeVideos'

interface Props {
  videos: YouTubeVideo[]
}

const VideosPage: NextPage<Props> = ({videos}) => {
  return (
    <>
      <Head
        title="Videá | Street of Code"
        description="Robíme videá o všeličom. Javascript, Python, CSS, úvahy programátora, tipy pre programátorov atď."
        url={prefixWithHost(routes.clanky.index)}
      />
      <NavBar />
      <PageContentWrapper>
        <YouTubeVideos videos={videos} />
      </PageContentWrapper>
    </>
  )
}

export const getStaticProps = async () => {
  const videos = (await (
    await fetch(youtubeVideosUrl())
  ).json()) as YouTubeVideo[]

  return {
    props: {videos},
    revalidate: 600,
  }
}

export default VideosPage
