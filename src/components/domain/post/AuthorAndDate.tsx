import React from 'react'
import Text from '../../core/Text'
import {formatDate} from '../../../utils'
import {useGetAuthorOverview} from '../../../api/authorOverview'
import {QueryGuard} from '../../../QueryGuard'
import Avatar from '../../core/Avatar'
import styled from 'styled-components'
import {socLamp} from '../../../images'
import Flex from '../../core/Flex'
import {routes} from '../../../routes'
import Link from 'next/link'

const AUTHOR_SLUG: Record<string, string> = {
  'Jakub Jahič': 'jakub-jahic',
  'Gabriel Kerekeš': 'gabriel-kerekes',
}

const PodcastAuthorAndDate = ({date}: {date?: string}) => {
  return (
    <Link href={routes.root} passHref>
      <StyledHyperlink>
        <FlexWrapper alignItems="center" gap="8px">
          <Avatar altName="Street of Code logo" src={socLamp} sizePx={38} />
          <NameAndDateFlexWrapper direction="column">
            <Text size="small">Street of Code</Text>
            {date && (
              <DateText size="small">{formatDate(new Date(date))}</DateText>
            )}
          </NameAndDateFlexWrapper>
        </FlexWrapper>
      </StyledHyperlink>
    </Link>
  )
}

const ArticleAuthorAndDate = ({
  date,
  authorName,
}: {
  date?: string
  authorName?: string
}) => {
  const authorSlug = authorName ? AUTHOR_SLUG[authorName] : ''
  const getAuthorOverviewQuery = useGetAuthorOverview(authorSlug)

  return (
    <QueryGuard {...getAuthorOverviewQuery}>
      {(authorOverview) => {
        return (
          <Link href={routes.lektor.slug(authorSlug)}>
            <StyledHyperlink>
              <FlexWrapper alignItems="center" gap="8px">
                <Avatar
                  altName={authorOverview.name}
                  src={authorOverview.imageUrl}
                  sizePx={38}
                />
                <NameAndDateFlexWrapper direction="column">
                  {authorName && (
                    <Text size="small">{authorOverview.name}</Text>
                  )}
                  {date && (
                    <DateText size="small">
                      {formatDate(new Date(date))}
                    </DateText>
                  )}
                </NameAndDateFlexWrapper>
              </FlexWrapper>
            </StyledHyperlink>
          </Link>
        )
      }}
    </QueryGuard>
  )
}

const AuthorAndDate = ({
  date,
  authorName,
  isPodcast,
}: {
  date?: string
  authorName?: string
  isPodcast?: boolean
}) => {
  if (isPodcast) return <PodcastAuthorAndDate date={date} />

  return <ArticleAuthorAndDate date={date} authorName={authorName} />
}

const FlexWrapper = styled(Flex)`
  border-radius: 20px;
  padding: 10px;

  transition: 250ms ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 8px 20px var(--color-shadow);
    transform: scale(1.1);
    transition: 250ms ease-in-out;
  }
`

const NameAndDateFlexWrapper = styled(Flex)`
  padding: 4px;
  align-items: flex-start;
`

const DateText = styled(Text)`
  opacity: 0.6;
`

const StyledHyperlink = styled.a`
  text-decoration: none;
`

export default AuthorAndDate
