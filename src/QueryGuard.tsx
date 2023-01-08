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
  fallbackData: T | null
  fallbackComponent?: JSX.Element
}

// Use if user authentication is required and SSR is used to fetch the data. The helper
// allows you to pass in `fallBack` data (mostly data fetched on the server) and `fallbackComponent`.
// If user isn't defined, it returns the fallback data if it's defined and the fallback component
// if `fallbackData` isn't defined. Otherwise the query is handled normally via `QueryGuard`.
export function UserAndQueryGuard<T>({
  user,
  fallbackData,
  fallbackComponent,
  children,
  ...rest
}: UserAndQueryGuardProps<T>) {
  if (!user) {
    if (isDefined(fallbackData) && fallbackData != null) {
      return typeof children === 'function' ? children(fallbackData) : children
    } else {
      return fallbackComponent || null
    }
  }

  return <QueryGuard {...{...rest, children}} />
}
