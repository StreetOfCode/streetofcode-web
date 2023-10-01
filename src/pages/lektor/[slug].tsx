import React from 'react'
import styled from 'styled-components'
import {AuthorOverview} from '../../types'
import Text from '../../components/core/Text'
import * as Api from '../../api'
import Flex from '../../components/core/Flex'
import Avatar from '../../components/core/Avatar'
import Heading from '../../components/core/Heading'
import Courses from '../../components/domain/course/Courses'
import {GetStaticProps, GetStaticPropsContext, NextPage} from 'next'
import {useAuth} from '../../AuthUserContext'
import {useGetAuthorOverview} from '../../api/authorOverview'
import PageContentWrapper from '../../components/PageContentWrapper'
import {useRouter} from 'next/router'
import NavBar from '../../components/NavBar'
import {QueryGuard, UserAndQueryGuard} from '../../QueryGuard'
import {device} from '../../theme/device'
import Head from '../../components/Head'
import {prefixWithHost, routes} from '../../routes'
import {useGetPostsByAuthor} from '../../wp/api'
import PostPreviewCard from '../../components/domain/post/PostPreviewCard'
import NextLink from '../../components/core/NextLink'
import GridWrapper from '../../components/GridWrapper'

type Props = {
  slug: string
  authorOverview: AuthorOverview | null
}

const AuthorPage: NextPage<Props> = ({slug, authorOverview}: Props) => {
  const {user} = useAuth()
  const getAuthorOverviewQuery = useGetAuthorOverview(slug, !!user)
  return (
    <UserAndQueryGuard
      user={user}
      fallbackData={authorOverview}
      fallbackComponent={
        <Heading variant="h1">Lektora sa nepodarilo načítať.</Heading>
      }
      {...getAuthorOverviewQuery}
    >
      {(_authorOverview) => {
        return (
          <>
            <Head
              title={`Lektor ${_authorOverview.name} | Street of Code`}
              description={`Street of Code lektor ${_authorOverview.name}`}
              url={prefixWithHost(routes.lektor.slug(_authorOverview.slug))}
              imageUrl={_authorOverview.imageUrl}
            />
            <NavBar />
            <AuthorPageContent authorOverview={_authorOverview} />
          </>
        )
      }}
    </UserAndQueryGuard>
  )
}

const AuthorPageContent = ({
  authorOverview,
}: {
  authorOverview: AuthorOverview
}) => {
  const authorPostsQuery = useGetPostsByAuthor(authorOverview?.name)
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <PageContentWrapper>
      <GoBackText size="small" onClick={handleGoBack}>
        &larr; Späť
      </GoBackText>
      <Flex direction="column" gap="32px">
        <AboutAuthorFlex alignSelf="flex-start" gap="32px">
          <Avatar
            altName={authorOverview.name}
            src={authorOverview.imageUrl}
            sizePx={250}
          />
          <Flex
            direction="column"
            gap="16px"
            alignSelf="flex-start"
            alignItems="flex-start"
          >
            <Heading variant="h3" withAccentUnderline normalWeight>
              {authorOverview.name}
            </Heading>
            <StyledDescription>{authorOverview.description}</StyledDescription>
            <Text size="small">
              Kontaktovať ma môžeš na {authorOverview.email}
            </Text>
          </Flex>
        </AboutAuthorFlex>
        {authorOverview.courses.length > 0 && (
          <Flex
            direction="column"
            gap="32px"
            alignSelf="flex-start"
            alignItems="flex-start"
          >
            <Heading variant="h4" withAccentUnderline normalWeight>
              {authorOverview.coursesTitle}
            </Heading>
            <Courses courses={authorOverview.courses} />
          </Flex>
        )}
        <QueryGuard {...authorPostsQuery}>
          {(authorPosts) => {
            return (
              <Flex
                direction="column"
                gap="32px"
                alignSelf="flex-start"
                alignItems="flex-start"
              >
                <Heading variant="h4" withAccentUnderline normalWeight>
                  Články
                </Heading>
                <GridWrapper>
                  {authorPosts?.map((post, i) => (
                    <NextLink
                      key={i}
                      href={routes.clanky.slug(post.slug || '')}
                    >
                      <PostPreviewCard post={post} />
                    </NextLink>
                  ))}
                </GridWrapper>
              </Flex>
            )
          }}
        </QueryGuard>
      </Flex>
    </PageContentWrapper>
  )
}

const GoBackText = styled(Text)`
  cursor: pointer;
  margin-bottom: 32px;
`
const StyledDescription = styled(Text)`
  max-width: 600px;
`

const AboutAuthorFlex = styled(Flex)`
  @media ${device.S} {
    flex-direction: column;
  }
`

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const slug = context?.params?.slug as string
  const response = await Api.noAuthFetch(Api.authorOverviewUrl(slug))

  const authorOverview = response.ok
    ? ((await response.json()) as AuthorOverview)
    : null

  return {
    props: {slug, authorOverview},
  }
}

export const getStaticPaths = async () => {
  const response = await Api.noAuthFetch(Api.authorSlugssUrl())

  const ids = (response.ok ? await response.json() : []) as string[]

  const paths = ids.map((slug) => ({params: {slug}}))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default AuthorPage
