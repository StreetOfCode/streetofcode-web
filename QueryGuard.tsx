import {CircularProgress, Typography} from '@mui/material'
import React from 'react'

type QueryGuardProps<T> = {
  isLoading: boolean;
  isIdle?: boolean;
  error: unknown;
  data: T;
  children: ((data: Exclude<T, undefined>) => JSX.Element | null) | JSX.Element;
};

function isDefined<T>(data: T): data is Exclude<T, undefined> {
  return data !== undefined
}

export function QueryGuard<T>({isLoading, isIdle, error, data, children}: QueryGuardProps<T>) {
  if (error) {
    return (
      <Typography variant="h3" component="h1">
        Error
      </Typography>
    )
  }
  if (isDefined(data)) {
    return typeof children === 'function' ? children(data) : children
  }
  return isLoading || isIdle ? <CircularProgress /> : null
}
