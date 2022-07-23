import React from 'react'
import styled from 'styled-components'
import Flex from './core/Flex'
import Text from './core/Text'
import {useRouter} from 'next/router'
import LogInOrOutButton from './domain/buttons/LogInOrOutButton'
import NextLink from './core/NextLink'

const NavBar = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <Logo alt="Logo" src="soc_logo.png" onClick={() => router.push('/')} />
      <Flex>
        <MenuItems justifyContent="center" gap={'3em'}>
          <NextLink href="/kurzy"><Text uppercase>kurzy</Text></NextLink>
          <NextLink href="#"><Text uppercase>články</Text></NextLink>
          <NextLink href="#"><Text uppercase>O projekte</Text></NextLink>
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

const Logo = styled.img`
  margin-left: -1em;
  height: 60px;

  &:hover {
    cursor: pointer;
  }
`

export default NavBar
