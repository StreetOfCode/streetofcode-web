import {NextPage} from 'next'
import Image from 'next/image'
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
import {device} from '../theme/device'

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
      <UserAvatar imageUrl={imageUrl || ''} name={name} sizePx={150} />
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
  email: string
  receiveNewsletter: boolean
  onStepForward: (newsletter: boolean) => void
  onStepBack: () => void
}

const Newsletter = ({currentStep, email, receiveNewsletter, onStepForward, onStepBack}: NewsletterProps) => {
  const [newsletter, setNewsletter] = useState(receiveNewsletter)

  const onSubmit = () => {
    onStepForward(newsletter)
  }

  return (
    <PageContent>
      <Flex direction="column" alignItems="flex-start" gap="20px">
        <Heading normalWeight variant="h3" withAccentUnderline noWrap>Prihlásenie na odber noviniek</Heading>
        <Text>Prihlás sa na odber našich noviniek a medzi prvými sa dozvieš o nových kurzoch, videách,
          podcastoch a všeličom ďalšom, čo podnikneme. Neboj sa, nebudeme ťa spamovať a občas ta potešíme aj nejakou
          tou programátorskou radou.</Text>
        <CheckBox
          checked={newsletter}
          onToggle={(newValue) => setNewsletter(newValue)}
          label={`Poslať potvrdzujúci email (${email})`}
          size={'22px'}
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
  onStepForward: (invitation: boolean) => void
  onStepBack: () => void
  disableButtons?: boolean
}

const DiscordServer = ({
  currentStep,
  email,
  onStepBack,
  onStepForward,
  disableButtons,
}: DiscordProps) => {
  const [sendDiscord, setSendDiscord] = useState(true)

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
          size={'22px'}
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
  const [receiveNewsletter, setReceiveNewsletter] = useState(true)
  const [loading, setLoading] = useState(false)
  const email = user?.email || ''

  const useAddSocUser = useAddUser()

  if (user == null || isLoading) return <Loading />

  if (!router.query || !router.query.from) {
    // if user visits onboarding page by manually writing url then he will be redirected to landing page
    router.push('/')
  }

  const handleFinishOnboarding = async (discordInvitation: boolean) => {
    setLoading(true)
    try {
      await useAddSocUser.mutateAsync({
        id: user.uid,
        name,
        email,
        imageUrl: user.photoURL,
        receiveNewsletter,
        sendDiscordInvitation: discordInvitation,
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
        <LogoWrapper>
          <LogoImage layout="fill" alt="Logo" src="/soc_logo.png" />
        </LogoWrapper>
        <Heading variant="h3" normalWeight withAccentUnderline>Onboarding</Heading>
        <LogoWrapper style={{visibility: 'hidden'}} />
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
          email={email}
          receiveNewsletter={receiveNewsletter}
          onStepBack={() => setCurrentStep(currentStep - 1)}
          onStepForward={(receiveNewsletter) => {
            setReceiveNewsletter(receiveNewsletter)
            setCurrentStep(currentStep + 1)
          }}

        />}
        {currentStep === 2 && <DiscordServer
          currentStep={currentStep}
          email={email}
          onStepBack={() => setCurrentStep(currentStep - 1)}
          onStepForward={async (sendInvitation) => {
            await handleFinishOnboarding(sendInvitation)
          }}
          disableButtons={loading}
        />}
      </WrapperFlex>
    </Wrapper>
  )
}

export default OnboardingPage

const Wrapper = styled.div`
  margin: 0 auto;
  width: clamp(360px, 100%, 1200px);
  flex: 1;
  margin-bottom: 150px;

  @media ${device.mobile} {
    width: 100%;
  }
`

const NavBarWrapper = styled(Flex)`
  padding: 24px 32px;
  margin-bottom: 200px;
`

const LogoWrapper = styled.div`
  position: relative;
  aspect-ratio: 3 / 1;
  height: 60px;
`

const PageContent = styled.div`
  align-self: center;
  width: 100%;
`

const WrapperFlex = styled(Flex)`
  padding: 0 32px;
  max-width: 440px;
  margin: 0 auto;
`

const BackButton = styled(Text)`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`

const LogoImage = styled(Image)`
  filter: ${(props) => props.theme.type === 'LIGHT' ? 'unset' : 'invert(100%)'};
`
