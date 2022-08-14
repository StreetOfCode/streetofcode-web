import React from 'react'
import Head from 'next/head'
import {GetStaticProps, NextPage} from 'next'
import Text from '../../../components/core/Text'
import PageContentWrapper from '../../../components/PageContentWrapper'
import {getAllPosts} from '../../../wp/api'
import {Post} from '../../../wp/types'
import NavBar from '../../../components/NavBar'
import {PAGINATION_BY} from '../constants'
import NextLink from '../../../components/core/NextLink'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../../components/domain/pagination/PaginationWrapper'

interface Props {
  posts: Post[]
  currentPage: number
  totalPages: number
}

const Header = () => {
  return (
    <Head>
      <title>Street of Code | Články</title>
      <meta name="description">Naučíme ťa programovať</meta>
    </Head>
  )
}

const PaginatedPostsPage: NextPage<Props> = ({posts, currentPage, totalPages}) => {
  const router = useRouter()

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === 0) {
      router.push('/clanky')
    } else {
      router.push(`/clanky/stranka/${pageNumber + 1}`)
    }
  }

  return (
    <>
      <Header />
      <NavBar />
      <PageContentWrapper>
        {posts && posts.map((post, i) => (
          <NextLink key={i} href={`/clanky/${post.slug}`}>
            <Text>{post.title}</Text>
          </NextLink>
        ))}

        <PaginationWrapper forcePage={currentPage - 1} handlePageClick={handlePageClick} totalPages={totalPages} />
      </PageContentWrapper>
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const pageNumber = context?.params?.pageNumber as string

  const posts = await getAllPosts()

  const totalPages = Math.ceil(posts.length / PAGINATION_BY)

  const currentPageindexStart = (Number(pageNumber) - 1) * PAGINATION_BY
  const postsInPage = posts.slice(currentPageindexStart, currentPageindexStart + PAGINATION_BY)

  return {
    props: {posts: postsInPage, totalPages, currentPage: Number(pageNumber)},
    revalidate: 600,
  }
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts()

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
