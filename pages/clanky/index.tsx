import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import {
  CATEGORY_NAME,
  PAGINATION_BY,
} from '../../components/domain/post/clanky-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../components/domain/pagination/PaginationWrapper'
import Flex from '../../components/core/Flex'
import PostPreview from '../../components/domain/post/PostPreview'

interface Props {
  posts: Post[]
}

const Header = () => {
  return (
    <Head>
      <title>Street of Code | Články</title>
      <meta name="description">Naučíme ťa programovať</meta>
    </Head>
  )
}

const PostsPage: NextPage<Props> = ({posts}) => {
  const router = useRouter()
  const firstPagePosts = posts.slice(0, PAGINATION_BY)

  const handlePageClick = (pageNumber: number) => {
    router.push(`/clanky/stranka/${pageNumber + 1}`)
  }

  const numberOfPossiblePages = Math.ceil(posts.length / PAGINATION_BY)

  return (
    <>
      <Header />
      <NavBar />
      <PageContentWrapper>
        <Flex direction="column" gap="72px" alignItems="flex-start">
          {firstPagePosts &&
            firstPagePosts.map((post, i) => (
              <PostPreview key={i} post={post} />
            ))}
        </Flex>
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

export default PostsPage
