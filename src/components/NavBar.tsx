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
import {socLogo} from '../images'

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
          src={socLogo}
          onClick={() => router.push('/')}
          priority
        />
      </LogoWrapper>
      <MobileNavbarOptions />
      <MenuFlex>
        <MenuItems justifyContent="center" gap={'48px'}>
          <ThemeSwitcher />
          <NextLink styleIfActive href="/kurzy">
            <MenuItemText>kurzy</MenuItemText>
          </NextLink>
          <NextLink styleIfActive href="/podcast">
            <MenuItemText>podcast</MenuItemText>
          </NextLink>
          <NextLink styleIfActive href="/clanky">
            <MenuItemText>články</MenuItemText>
          </NextLink>
          <NextLink styleIfActive href="/o-projekte">
            <MenuItemText>o projekte</MenuItemText>
          </NextLink>
          <NextLink styleIfActive href="/feedback">
            <MenuItemText>feedback</MenuItemText>
          </NextLink>
        </MenuItems>
        <LogInOrOutButton />
      </MenuFlex>
      <MobileMenuFlex open={mobileNavbarOpen}>
        <MobileMenuItems direction="column" alignItems="stretch" gap={'32px'}>
          {!user && (
            <>
              <NextLink href={`/login/${encodeURIComponent(router.asPath)}`}>
                <Text>Prihlásiť</Text>
              </NextLink>
              <NextLink styleIfActive href="/kurzy">
                <Text>Kurzy</Text>
              </NextLink>
            </>
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
          {mobileNavbarOpen && (
            <CloseMobileMenuFlexWrapper
              gap="12px"
              justifyContent="center"
              onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}
            >
              <CloseMenuIcon />
              <Text>Zavrieť</Text>
            </CloseMobileMenuFlexWrapper>
          )}
        </MobileMenuItems>
      </MobileMenuFlex>
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)<{mobileNavbarOpen: boolean}>`
  margin: 0 auto;
  padding: 24px 32px;
  width: clamp(320px, 100%, 1200px);
  position: relative;

  @media ${device.L} {
    max-width: 900px;
  }

  @media ${device.M} {
    background-color: ${(props) =>
      props.mobileNavbarOpen && 'var(--color-primary)'};
    width: ${(props) => props.mobileNavbarOpen && '100vw'};
  }

  @media ${device.XS} {
    padding: 24px 24px;
  }
`

const MenuItems = styled(Flex)`
  margin-right: 64px;

  a {
    text-decoration: none;
    color: unset;
  }

  @media ${device.L} {
    gap: 32px;
  }
`

const MenuItemText = styled(Text)`
  text-transform: uppercase;
  white-space: nowrap;
`

const MobileMenuItems = styled(Flex)`
  width: 100%;

  a {
    text-decoration: none;
    color: unset;
  }

  span {
    text-align: center;
  }
`

const menuIconStyle = css`
  display: none;
  width: 24px;
  height: 24px;

  &:hover {
    cursor: pointer;
  }

  @media ${device.M} {
    display: block;
  }

  color: var(--color-secondary);
`

const OpenMenuIcon = styled(AiOutlineMenu)`
  ${menuIconStyle}
`

const CloseMenuIcon = styled(AiOutlineClose)`
  ${menuIconStyle}
`

const MobileNavbarOptionsFlex = styled(Flex)`
  display: none;

  @media ${device.M} {
    display: flex;
  }
`

const MenuFlex = styled(Flex)`
  @media ${device.M} {
    display: none;
  }
`

const MobileMenuFlex = styled(Flex)<{open: boolean}>`
  display: none;

  @media ${device.M} {
    display: ${(props) => (props.open ? 'flex' : 'none')};
    align-items: flex-start;
    position: absolute;
    padding: 24px 32px;
    top: 95px;
    width: 100vw;
    height: 100vh;
    left: 0;
    z-index: 1;
    background-color: var(--color-primary);
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
    opacity: 0.7;
  }
`

const CloseMobileMenuFlexWrapper = styled(Flex)`
  width: 100%;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`
const LogoImage = styled(Image)`
  [theme-type='DARK'] & {
    filter: invert(100%);
  }
`

export default NavBar
