import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {ChangeEvent, useState} from 'react'
import styled from 'styled-components'
import {useAuth} from '../AuthUserContext'
import {useAddUser} from '../components/api/user'
import Button from '../components/core/Button'
import CheckBox from '../components/core/CheckBox'
import Flex from '../components/core/Flex'
import Heading from '../components/core/Heading'
import Text from '../components/core/Text'
import TextField from '../components/core/TextField'
import UserAvatar from '../components/domain/user/UserAvatar'
import Loading from '../components/Loading'
import {emailRegex} from '../utils'

const TOTAL_STEPS = 3

type ConfirmNameProps = {
  currentStep: number,
  displayName: string,
  imageUrl: string | null,
  onStepForward: (name: string) => void
}

const ConfirmName = ({currentStep, displayName, imageUrl, onStepForward}: ConfirmNameProps) => {
  const [name, setName] = useState(displayName || '')
  const [nameError, setNameError] = useState('')
  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameError('')
  }

  const onSubmit = () => {
    if (!name.trimEnd()) {
      setNameError('Meno nemôže byť prázdne')
    } else {
      onStepForward(name)
    }
  }

  return (
    <PageContent>
      <UserAvatar imageUrl={imageUrl || ''} name={name} sizePx={150}  style={{margin: '0 auto'}} />
      <Flex direction="column" alignItems="flex-start" gap="20px">
        <Heading normalWeight variant="h3" align="left" withAccentUnderline>Meno</Heading>
        <TextField
          text={name}
          onTextChanged={onNameChanged}
          label="Meno"
          errorText={nameError}
        />
        <Button variant="accent" onClick={onSubmit}>Pokračovať</Button>
      </Flex>
      <Text weight="bold" align="right">{currentStep + 1}/{TOTAL_STEPS}</Text>
    </PageContent>
  )
}

type NewsletterProps = {
  currentStep: number,
  newsletterEmail: string
  receiveNewsletter: boolean
  onStepForward: (email: string, newsletter: boolean) => void
  onStepBack: () => void
}

const Newsletter = ({currentStep, newsletterEmail, receiveNewsletter, onStepForward, onStepBack}: NewsletterProps) => {
  const [email, setEmail] = useState(newsletterEmail || '')
  const [emailError, setEmailError] = useState('')
  const [newsletter, setNewsletter] = useState(receiveNewsletter)

  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const onSubmit = () => {
    if (!email.trim()) {
      setEmailError('Email nemôže byť prázdny')
    } else if (!emailRegex.test(email)) {
      setEmailError('Nesprávny formát emailu')
    } else {
      onStepForward(email, newsletter)
    }
  }

  return (
    <PageContent>
      <Flex direction="column" alignItems="flex-start" gap="20px">
        <Heading normalWeight variant="h3" withAccentUnderline noWrap>Prihlásenie na odber noviniek</Heading>
        <Text>Prihlás sa na odber našich noviniek a medzi prvými sa dozvieš o nových kurzoch, videách,
          podcastoch a všeličom ďalšom, čo podnikneme. Neboj sa, nebudeme ťa spamovať a občas ta potešíme aj nejakou
          tou programátorskou radou.</Text>
        <TextField
          text={email}
          onTextChanged={onEmailChanged}
          label="Email"
          errorText={emailError}
        />
        <CheckBox
          checked={newsletter}
          onToggle={(newValue) => setNewsletter(newValue)}
          label={'Chcem dostávať príležitostné maily'}
        />
        <Button variant="accent" onClick={onSubmit}>Pokračovať</Button>
        <Flex justifyContent="space-between" alignSelf="stretch">
          <BackButton onClick={onStepBack}>Späť</BackButton>
          <Text weight="bold" align="right">{currentStep + 1}/{TOTAL_STEPS}</Text>
        </Flex>
      </Flex>
    </PageContent>
  )
}

type DiscordProps = {
  currentStep: number,
  email: string,
  sendDiscordInvitation: boolean
  onStepForward: (invitation: boolean) => void
  onStepBack: () => void
  disableButtons?: boolean
}

