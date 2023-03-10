import React from 'react'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import {CATEGORY_NAME} from '../../components/domain/post/podcast/podcast-constants'
import Podcasts from '../../components/domain/post/podcast/Podcasts'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'

interface Props {
  posts: Post[]
}

const PodcastsPage: NextPage<Props> = ({posts}) => {
  return (
    <>
      <Head
        title="Podcast | Street of Code"
        description="Podcast o programovaní, softvérovom inžinierstve a niekedy aj o živote ako takom."
        url={prefixWithHost(routes.podcast.index)}
      />
      <NavBar />
      <PageContentWrapper>
        <Podcasts posts={posts} />
      </PageContentWrapper>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getAllPosts(CATEGORY_NAME)

  return {
    props: {posts},
    revalidate: 600,
  }
}

export default PodcastsPage
