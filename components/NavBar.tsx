import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import Flex from './core/Flex'
import Text from './core/Text'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {useRouter} from 'next/router'
import LogInOrOutButton from './domain/buttons/LogInOrOutButton'
import NextLink from './core/NextLink'
import {device} from '../theme/device'
import {useAuth} from '../AuthUserContext'

const NavBar = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)
  const router = useRouter()
  const {user, logout} = useAuth()


  return (
    <WrapperFlex alignSelf="center" justifyContent="space-between" mobileNavbarOpen={mobileNavbarOpen}>
      <Logo alt="Logo" src="/soc_logo.png" onClick={() => router.push('/')} />
      {!mobileNavbarOpen && <OpenMenuIcon onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)} />}
      {mobileNavbarOpen && <CloseMenuIcon onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)} />}
      <MenuFlex>
        <MenuItems justifyContent="center" gap={'48px'}>
          <NextLink styleIfActive href="/kurzy"><Text uppercase>kurzy</Text></NextLink>
          <NextLink styleIfActive href="/o-projekte"><Text uppercase>o projekte</Text></NextLink>
          <NextLink styleIfActive href="/feedback"><Text uppercase>feedback</Text></NextLink>
        </MenuItems>
        <LogInOrOutButton />
      </MenuFlex>
      <MobileMenuFlex open={mobileNavbarOpen}>
        <MenuItems direction="column" alignItems="flex-start" gap={'32px'}>
          {!user && <NextLink href={`/login/${encodeURIComponent(router.asPath)}`}><Text>Prihlásiť</Text></NextLink>}
          <NextLink styleIfActive href="/profil"><Text>Moje kurzy a nastavenia</Text></NextLink>
          <NextLink styleIfActive href="/o-projekte"><Text>O projekte</Text></NextLink>
          <NextLink styleIfActive href="/feedback"><Text>Feedback</Text></NextLink>
          {user && <LogoutText onClick={logout}>Odhlásiť</LogoutText>}
        </MenuItems>
      </MobileMenuFlex>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)<{mobileNavbarOpen: boolean}>`
  margin: 0 auto;
  padding: 24px 32px;
  width: clamp(360px, 100%, 1200px);
  position: relative;

  @media ${device.mobile} {
    background-color: ${(props) => props.mobileNavbarOpen && props.theme.primaryColor};
    width: ${(props) => props.mobileNavbarOpen && '100vw'};
    position: ${(props) => props.mobileNavbarOpen && 'absolute'};
  }
`


const MenuItems = styled(Flex)`
  margin-right: 64px;

  a {
    text-decoration: none;
    color: unset;
  }
`

const menuIconStyle = css`
  display: none;
  width: 24px;
  height: 24px;

  &:hover {
    cursor: pointer
  }

  @media ${device.mobile} {
    display: block;
  }
`

const OpenMenuIcon = styled(AiOutlineMenu)`
  ${menuIconStyle}
`

const CloseMenuIcon = styled(AiOutlineClose)`
  ${menuIconStyle}
`

const MenuFlex = styled(Flex)`
  @media ${device.mobile} {
    display: none;
  }
`

const MobileMenuFlex = styled(Flex)<{open: boolean}>`
  display: none;

  @media ${device.mobile} {
    display: ${(props) => props.open ? 'flex' : 'none'};
    position: absolute;
    padding: 24px 32px;
    top: 95px;
    width: 100%;
    left: 0;
    z-index: 1;
    background-color: ${(props) => props.theme.primaryColor};
  }
`

const Logo = styled.img`
  margin-left: -24px;
  height: 60px;

  &:hover {
    cursor: pointer;
  }
`

const LogoutText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`

export default NavBar
