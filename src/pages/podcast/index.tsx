import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import {
  CATEGORY_NAME,
  EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL,
  PAGINATION_BY,
} from '../../components/domain/post/podcast/podcast-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../components/domain/pagination/PaginationWrapper'
import Podcasts from '../../components/domain/post/podcast/Podcasts'

interface Props {
  posts: Post[]
}

const Header = () => {
  return (
    <Head>
      <title>Podcast | Street of Code</title>
      <meta name="description">
        Podcast o programovaní, softvérovom inžinierstve a niekedy aj o živote
        ako takom.
      </meta>
      <meta property="og:locale" content="sk_SK" />
      <meta property="og:title" content="Podcast | Street of Code" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Podcast o programovaní, softvérovom inžinierstve a niekedy aj o živote ako takom."
      />
      <meta property="og:image" content={EMPTY_PODCAST_IMAGE_PLACEHOLDER_URL} />
      <meta property="og:image:alt" content="Thumbnail podcastu" />
      <meta property="og:site_name" content="Street of Code" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@StreetofCode1" />
    </Head>
  )
}

const PodcastsPage: NextPage<Props> = ({posts}) => {
  const router = useRouter()
  const firstPagePosts = posts.slice(0, PAGINATION_BY)

  const handlePageClick = (pageNumber: number) => {
    router.push(`/podcast/stranka/${pageNumber + 1}`)
  }

  const numberOfPossiblePages = Math.ceil(posts.length / PAGINATION_BY)

  return (
    <>
      <Header />
      <NavBar />
      <PageContentWrapper>
        <Podcasts posts={firstPagePosts} />
        <PaginationWrapper
          handlePageClick={handlePageClick}
          totalPages={numberOfPossiblePages}
          forcePage={0}
        />
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
