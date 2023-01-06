import React from 'react'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../../components/PageContentWrapper'
import {getAllPosts} from '../../../wp/api'
import {Post} from '../../../wp/types'
import NavBar from '../../../components/NavBar'
import {
  CATEGORY_NAME,
  PAGINATION_BY,
} from '../../../components/domain/post/podcast/podcast-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../../components/domain/pagination/PaginationWrapper'
import Podcasts from '../../../components/domain/post/podcast/Podcasts'
import Head from '../../../components/Head'

interface Props {
  posts: Post[]
  currentPage: number
  totalPages: number
}

const PaginatedPostsPage: NextPage<Props> = ({
  posts,
  currentPage,
  totalPages,
}) => {
  const router = useRouter()

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === 0) {
      router.push('/podcast')
    } else {
      router.push(`/podcast/stranka/${pageNumber + 1}`)
    }
  }

  return (
    <>
      <Head
        title="Podcast | Street of Code"
        description="Podcast o programovaní, softvérovom inžinierstve a niekedy aj o živote ako takom."
        url={`https://streetofcode.sk/podcast/stranka/${currentPage + 1}`}
      />
      <NavBar />
      <PageContentWrapper>
        <Podcasts posts={posts} />
        <PaginationWrapper
          forcePage={currentPage - 1}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
        />
      </PageContentWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const pageNumber = Number(context?.params?.pageNumber as string)

  const posts = await getAllPosts(CATEGORY_NAME)

  const totalPages = Math.ceil(posts.length / PAGINATION_BY)

  const currentPageindexStart = pageNumber - 1 * PAGINATION_BY
  const postsInPage = posts.slice(
    currentPageindexStart,
    currentPageindexStart + PAGINATION_BY,
  )

  return {
    props: {posts: postsInPage, totalPages, currentPage: pageNumber},
    revalidate: 600,
  }
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts(CATEGORY_NAME)

  const totalPages = Math.ceil(allPosts.length / PAGINATION_BY)

  const possiblePaths = []
  for (let i = 1; i < totalPages; i++) {
    // start from the second page
    possiblePaths.push(i + 1)
  }

  const paths = possiblePaths.map((pageNumber) => ({
    params: {pageNumber: pageNumber.toString()},
  }))

  return {
    paths,
    fallback: true,
  }
}

export default PaginatedPostsPage
