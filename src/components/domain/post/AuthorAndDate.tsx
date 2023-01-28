import React from 'react'
import Text from '../../core/Text'
import {formatDate} from '../../../utils'
import {useGetAuthorOverview} from '../../../api/authorOverview'
import {QueryGuard} from '../../../QueryGuard'
import Avatar from '../../core/Avatar'
import Link from 'next/link'
import styled from 'styled-components'
import {routes} from '../../../routes'
import {socLamp} from '../../../images'

const AUTHOR_SLUG: Record<string, string> = {
  'Jakub Jahič': 'jakub-jahic',
  'Gabriel Kerekeš': 'gabriel-kerekes',
}

const PodcastAuthorAndDate = ({date}: {date?: string}) => {
  return (
    <Link href={routes.root}>
      <Wrapper>
        <Avatar altName="Street of Code logo" src={socLamp} sizePx={38} />
        <NameAndDateWrapper>
          <Text size="small">Street of Code</Text>
          {date && (
            <DateText size="small">{formatDate(new Date(date))}</DateText>
          )}
        </NameAndDateWrapper>
      </Wrapper>
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
            <Wrapper>
              <Avatar
                altName={authorOverview.name}
                src={authorOverview.imageUrl}
                sizePx={38}
              />
              <NameAndDateWrapper>
                {authorName && <Text size="small">{authorOverview.name}</Text>}
                {date && (
                  <DateText size="small">{formatDate(new Date(date))}</DateText>
                )}
              </NameAndDateWrapper>
            </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const NameAndDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4;
`

const DateText = styled(Text)`
  opacity: 0.6;
`

export default AuthorAndDate
