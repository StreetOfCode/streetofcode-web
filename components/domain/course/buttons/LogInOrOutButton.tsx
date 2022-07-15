import {CircularProgress} from '@material-ui/core'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../../AuthUserContext'
import {QueryGuard} from '../../../../QueryGuard'
import {SocUser} from '../../../../types'
import {useGetUser} from '../../../api/user'
import Button from '../../../core/Button'
import UserAvatar from '../user/UserAvatar'


const LogInOrOutButton = () => {
  const {user, isLoading, logout} = useAuth()

  const router = useRouter()
  const useGetSocUser = useGetUser(!isLoading) // call when ready

  // TODO kebyze chcem refetchnut
  // useEffect(() => {
  //   useGetSocUser.refetch()
  // }, [user])

  if (isLoading) return <CircularProgress />

  return (
    <QueryGuard {...useGetSocUser}>
      {(socUser: SocUser | null) => {
        return (<>
          {(!user || !socUser) && <LinkWrapper href={`/login/${encodeURIComponent(router.pathname)}`} passHref>
            <StyledA>
              <Button>
                Prihlásiť
              </Button>
            </StyledA>
          </LinkWrapper>}

          {user && socUser &&
          <DropdownMenu.Root>
            <Trigger>
              <StyledUserAvatar imageUrl={socUser.imageUrl || ''} name={socUser.name} sizePx={40} />
            </Trigger>
            <StyledContent sideOffset={3}>
              <Link href={'/profile'}>
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

const StyledA = styled.a`
  text-decoration: none;
  color: unset;
`

const StyledUserAvatar = styled(UserAvatar)`
  &:hover {
    cursor: pointer;
  }
`

const Trigger = styled(DropdownMenu.Trigger)`
  all: unset;
`

const StyledContent = styled(DropdownMenu.Content)`
  background-color: white;
  width: 200px;
  border-radius: 12px;
  padding: 6px 10px;
  border: 1px solid black;
`

const DropDownItem = styled(DropdownMenu.Item)`
  display: block !important;
  all: unset;
  white-space: nowrap;

  &:focus, &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  };
`

const DropwDownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: black;
`

const LinkWrapper = styled(Link)`
`

export default LogInOrOutButton
