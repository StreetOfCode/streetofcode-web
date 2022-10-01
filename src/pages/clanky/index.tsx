import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import {getAllPosts} from '../../wp/api'
import {Post} from '../../wp/types'
import NavBar from '../../components/NavBar'
import {
  CATEGORY_NAME,
  EMPTY_BLOG_IMAGE_PLACEHOLDER_URL,
  PAGINATION_BY,
} from '../../components/domain/post/blog/clanky-constants'
import {useRouter} from 'next/router'
import PaginationWrapper from '../../components/domain/pagination/PaginationWrapper'
import BlogPosts from '../../components/domain/post/blog/BlogPosts'

interface Props {
  posts: Post[]
}

const Header = () => {
  return (
    <Head>
      <title>Články | Street of Code</title>
      <meta name="description">
        Píšeme o všeličom. Tutorály, rozhovory, blogy.
      </meta>
      <meta property="og:locale" content="sk_SK" />
      <meta property="og:title" content="Podcast | Street of Code" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Píšeme o všeličom. Tutorály, rozhovory, blogy."
      />
      <meta property="og:image" content={EMPTY_BLOG_IMAGE_PLACEHOLDER_URL} />
      <meta property="og:image:alt" content="Street of Code logo" />
      <meta property="og:site_name" content="Street of Code" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@StreetofCode1" />
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
        <BlogPosts posts={firstPagePosts} />
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
