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
import {useGetAuthorOverview} from '../../components/api/authorOverview'
import PageContentWrapper from '../../components/PageContentWrapper'
import {useRouter} from 'next/router'
import NavBar from '../../components/NavBar'
import {QueryGuard} from '../../QueryGuard'

type Props = {
  authorOverview: AuthorOverview
}

const AuthorPage: NextPage<Props> = ({authorOverview}: Props) => {
  const {user} = useAuth()
  const getAuthorOverviewQuery = useGetAuthorOverview(authorOverview.id, !!user)

  if (user) {
    return (<QueryGuard {...getAuthorOverviewQuery}>
      {(authorOverview) => {
        return (<>
          <NavBar />
          <AuthorPageContent authorOverview={authorOverview} />
        </>)
      }}
    </QueryGuard>)
  } else {
    return (
      <>
        <NavBar />
        <AuthorPageContent authorOverview={authorOverview} />
      </>
    )
  }
}

const AuthorPageContent = ({authorOverview}: {authorOverview: AuthorOverview}) => {

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <PageContentWrapper>
      <GoBackText size="small" onClick={handleGoBack}>&larr; Späť</GoBackText>
      <Flex direction="column" gap="32px">
        <Flex alignSelf="flex-start" gap="32px">
          <Avatar altName={authorOverview.name} src={authorOverview.imageUrl} sizePx={250} />
          <Flex direction="column" gap="16px" alignSelf="flex-start" alignItems="flex-start">
            <Heading variant="h2" withAccentUnderline normalWeight>{authorOverview.name}</Heading>
            <StyledDescription>{authorOverview.description}</StyledDescription>
            <Text size="small">Kontaktovať ma môžeš na {authorOverview.email}</Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap="32px" alignSelf="flex-start" alignItems="flex-start">
          <Heading variant="h3" withAccentUnderline normalWeight>{authorOverview.coursesTitle}</Heading>
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const authorId = context?.params?.id as string
  const response = await Api.noAuthFetch(Api.authorOverviewUrl(Number(authorId)))

  const authorOverview = await response.json() as AuthorOverview

  return {
    props: {authorOverview}, // will be passed to the page component as props
  }
}

export const getStaticPaths = async () => {
  const response = await Api.noAuthFetch(Api.authorIdsUrl())

  const ids = await response.json() as number[]

  const paths = ids.map((id) => ({params: {id: id.toString()}}))

  return {
    paths,
    fallback: false,
  }
}

export default AuthorPage
