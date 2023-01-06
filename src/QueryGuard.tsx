import React from 'react'
import {User} from 'firebase/auth'
import Text from './components/core/Text'
import Loading from './components/Loading'

type QueryGuardProps<T> = {
  isLoading: boolean
  isIdle?: boolean
  error: unknown
  data: T
  children: ((data: Exclude<T, undefined>) => JSX.Element | null) | JSX.Element
}

function isDefined<T>(data: T): data is Exclude<T, undefined> {
  return data !== undefined
}

export function QueryGuard<T>({
  isLoading,
  isIdle,
  error,
  data,
  children,
}: QueryGuardProps<T>) {
  if (error) {
    return <Text size="small">Nepodarilo sa načítať</Text>
  }
  if (isDefined(data)) {
    return typeof children === 'function' ? children(data) : children
  }
  return isLoading || isIdle ? <Loading /> : null
}

type UserAndQueryGuardProps<T> = QueryGuardProps<T> & {
  user: User | null
  fallbackData: T
}

// Use if user authentication is required and SSR is used to fetch the data. The helper
// allows you to pass in `fallBack` data (mostly data fetched on the server). If user
// isn't defined, it returns the fallback data otherwise the query is handled normally
// via `QueryGuard`.
export function UserAndQueryGuard<T>({
  user,
  fallbackData,
  children,
  ...rest
}: UserAndQueryGuardProps<T>) {
  if (!user) {
    if (isDefined(fallbackData)) {
      return typeof children === 'function' ? children(fallbackData) : children
    } else {
      throw new Error('Should not happen')
    }
  }

  return <QueryGuard {...{...rest, children}} />
}
