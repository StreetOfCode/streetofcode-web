import React from 'react'
import Head from 'next/head'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../../components/PageContentWrapper'
import {getAllPosts} from '../../../wp/api'
import {Post} from '../../../wp/types'
import NavBar from '../../../components/NavBar'
import {CATEGORY_NAME, PAGINATION_BY} from '../../../components/domain/post/podcasty-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../../components/domain/pagination/PaginationWrapper'
import PostPreview from '../../../components/domain/post/PostPreview'
import Flex from '../../../components/core/Flex'

interface Props {
  posts: Post[]
  currentPage: number
  totalPages: number
}

const Header = () => {
  return (
    <Head>
      <title>Street of Code | Podcasty</title>
      <meta name="description">Naučíme ťa programovať</meta>
    </Head>
  )
}

const PaginatedPostsPage: NextPage<Props> = ({posts, currentPage, totalPages}) => {
  const router = useRouter()

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === 0) {
      router.push('/podcasty')
    } else {
      router.push(`/podcasty/stranka/${pageNumber + 1}`)
    }
  }

  return (
    <>
      <Header />
      <NavBar />
      <PageContentWrapper>
        <Flex direction="column" gap="72px" alignItems="flex-start">
          {posts && posts.map((post, i) => (
            <PostPreview key={i} post={post} isPodcast />
          ))}
        </Flex>
        <PaginationWrapper forcePage={currentPage - 1} handlePageClick={handlePageClick} totalPages={totalPages} />
      </PageContentWrapper>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const pageNumber = context?.params?.pageNumber as string

  const posts = await getAllPosts(CATEGORY_NAME)

  const totalPages = Math.ceil(posts.length / PAGINATION_BY)

  const currentPageindexStart = (Number(pageNumber) - 1) * PAGINATION_BY
  const postsInPage = posts.slice(currentPageindexStart, currentPageindexStart + PAGINATION_BY)

  return {
    props: {posts: postsInPage, totalPages, currentPage: Number(pageNumber)},
    revalidate: 600,
  }
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts(CATEGORY_NAME)

  const totalPages = Math.ceil(allPosts.length / PAGINATION_BY)

  const possiblePaths = []
  for (let i = 1; i < totalPages; i++) { // start from the second page
    possiblePaths.push(i + 1)
  }

  const paths = possiblePaths.map(
    (pageNumber) => ({params: {pageNumber: pageNumber.toString()}}),
  )

  return {
    paths,
    fallback: true,
  }
}

export default PaginatedPostsPage
