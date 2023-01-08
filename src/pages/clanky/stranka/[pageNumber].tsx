import React from 'react'
import {GetStaticProps, NextPage} from 'next'
import PageContentWrapper from '../../../components/PageContentWrapper'
import {getAllPosts} from '../../../wp/api'
import {Post} from '../../../wp/types'
import NavBar from '../../../components/NavBar'
import {
  CATEGORY_NAME,
  ITEMS_PER_PAGE,
} from '../../../components/domain/post/blog/clanky-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../../components/domain/pagination/PaginationWrapper'
import BlogPosts from '../../../components/domain/post/blog/BlogPosts'
import Head from '../../../components/Head'
import {prefixWithHost, routes} from '../../../routes'
import {getPagePaths, getCurrentPageItems} from '../../../paginationUtils'

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
      router.push(routes.clanky.index)
    } else {
      router.push(routes.clanky.stranka(pageNumber + 1))
    }
  }

  return (
    <>
      <Head
        title="Články | Street of Code"
        description="Píšeme o všeličom. Tutorály, rozhovory, blogy."
        url={prefixWithHost(routes.clanky.stranka(currentPage + 1))}
      />
      <NavBar />
      <PageContentWrapper>
        <BlogPosts posts={posts} />
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
  const currentPage = Number(context?.params?.pageNumber as string)

  const posts = await getAllPosts(CATEGORY_NAME)

  const {pageItems, totalPages} = getCurrentPageItems(
    posts,
    currentPage,
    ITEMS_PER_PAGE,
  )

  return {
    props: {posts: pageItems, totalPages, currentPage},
    revalidate: 600,
  }
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts(CATEGORY_NAME)

  const paths = getPagePaths(allPosts.length, ITEMS_PER_PAGE)

  return {
    paths,
    fallback: true,
  }
}

export default PaginatedPostsPage
