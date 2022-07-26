import React from 'react'
import styled from 'styled-components'
import Flex from './core/Flex'
import Text from './core/Text'
import {AiOutlineMenu} from 'react-icons/ai'
import {useRouter} from 'next/router'
import LogInOrOutButton from './domain/buttons/LogInOrOutButton'
import NextLink from './core/NextLink'
import {device} from '../theme/device'

const NavBar = () => {
  const router = useRouter()

  return (
    <WrapperFlex alignSelf="center" justifyContent="space-between">
      <Logo alt="Logo" src="soc_logo.png" onClick={() => router.push('/')} />
      <MenuIcon />
      <MenuFlex>
        <MenuItems justifyContent="center" gap={'3em'}>
          <NextLink styleIfActive href="/kurzy"><Text uppercase>kurzy</Text></NextLink>
          <NextLink styleIfActive href="/o-projekte"><Text uppercase>o projekte</Text></NextLink>
          <NextLink styleIfActive href="/feedback"><Text uppercase>feedback</Text></NextLink>
        </MenuItems>
        <LogInOrOutButton />
      </MenuFlex>
    </WrapperFlex>)
}

const WrapperFlex = styled(Flex)`
  padding: 1em 0;
  width: clamp(360px, 100%, 1200px);
`


const MenuItems = styled(Flex)`
  margin-right: 5em;

  a {
    text-decoration: none;
    color: unset;
  }
`
const MenuIcon = styled(AiOutlineMenu)`
  display: none;

  @media ${device.mobile} {
    display: block;
  }
`

const MenuFlex = styled(Flex)`
  @media ${device.mobile} {
    display: none;
  }
`

const Logo = styled.img`
  margin-left: -1em;
  height: 60px;

  &:hover {
    cursor: pointer;
  }
`

export default NavBar
