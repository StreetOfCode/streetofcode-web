import React from 'react'
import Head from 'next/head'
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
import {useGetAuthorOverview} from '../../components/api/authorOverview'
import PageContentWrapper from '../../components/PageContentWrapper'
import {useRouter} from 'next/router'
import NavBar from '../../components/NavBar'
import {QueryGuard} from '../../QueryGuard'
import {device} from '../../theme/device'

type Props = {
  authorOverview: AuthorOverview
}

const Header = ({author}: {author: AuthorOverview}) => {
  return (
    <Head>
      <title>{author.name}</title>
      <meta name="description">{`Street of Code lektor ${author.name}`}</meta>
    </Head>
  )
}

const AuthorPage: NextPage<Props> = ({authorOverview}: Props) => {
  const {user} = useAuth()
  const getAuthorOverviewQuery = useGetAuthorOverview(
    authorOverview.slug,
    !!user,
  )

  if (user) {
    return (
      <QueryGuard {...getAuthorOverviewQuery}>
        {(authorOverview) => {
          return (
            <>
              <Header author={authorOverview} />
              <NavBar />
              <AuthorPageContent authorOverview={authorOverview} />
            </>
          )
        }}
      </QueryGuard>
    )
  } else {
    return (
      <>
        <Header author={authorOverview} />
        <NavBar />
        <AuthorPageContent authorOverview={authorOverview} />
      </>
    )
  }
}

const AuthorPageContent = ({
  authorOverview,
}: {
  authorOverview: AuthorOverview
}) => {
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
            <Heading variant="h2" withAccentUnderline normalWeight>
              {authorOverview.name}
            </Heading>
            <StyledDescription>{authorOverview.description}</StyledDescription>
            <Text size="small">
              Kontaktovať ma môžeš na {authorOverview.email}
            </Text>
          </Flex>
        </AboutAuthorFlex>

        <Flex
          direction="column"
          gap="32px"
          alignSelf="flex-start"
          alignItems="flex-start"
        >
          <Heading variant="h3" withAccentUnderline normalWeight>
            {authorOverview.coursesTitle}
          </Heading>
          <Courses courses={authorOverview.courses} />
        </Flex>
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
  @media ${device.mobile} {
    flex-direction: column;
  }
`

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const slug = context?.params?.slug as string
  const response = await Api.noAuthFetch(Api.authorOverviewUrl(slug))

  const authorOverview = (await response.json()) as AuthorOverview

  return {
    props: {authorOverview}, // will be passed to the page component as props
  }
}

export const getStaticPaths = async () => {
  const response = await Api.noAuthFetch(Api.authorSlugssUrl())

  const ids = (await response.json()) as string[]

  const paths = ids.map((slug) => ({params: {slug}}))

  return {
    paths,
    fallback: false,
  }
}

export default AuthorPage