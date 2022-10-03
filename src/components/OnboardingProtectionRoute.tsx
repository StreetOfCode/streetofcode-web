import {useRouter} from 'next/router'
import React from 'react'
import {useAuth} from '../AuthUserContext'
import {QueryGuard} from '../QueryGuard'
import {useGetUser} from './api/user'
import Loading from './Loading'

const routesThatDontNeedOnBoardingProtection = ['/login', '/onboarding']

const OnboardingProtectionRoute = ({children}: {children: React.ReactNode}) => {
  const {user, isLoading} = useAuth()
  const useGetSocUser = useGetUser(!!user)
  const router = useRouter()

  if (isLoading) {
    return <Loading />
  }

  if (
    user &&
    !routesThatDontNeedOnBoardingProtection.includes(router.pathname)
  ) {
    return (
      <QueryGuard {...useGetSocUser}>
        {(socUser) => {
          if (socUser) {
            // socUser exists, we can return content
            return <>{children}</>
          } else {
            // socUser does not exist but user is logged in, it means he has to onboard
            router.replace({
              pathname: '/onboarding',
              query: {from: location.pathname},
            })
            return <></>
          }
        }}
      </QueryGuard>
    )
  }

  return <>{children}</>
}

export default OnboardingProtectionRoute
