import React, {useState} from 'react'
import Image from 'next/image'
import styled, {css} from 'styled-components'
import Flex from './core/Flex'
import Text from './core/Text'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {useRouter} from 'next/router'
import LogInOrOutButton from './domain/buttons/LogInOrOutButton'
import NextLink from './core/NextLink'
import {device} from '../theme/device'
import {useAuth} from '../AuthUserContext'
import ThemeSwitcher from '../theme/ThemeSwitcher'

const NavBar = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)
  const router = useRouter()
  const {user, logout} = useAuth()

  const MobileNavbarOptions = () => {
    return (
      <MobileNavbarOptionsFlex gap="24px">
        <ThemeSwitcher />
        {!mobileNavbarOpen && (
          <OpenMenuIcon
            onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}
          />
        )}
        {mobileNavbarOpen && (
          <CloseMenuIcon
            onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}
          />
        )}
      </MobileNavbarOptionsFlex>
    )
  }

  return (
    <WrapperFlex
      alignSelf="center"
      justifyContent="space-between"
      mobileNavbarOpen={mobileNavbarOpen}
    >
      <LogoWrapper>
        <LogoImage
          layout="fill"
          alt="Logo"
          src="/soc_logo.png"
          onClick={() => router.push('/')}
        />
      </LogoWrapper>
      <MobileNavbarOptions />
      <MenuFlex>
        <MenuItems justifyContent="center" gap={'48px'}>
          <ThemeSwitcher />
          <NextLink styleIfActive href="/kurzy">
            <Text uppercase>kurzy</Text>
          </NextLink>
          <NextLink styleIfActive href="/podcast">
            <Text uppercase>podcast</Text>
          </NextLink>
          <NextLink styleIfActive href="/clanky">
            <Text uppercase>články</Text>
          </NextLink>
          <NextLink styleIfActive href="/o-projekte">
            <Text uppercase>o projekte</Text>
          </NextLink>
          <NextLink styleIfActive href="/feedback">
            <Text uppercase>feedback</Text>
          </NextLink>
        </MenuItems>
        <LogInOrOutButton />
      </MenuFlex>
      <MobileMenuFlex open={mobileNavbarOpen}>
        <MenuItems direction="column" alignItems="flex-start" gap={'32px'}>
          {!user && (
            <NextLink href={`/login/${encodeURIComponent(router.asPath)}`}>
              <Text>Prihlásiť</Text>
            </NextLink>
          )}
          {user && (
            <NextLink styleIfActive href="/profil">
              <Text>Moje kurzy a nastavenia</Text>
            </NextLink>
          )}
          <NextLink styleIfActive href="/podcast">
            <Text>Podcast</Text>
          </NextLink>
          <NextLink styleIfActive href="/clanky">
            <Text>Články</Text>
          </NextLink>
          <NextLink styleIfActive href="/o-projekte">
            <Text>O projekte</Text>
          </NextLink>
          <NextLink styleIfActive href="/feedback">
            <Text>Feedback</Text>
          </NextLink>
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

  @media ${device.tablet} {
    background-color: ${(props) =>
      props.mobileNavbarOpen && props.theme.primaryColor};
    width: ${(props) => props.mobileNavbarOpen && '100vw'};
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
    cursor: pointer;
  }

  @media ${device.tablet} {
    display: block;
  }
`

const OpenMenuIcon = styled(AiOutlineMenu)`
  ${menuIconStyle}
`

const CloseMenuIcon = styled(AiOutlineClose)`
  ${menuIconStyle}
`

const MobileNavbarOptionsFlex = styled(Flex)`
  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`

const MenuFlex = styled(Flex)`
  @media ${device.tablet} {
    display: none;
  }
`

const MobileMenuFlex = styled(Flex)<{open: boolean}>`
  display: none;

  @media ${device.tablet} {
    display: ${(props) => (props.open ? 'flex' : 'none')};
    align-items: flex-start;
    position: absolute;
    padding: 24px 32px;
    top: 95px;
    width: 100vw;
    height: 100vh;
    left: 0;
    z-index: 1;
    background-color: ${(props) => props.theme.primaryColor};
  }
`
const LogoWrapper = styled.div`
  margin-left: -24px;
  position: relative;
  aspect-ratio: 3 / 1;
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

const LogoImage = styled(Image)`
  filter: ${(props) =>
    props.theme.type === 'LIGHT' ? 'unset' : 'invert(100%)'};
`

export default NavBar
