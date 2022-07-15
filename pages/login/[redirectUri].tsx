import {CircularProgress} from '@material-ui/core'
import React from 'react'
import styled, {css} from 'styled-components'
import * as Auth from '../../auth'
import {FaGoogle, FaGithub} from 'react-icons/fa'
import BackLink from '../../components/core/BackLink'
import Button from '../../components/core/Button'
import Flex from '../../components/core/Flex'
import Heading from '../../components/core/Heading'
import {useRouter} from 'next/router'
import {NextPage} from 'next'
import {useAuth} from '../../AuthUserContext'

const LoginPage: NextPage = () => {
  const {user, isLoading, logout} = useAuth()

  const router = useRouter()

  if (user && router?.query?.redirectUri) {
    router.push(decodeURIComponent(router.query.redirectUri))
  }

  // TODO ked sa lognem zo stranky course detail tak potom ten redirect vyhodi chybu

  return (
    <FlexWrapper direction="column" alignItems="center" gap="16px" justifyContent="center">
      <Logo alt="Logo" src="soc_logo.png" />
      <Heading variant="h4" align="center" withAccentUnderline normalWeight>Prihlásenie</Heading>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          {!user && (
            <>
              <GoogleButton
                withoutUppercase
                iconBefore={<FaGoogle />}
                onClick={() => Auth.loginWithGoogle()}
              >Prihlásiť cez Google
              </GoogleButton>
              <GithubButton
                withoutUppercase
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
          {router.query?.redirectUri && (<BackLink to={decodeURIComponent(router.query.redirectUri)} text={'Späť'} />)}
        </>
      )}
    </FlexWrapper>
  )
}

const iconStyle = css`
  width: 30px;
  height: 30px;
`

const GoogleButton = styled(Button)`
  background-color: #DD4B39;
  color: white;
  border: 1px solid black;

  svg {
    ${iconStyle}
  }
`

const GithubButton = styled(Button)`
  background-color: #444444;
  color: white;
  border: 1px solid black;

  svg {
    ${iconStyle}
  }
`

const FlexWrapper = styled(Flex)`
  min-height: 100vh;
  width: 350px;
`

const Logo = styled.img`
  width: 200px;
  height: auto;
`

export default LoginPage
