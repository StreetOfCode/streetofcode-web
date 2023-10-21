import React, {ChangeEvent, useState} from 'react'
import {QueryGuard} from '../QueryGuard'
import {SocUser} from '../types'
import {AiOutlineEdit} from 'react-icons/ai'
import Text from '../components/core/Text'
import Flex from '../components/core/Flex'
import Heading from '../components/core/Heading'
import styled from 'styled-components'
import UserAvatar from '../components/domain/user/UserAvatar'
import Courses from '../components/domain/course/Courses'
import Button from '../components/core/Button'
import TextField from '../components/core/TextField'
import {useEditUser, useGetUser} from '../api/user'
import {NextPage} from 'next'
import {useAuth} from '../AuthUserContext'
import {useGetMyCourses} from '../api/myCourses'
import {useRouter} from 'next/router'
import PageContentWrapper from '../components/PageContentWrapper'
import NavBar from '../components/NavBar'
import {device} from '../theme/device'
import {isRunningOnServer} from '../utils'
import {routes} from '../routes'

const ProfilePage: NextPage = () => {
  const {user} = useAuth()
  const getSocUser = useGetUser(!!user)
  const router = useRouter()

  if (!user) {
    if (isRunningOnServer()) return <></>
    // this page can be seen only by logged in users
    router.push({
      pathname: routes.login.redirectUri(encodeURIComponent(router.pathname)),
    })
  }

  return (
    <QueryGuard {...getSocUser}>
      {(socUser) => {
        return (
          <>
            <NavBar />
            <PageContentWrapper>
              <ProfilePageContent socUser={socUser} />
            </PageContentWrapper>
          </>
        )
      }}
    </QueryGuard>
  )
}

const ProfilePageContent = ({socUser}: {socUser: SocUser | null}) => {
  const [name, setName] = useState(socUser?.name || '')
  const [nameError, setNameError] = useState('')
  const [nameEditing, setNameEditing] = useState(false)
  const [changeLoading, setChangeLoading] = useState(false)
  const {logout} = useAuth()
  const getMyCoursesQuery = useGetMyCourses()
  const editSocUser = useEditUser()
  const router = useRouter()

  if (!socUser) return null

  const handleGoBack = () => {
    router.back()
  }

  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameError('')
  }

  const submitChangedName = async () => {
    if (!name.trimEnd()) {
      setNameError('Meno nemôže byť prázdne')
    } else {
      setChangeLoading(true)
      try {
        await editSocUser.mutateAsync({
          name,
          imageUrl: socUser.imageUrl,
          receiveNewsletter: socUser.receiveNewsletter,
          subscribedFrom: 'PROFILE',
        })
      } catch (err) {
        setChangeLoading(false)
      } finally {
        setNameEditing(false)
        setChangeLoading(false)
      }
    }
  }

  const cancelEditName = () => {
    setName(socUser.name)
    setNameEditing(false)
  }

  const submitChangedNewsletter = async () => {
    setChangeLoading(true)
    try {
      await editSocUser.mutateAsync({
        name,
        imageUrl: socUser.imageUrl,
        receiveNewsletter: true,
        subscribedFrom: 'PROFILE',
      })
    } catch (err) {
      setChangeLoading(false)
    } finally {
      setChangeLoading(false)
    }
  }

  const renderNewsletterSignUp = () => {
    return (
      <NewsletterFlexWrapper
        direction="column"
        gap="16px"
        alignItems="flex-start"
      >
        <Heading variant="h4" withAccentUnderline normalWeight>
          Odber noviniek
        </Heading>
        <Button
          disabled={changeLoading}
          variant="accent"
          onClick={submitChangedNewsletter}
          style={{alignSelf: 'stretch'}}
        >
          Prihlásiť sa na odber noviniek
        </Button>
      </NewsletterFlexWrapper>
    )
  }

  const renderEditNameTextField = () => {
    return (
      <Flex direction="column" gap="8px">
        <StyledTextField
          text={name}
          onTextChanged={onNameChanged}
          maxLength={64}
          label="Meno"
          errorText={nameError}
        />
        <Flex gap="8px" alignSelf="stretch" justifyContent="space-between">
          <Button
            disabled={changeLoading}
            variant="accent"
            style={{flex: 1}}
            onClick={submitChangedName}
          >
            Potvrdiť
          </Button>
          <Button
            disabled={changeLoading}
            style={{flex: 1}}
            onClick={cancelEditName}
          >
            Zrušiť
          </Button>
        </Flex>
      </Flex>
    )
  }

  return (
    <>
      <GoBackText size="small" onClick={handleGoBack}>
        &larr; Späť
      </GoBackText>
      <Flex direction="column" gap="32px" alignItems="flex-start">
        <ProfileInfoWithNewsletterFlex
          justifyContent="space-between"
          alignSelf="stretch"
          gap="16px"
        >
          <ProfileInfoFlex alignSelf="flex-start" gap="32px">
            <DefaultUserAvatar>
              <UserAvatar
                src={socUser.imageUrl || ''}
                name={socUser.name}
                sizePx={150}
              />
            </DefaultUserAvatar>
            <MobileUserAvatar>
              <UserAvatar
                src={socUser.imageUrl || ''}
                name={socUser.name}
                sizePx={100}
              />
            </MobileUserAvatar>
            <Flex
              direction="row"
              gap="16px"
              alignSelf="flex-start"
              alignItems="center"
            >
              {!nameEditing && (
                <>
                  <Heading variant="h4" withAccentUnderline normalWeight>
                    {socUser.name}
                  </Heading>
                  <StyledEditIcon onClick={() => setNameEditing(true)} />
                </>
              )}
              {nameEditing && renderEditNameTextField()}
            </Flex>
          </ProfileInfoFlex>

          {!socUser.receiveNewsletter && renderNewsletterSignUp()}
        </ProfileInfoWithNewsletterFlex>

        <QueryGuard {...getMyCoursesQuery}>
          {(courses) => (
            <Flex
              direction="column"
              gap="32px"
              alignSelf="flex-start"
              alignItems="flex-start"
            >
              {courses.length > 0 && (
                <Heading variant="h4" withAccentUnderline normalWeight>
                  Moje kurzy
                </Heading>
              )}
              <Courses courses={courses} shouldLinkToTakeCourse />
            </Flex>
          )}
        </QueryGuard>

        <Button onClick={logout}>Odhlásiť</Button>
      </Flex>
    </>
  )
}

const StyledEditIcon = styled(AiOutlineEdit)`
  width: 26px;
  height: 26px;
  color: var(--color-accent);
  &:hover {
    cursor: pointer;
  }
`

const ProfileInfoWithNewsletterFlex = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
    gap: 32px;
  }
`

const ProfileInfoFlex = styled(Flex)`
  @media ${device.S} {
    flex-direction: column;
  }
`

const NewsletterFlexWrapper = styled(Flex)`
  @media ${device.M} {
    align-self: flex-start;
  }
`

const DefaultUserAvatar = styled.div`
  @media ${device.S} {
    display: none;
  }
`

const MobileUserAvatar = styled.div`
  display: none;

  @media ${device.S} {
    display: block;
  }
`

const StyledTextField = styled(TextField)`
  width: 340px;
  @media ${device.S} {
    width: 100%;
  }
`

const GoBackText = styled(Text)`
  cursor: pointer;
  margin-bottom: 32px;
`

export default ProfilePage
