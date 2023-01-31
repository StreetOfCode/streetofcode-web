import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import {QueryGuard} from '../../../QueryGuard'
import {routes} from '../../../routes'
import {SocUser} from '../../../types'
import {useGetUser} from '../../../api/user'
import Button from '../../core/Button'
import NextLink from '../../core/NextLink'
import Loading from '../../Loading'
import UserAvatar from '../user/UserAvatar'

const LogInOrOutButton = () => {
  const {user, isLoading, logout} = useAuth()

  const router = useRouter()
  const useGetSocUser = useGetUser(!isLoading) // call when ready

  if (isLoading) return <Loading />

  return (
    <Wrapper>
      <QueryGuard {...useGetSocUser}>
        {(socUser: SocUser | null) => {
          return (
            <>
              {(!user || !socUser) && (
                <NextLink
                  href={routes.login.redirectUri(
                    encodeURIComponent(router.asPath),
                  )}
                >
                  <Button>Prihlásiť</Button>
                </NextLink>
              )}

              {user && socUser && (
                <DropdownMenu.Root>
                  <Trigger>
                    <StyledUserAvatar
                      src={socUser.imageUrl || ''}
                      name={socUser.name}
                      sizePx={40}
                    />
                  </Trigger>
                  <StyledContent sideOffset={2}>
                    <Link href={routes.profil}>
                      <DropDownItem>Moje kurzy a nastavenia</DropDownItem>
                    </Link>
                    <DropDownItem onClick={logout}>Odhlásiť</DropDownItem>
                    <DropwDownMenuArrow />
                  </StyledContent>
                </DropdownMenu.Root>
              )}
            </>
          )
        }}
      </QueryGuard>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-shrink: 0;
`

const StyledUserAvatar = styled(UserAvatar)`
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`

const Trigger = styled(DropdownMenu.Trigger)`
  all: unset;
`

const StyledContent = styled(DropdownMenu.Content)`
  background-color: var(--color-primary);
  border-radius: 12px;
  padding: 12px 15px;
  border: 1px solid var(--color-secondary);
`

const DropDownItem = styled(DropdownMenu.Item)`
  display: block !important;
  all: unset;
  white-space: nowrap;
  color: var(--color-secondary);
  margin: 12px 0;

  &:focus,
  &:hover {
    color: var(--color-accent);
    cursor: pointer;
  }
`

const DropwDownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: var(--color-secondary);
`

export default LogInOrOutButton
