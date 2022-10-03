import {useRouter} from 'next/router'
import React from 'react'
import {useAuth} from '../AuthUserContext'
import {useGetUser} from './api/user'

const routesThatDontNeedOnBoardingProtection = ['/login', '/onboarding']

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
      pathname: '/onboarding',
      query: {from: location.pathname},
    })
    return <></>
  }

  return <>{children}</>
}

export default OnboardingProtectionRoute
