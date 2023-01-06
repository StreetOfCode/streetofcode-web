import {useRouter} from 'next/router'
import React from 'react'
import {useAuth} from '../AuthUserContext'
import {routes} from '../routes'
import {useGetUser} from './api/user'

const routesThatDontNeedOnBoardingProtection = [
  routes.login.index,
  routes.onboarding,
]

const OnboardingProtectionRoute = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth()
  const useGetSocUser = useGetUser(!!user)
  const router = useRouter()

  if (
    user &&
    !useGetSocUser.isLoading &&
    !useGetSocUser.data &&
    !routesThatDontNeedOnBoardingProtection.includes(router.pathname)
  ) {
    router.replace({
      pathname: routes.onboarding,
      query: {from: location.pathname},
    })
    return <></>
  }

  return <>{children}</>
}

export default OnboardingProtectionRoute