const DiscordServer = ({
  currentStep,
  email,
  sendDiscordInvitation,
  onStepBack,
  onStepForward,
  disableButtons,
}: DiscordProps) => {
  const [sendDiscord, setSendDiscord] = useState(sendDiscordInvitation)

  const onSubmit = () => {
    if (!disableButtons) {
      onStepForward(sendDiscord)
    }
  }

  const handleOnStepBack = () => {
    if (!disableButtons) {
      onStepBack()
    }
  }

  return (
    <PageContent>
      <Flex direction="column" alignItems="flex-start" gap="20px">
        <Heading normalWeight variant="h3" withAccentUnderline noWrap>Discord server</Heading>
        <Text>Ak sa učíš programovať, tak možno ta bude zaujímať aj náš Discord server,
          kde sa vieš na všeličo opýtať,
          prípadne vieš iba sledovať, čo sa pýtajú ostatní a niečo sa priučiť.</Text>
        <CheckBox
          checked={sendDiscord}
          onToggle={(newValue) => setSendDiscord(newValue)}
          label={`Chcem dostať pozvánku (${email})`}
        />
        <Button disabled={disableButtons} variant="accent" onClick={onSubmit}>Dokončiť</Button>
        <Flex justifyContent="space-between" alignSelf="stretch">
          <BackButton onClick={handleOnStepBack}>Späť</BackButton>
          <Text weight="bold" align="right">{currentStep + 1}/{TOTAL_STEPS}</Text>
        </Flex>
      </Flex>
    </PageContent>
  )
}


const OnboardingPage: NextPage = () => {
  const {user, isLoading} = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [name, setName] = useState(user?.displayName || '')
  const [sendDiscordInvitation, setSendDiscordInvitation] = useState(true)
  const [receiveNewsletter, setReceiveNewsletter] = useState(true)
  const [newsletterEmail, setNewsletterEmail] = useState(user?.email || '')
  const [loading, setLoading] = useState(false)

  const useAddSocUser = useAddUser()

  if (user == null || isLoading) return <Loading />

  if (!router.query || !router.query.from) {
    // if user visits onboarding page by manually writing url then he will be redirected to landing page
    router.push('/')
  }

  const handleFinishOnboarding = async () => {
    setLoading(true)
    try {
      await useAddSocUser.mutateAsync({
        id: user.uid,
        name,
        email: newsletterEmail,
        imageUrl: user.photoURL,
        receiveNewsletter,
        sendDiscordInvitation,
      })
    } catch (err) {
      setLoading(false)
    } finally {
      if (router.query && router.query.from) {
        router.replace((router.query.from) as string)
      } else {
        router.replace('/')
      }
    }
  }

  return (
    <Wrapper>
      <NavBarWrapper justifyContent="space-between">
        <Logo alt="Logo" src="soc_logo.png" />
        <Heading variant="h3" normalWeight withAccentUnderline>Onboarding</Heading>
        <Logo alt="Logo" src="soc_logo.png" style={{visibility: 'hidden'}} />
      </NavBarWrapper>
      <WrapperFlex
        direction="column"
        gap="20px"
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        {currentStep === 0 && <ConfirmName
          currentStep={currentStep}
          displayName={name || ''}
          imageUrl={user.photoURL}
          onStepForward={(name) => {
            setName(name)
            setCurrentStep(currentStep + 1)
          }}
        />}
        {currentStep === 1 && <Newsletter
          currentStep={currentStep}
          newsletterEmail={newsletterEmail || ''}
          receiveNewsletter={receiveNewsletter}
          onStepBack={() => setCurrentStep(currentStep - 1)}
          onStepForward={(email, receiveNewsletter) => {
            setNewsletterEmail(email)
            setReceiveNewsletter(receiveNewsletter)
            setCurrentStep(currentStep + 1)
          }}

        />}
        {currentStep === 2 && <DiscordServer
          currentStep={currentStep}
          email={newsletterEmail}
          sendDiscordInvitation={sendDiscordInvitation}
          onStepBack={() => setCurrentStep(currentStep - 1)}
          onStepForward={async (sendInvitation) => {
            setSendDiscordInvitation(sendInvitation)
            await handleFinishOnboarding()
          }}
          disableButtons={loading}
        />}
      </WrapperFlex>
    </Wrapper>
  )
}

export default OnboardingPage

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  margin-bottom: 150px;
`

const NavBarWrapper = styled(Flex)`
  padding: 1em 0em;
  width: clamp(920px, 100%, 1200px);
  margin: 0 auto;
  margin-bottom: 200px;
`

const Logo = styled.img`
  margin-left: -1em;
  height: 60px;
`

const PageContent = styled.div`
  align-self: center;
  width: 100%;
`

const WrapperFlex = styled(Flex)`
  max-width: 440px;
  margin: 0 auto;
`

const BackButton = styled(Text)`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`
