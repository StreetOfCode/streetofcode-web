import React, {ChangeEvent, useState} from 'react'
import {QueryGuard} from '../QueryGuard'
import {SocUser} from '../types'
import EditIcon from '@material-ui/icons/Edit'
import Text from '../components/core/Text'
import Flex from '../components/core/Flex'
import Heading from '../components/core/Heading'
import styled from 'styled-components'
import UserAvatar from '../components/domain/user/UserAvatar'
import Courses from '../components/domain/course/Courses'
import Button from '../components/core/Button'
import TextField from '../components/core/TextField'
import {useEditUser, useGetUser} from '../components/api/user'
import {NextPage} from 'next'
import {useAuth} from '../AuthUserContext'
import {useGetMyCourses} from '../components/api/myCourses'
import {useRouter} from 'next/router'
import PageContentWrapper from '../components/PageContentWrapper'
import NavBar from '../components/NavBar'


const ProfilePage: NextPage = () => {
  const getSocUser = useGetUser(true)
  const {user} = useAuth()
  const router = useRouter()

  if (!user) {
    // this page can be seen only by logged in users
    router.replace({pathname: `/login/${encodeURIComponent(location.pathname)}`})
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
      })
    } catch (err) {
      setChangeLoading(false)
    } finally {
      setChangeLoading(false)
    }
  }

  const renderNewsletterSignUp = () => {
    return (
      <Flex direction="column" gap="16px" alignItems="flex-start">
        <Heading variant="h3" withAccentUnderline normalWeight>Odber noviniek</Heading>
        <Button
          disabled={changeLoading}
          variant="accent"
          withoutUppercase
          onClick={submitChangedNewsletter}
          style={{alignSelf: 'stretch'}}
        >Prihlásiť sa na odber noviniek</Button>
      </Flex>
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
            withoutUppercase
            style={{flex: 1}}
            onClick={submitChangedName}
          >Potvrdiť</Button>
          <Button disabled={changeLoading} withoutUppercase style={{flex: 1}} onClick={cancelEditName}>Zrušiť</Button>
        </Flex>
      </Flex>
    )
  }

  return (
    <>
      <GoBackText size="small" onClick={handleGoBack}>&larr; Späť</GoBackText>
      <Flex direction="column" gap="32px" alignItems="flex-start">
        <Flex justifyContent="space-between" alignSelf="stretch" gap="16px">
          <Flex alignSelf="flex-start" gap="32px">
            <UserAvatar imageUrl={socUser.imageUrl || ''} name={socUser.name} sizePx={150} />
            <Flex direction="row" gap="16px" alignSelf="flex-start" alignItems="center">
              {!nameEditing &&
              <>
                <Heading variant="h3" withAccentUnderline normalWeight>{socUser.name}</Heading>
                <StyledEditIcon onClick={() => setNameEditing(true)} />
              </>}
              {nameEditing && renderEditNameTextField()}
            </Flex>
          </Flex>

          {!socUser.receiveNewsletter && renderNewsletterSignUp()}
        </Flex>

        <QueryGuard {...getMyCoursesQuery}>
          {(courses) =>
            (<Flex direction="column" gap="32px" alignSelf="flex-start" alignItems="flex-start">
              {courses.length > 0 && <Heading variant="h3" withAccentUnderline normalWeight>Moje kurzy</Heading>}
              <Courses courses={courses} />
            </Flex>)}
        </QueryGuard>

        <Button onClick={logout}>Odhlásiť</Button>
      </Flex>
    </>
  )
}

const StyledEditIcon = styled(EditIcon)`
  color: ${(props) => props.theme.accentColor};
  &:hover {
    cursor: pointer;
  }
`

const StyledTextField = styled(TextField)`
  width: 340px;
`

const GoBackText = styled(Text)`
  cursor: pointer;
  margin-bottom: 32px;
`

export default ProfilePage
