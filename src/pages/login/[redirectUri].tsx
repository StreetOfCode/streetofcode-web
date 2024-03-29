import React, {useEffect} from 'react'
import Image from 'next/image'
import styled, {css} from 'styled-components'
import * as Auth from '../../auth'
import {FaGoogle, FaGithub} from 'react-icons/fa'
import BackLink from '../../components/core/BackLink'
import Button from '../../components/core/Button'
import Flex from '../../components/core/Flex'
import Heading from '../../components/core/Heading'
import Text from '../../components/core/Text'
import {useRouter} from 'next/router'
import {NextPage} from 'next'
import {useAuth} from '../../AuthUserContext'
import Loading from '../../components/Loading'
import {FirebaseError} from 'firebase/app'
import PageContentWrapper from '../../components/PageContentWrapper'
import {device} from '../../theme/device'

const LoginPage: NextPage = () => {
  const {user, isLoading, logout, error, setError} = useAuth()
  const router = useRouter()

  useEffect(() => {
    Auth.getRedirectResults().catch((err) => {
      setError(err)
    })
  }, [])

  if (user && router?.query?.redirectUri) {
    router.push(decodeURIComponent(router.query.redirectUri as string))
  }

  const differentCredentialsError = (function () {
    if (error instanceof FirebaseError) {
      const firebaseError = error as FirebaseError
      if (
        firebaseError.code === 'auth/account-exists-with-different-credential'
      ) {
        return true
      }
    }
    return false
  })()

  return (
    <PageContentWrapper>
      <FlexWrapper
        direction="column"
        alignItems="center"
        gap="16px"
        justifyContent="center"
      >
        <LogoWrapper>
          <LogoImage layout="fill" alt="Logo" src="/soc_logo.png" />
        </LogoWrapper>
        {differentCredentialsError && (
          <Text align="center" weight="bold">
            Pokúsil/a si sa prihlásiť s emailom, s ktorým si sa už v minulosti
            prihlásil/a cez inú službu. Ak si sa teraz pokúsil/a prihlásiť cez
            GitHub, tak sa prosím prihlás cez Google. Naopak ak si sa teraz
            pokúsil/a prihlásiť cez Google, tak sa prosím prihlás cez Github.
          </Text>
        )}
        <Heading variant="h4" align="center" withAccentUnderline normalWeight>
          Prihlásenie
        </Heading>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {!user && (
              <>
                <GoogleButton
                  iconBefore={<FaGoogle />}
                  onClick={() => Auth.loginWithGoogle()}
                >
                  Prihlásiť cez Google
                </GoogleButton>
                <GithubButton
                  iconBefore={<FaGithub />}
                  onClick={() => Auth.loginWithGithub()}
                >
                  Prihlásiť cez GitHub
                </GithubButton>
              </>
            )}
            {user && (
              <div>
                <Button variant="outline" color="primary" onClick={logout}>
                  Logout
                </Button>
              </div>
            )}

            {/* Prioritize returnTo query parameter if specified */}
            {router.query?.returnTo && (
              <BackLink
                to={decodeURIComponent(router.query.returnTo as string)}
                text={'Späť'}
              />
            )}
            {!router.query?.returnTo && router.query?.redirectUri && (
              <BackLink
                to={decodeURIComponent(router.query.redirectUri as string)}
                text={'Späť'}
              />
            )}
          </>
        )}
      </FlexWrapper>
    </PageContentWrapper>
  )
}

const iconStyle = css`
  width: 30px;
  height: 30px;
`

const GoogleButton = styled(Button)`
  background-color: #dd4b39;
  color: var(--color-primary);
  border: 1px solid var(--color-secondary);

  svg {
    ${iconStyle}
  }
`

const GithubButton = styled(Button)`
  background-color: #444444;
  color: var(--color-primary);
  border: 1px solid var(--color-secondary);
  svg {
    ${iconStyle}
  }
`

const FlexWrapper = styled(Flex)`
  min-height: 100vh;
  width: 500px;
  margin: 0 auto;

  @media ${device.S} {
    width: 100%;
  }
`

const LogoWrapper = styled.div`
  position: relative;
  aspect-ratio: 3 / 1;
  width: 200px;
`
const LogoImage = styled(Image)`
  [theme-type='DARK'] & {
    filter: invert(100%);
  }
`

export default LoginPage
