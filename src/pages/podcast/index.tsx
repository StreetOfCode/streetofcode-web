import React from 'react'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import {
  CATEGORY_NAME,
  PAGINATION_BY,
} from '../../components/domain/post/podcast/podcast-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../components/domain/pagination/PaginationWrapper'
import Podcasts from '../../components/domain/post/podcast/Podcasts'
import Head from '../../components/Head'

interface Props {
  posts: Post[]
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
      <Head
        title="Podcast | Street of Code"
        description="Podcast o programovaní, softvérovom inžinierstve a niekedy aj o živote ako takom."
        url="https://streetofcode.sk/podcast"
      />
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
