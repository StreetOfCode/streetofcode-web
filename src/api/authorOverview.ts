import {useQuery} from 'react-query'
import * as Api from '../api'
import {AuthorOverview} from '../types'

const P = 'authorOverview'

const queryKeys = {
  get: (slug: string) => [P, slug],
}

const fetchAuthorOverview = async (slug: string) => {
  const response = await Api.authFetch(Api.authorOverviewUrl(slug))

  if (!response.ok) {
    throw Error('Nepodarilo sa načítať lektora')
  }

  return (await response.json()) as AuthorOverview
}

export const useGetAuthorOverview = (
  slug: string,
  enabled?: boolean | undefined,
) => {
  return useQuery(queryKeys.get(slug), () => fetchAuthorOverview(slug), {
    enabled,
  })
}
