import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Flex from './core/Flex'
import Text from './core/Text'
import {useRouter} from 'next/router'
import LogInOrOutButton from './domain/course/buttons/LogInOrOutButton'

const NavBar = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <Logo alt="Logo" src="soc_logo.png" onClick={() => router.push('/')} />
      <Flex>
        <MenuItems justifyContent="center" gap={'3em'}>
          <MenuItem href="/courses" passHref><a><Text uppercase>kurzy</Text></a></MenuItem>
          <MenuItem href="#" passHref><a><Text uppercase>články</Text></a></MenuItem>
          <MenuItem href="#" passHref><a><Text uppercase>O projekte</Text></a></MenuItem>
        </MenuItems>
        <LogInOrOutButton />
      </Flex>
    </Wrapper>)
}

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  width: clamp(920px, 100%, 1200px);
`

const MenuItems = styled(Flex)`
  margin-right: 5em;

  a {
    text-decoration: none;
    color: unset;
  }
`

const MenuItem = styled(Link)`
  text-decoration: none;
`

const Logo = styled.img`
  margin-left: -1em;
  height: 60px;

  &:hover {
    cursor: pointer;
  }
`

export default NavBar
