import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import {QueryGuard} from '../../../QueryGuard'
import {SocUser} from '../../../types'
import {useGetUser} from '../../api/user'
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
    <QueryGuard {...useGetSocUser}>
      {(socUser: SocUser | null) => {
        return (<>
          {(!user || !socUser) && <NextLink href={`/login/${encodeURIComponent(router.asPath)}`}>
            <Button>
              Prihlásiť
            </Button>
          </NextLink>}

          {user && socUser &&
          <DropdownMenu.Root>
            <Trigger>
              <StyledUserAvatar imageUrl={socUser.imageUrl || ''} name={socUser.name} sizePx={40} />
            </Trigger>
            <StyledContent sideOffset={3}>
              <Link href={'/profil'}>
                <DropDownItem>
                  Moje kurzy a nastavenia
                </DropDownItem>
              </Link>
              <DropDownItem onClick={logout}>
                Odhlásiť
              </DropDownItem>
              <DropwDownMenuArrow offset={12} />
            </StyledContent>
          </DropdownMenu.Root>
          }
        </>
        )
      }}
    </QueryGuard>
  )
}

const StyledUserAvatar = styled(UserAvatar)`
  &:hover {
    cursor: pointer;
  }
`

const Trigger = styled(DropdownMenu.Trigger)`
  all: unset;
`

const StyledContent = styled(DropdownMenu.Content)`
  background-color: ${(props) => props.theme.primaryColor};
  width: 200px;
  border-radius: 12px;
  padding: 6px 10px;
  border: 1px solid ${(props) => props.theme.secondaryColor};
`

const DropDownItem = styled(DropdownMenu.Item)`
  display: block !important;
  all: unset;
  white-space: nowrap;
  color: ${(props) => props.theme.secondaryColor};

  &:focus, &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  };
`

const DropwDownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: ${(props) => props.theme.secondaryColor};
`

export default LogInOrOutButton
