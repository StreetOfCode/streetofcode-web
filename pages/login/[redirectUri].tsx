import React, {useEffect, useState} from 'react'
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
  const {user, isLoading, logout} = useAuth()
  const [differentCredentialsError, setDifferentCredentialError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    Auth.getRedirectResults()
      .catch((err) => {
        if (err instanceof FirebaseError) {
          const firebaseError = err as FirebaseError
          if (firebaseError.code === 'auth/account-exists-with-different-credential') {
            setDifferentCredentialError(true)
          }
        }
      })
  }, [])

  if (user && router?.query?.redirectUri) {
    router.push(decodeURIComponent((router.query.redirectUri) as string))
  }

  return (
    <PageContentWrapper>
      <FlexWrapper direction="column" alignItems="center" gap="16px" justifyContent="center">
        <LogoWrapper>
          <LogoImage layout="fill" alt="Logo" src="/soc_logo.png" />
        </LogoWrapper>
        {differentCredentialsError && <Text align="center" weight="bold">
          Pokúsil/a si sa prihlásiť s emailom, s ktorým si sa už v minulosti prihlásil/a cez inú službu.
          Ak si sa teraz pokúsil/a prihlásiť cez GitHub, tak sa prosím prihlás cez Google. Naopak ak si sa teraz
          pokúsil/a prihlásiť cez Google, tak sa prosím prihlás cez Github.
        </Text>}
        <Heading variant="h4" align="center" withAccentUnderline normalWeight>Prihlásenie</Heading>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {!user && (
              <>
                <GoogleButton
                  iconBefore={<FaGoogle />}
                  onClick={() => Auth.loginWithGoogle()}
                >Prihlásiť cez Google
                </GoogleButton>
                <GithubButton
                  iconBefore={<FaGithub />}
                  onClick={() => Auth.loginWithGithub()}
                >Prihlásiť cez GitHub
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
            {router.query?.redirectUri && (
              <BackLink to={decodeURIComponent((router.query.redirectUri) as string)} text={'Späť'} />)
            }
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
  background-color: #DD4B39;
  color: ${(props) => props.theme.primaryColor};
  border: 1px solid black;

  svg {
    ${iconStyle}
  }
`

const GithubButton = styled(Button)`
  background-color: #444444;
  color: ${(props) => props.theme.primaryColor};
  border: 1px solid black;

  svg {
    ${iconStyle}
  }
`

const FlexWrapper = styled(Flex)`
  min-height: 100vh;
  width: 500px;
  margin: 0 auto;

  @media ${device.mobile} {
    width: 100%;
  }
`

const LogoWrapper = styled.div`
  position: relative;
  aspect-ratio: 3 / 1;
  width: 200px;
`
const LogoImage = styled(Image)`
  filter: ${(props) => props.theme.type === 'LIGHT' ? 'unset' : 'invert(100%)'};
`

export default LoginPage
