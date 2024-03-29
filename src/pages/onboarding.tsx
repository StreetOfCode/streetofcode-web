import {NextPage} from 'next'
import Image from 'next/image'
import {useRouter} from 'next/router'
import React, {ChangeEvent, useState} from 'react'
import styled from 'styled-components'
import {useAuth} from '../AuthUserContext'
import {useAddUser} from '../api/user'
import Button from '../components/core/Button'
import CheckBox from '../components/core/CheckBox'
import Flex from '../components/core/Flex'
import Heading from '../components/core/Heading'
import Text from '../components/core/Text'
import TextField from '../components/core/TextField'
import UserAvatar from '../components/domain/user/UserAvatar'
import Loading from '../components/Loading'
import {routes} from '../routes'
import {device} from '../theme/device'
import {GDPR_URL} from '../constants'

const TOTAL_STEPS = 3

type ConfirmNameProps = {
  currentStep: number
  displayName: string
  imageUrl: string | null
  onStepForward: (name: string) => void
}

const CHECK_EMAIL_IN_SPAN_NOTICE =
  'Prosím skontroluj, či ti potvrdzovací email neprišiel do spamu. Ak áno, tak ho ' +
  'prosím vo svojej emailovej službe označ ako "not spam".'

const ConfirmName = ({
  currentStep,
  displayName,
  imageUrl,
  onStepForward,
}: ConfirmNameProps) => {
  const [name, setName] = useState(displayName || '')
  const [nameError, setNameError] = useState('')
  const onNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameError('')
  }

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!name.trimEnd()) {
      setNameError('Meno nemôže byť prázdne')
    } else {
      onStepForward(name)
    }
  }

  return (
    <PageContent>
      <UserAvatar src={imageUrl || ''} name={name} sizePx={150} />
      <form>
        <Flex direction="column" alignItems="flex-start" gap="20px">
          <Heading normalWeight variant="h4" align="left" withAccentUnderline>
            Meno
          </Heading>
          <TextField
            text={name}
            onTextChanged={onNameChanged}
            label="Meno"
            errorText={nameError}
            disableMultiline
          />
          <Button variant="accent" onClick={onSubmit}>
            Pokračovať
          </Button>
        </Flex>
      </form>
      <Text weight="bold" align="right">
        {currentStep + 1}/{TOTAL_STEPS}
      </Text>
    </PageContent>
  )
}

type NewsletterProps = {
  currentStep: number
  email: string
  receiveNewsletter: boolean
  onStepForward: (newsletter: boolean) => void
  onStepBack: () => void
}

const Newsletter = ({
  currentStep,
  email,
  receiveNewsletter,
  onStepForward,
  onStepBack,
}: NewsletterProps) => {
  const [newsletter, setNewsletter] = useState(receiveNewsletter)

  const onSubmit = () => {
    onStepForward(newsletter)
  }

  return (
    <PageContent>
      <Flex direction="column" alignItems="flex-start" gap="20px">
        <Heading normalWeight variant="h4" withAccentUnderline noWrap>
          Prihlásenie na odber noviniek
        </Heading>
        <Text>
          Prihlás sa na odber našich noviniek a medzi prvými sa dozvieš o nových
          kurzoch, videách, podcastoch a všeličom ďalšom, čo podnikneme. Neboj
          sa, nebudeme ťa spamovať a občas ta potešíme aj nejakou tou
          programátorskou radou.
        </Text>
        <CheckBox
          checked={newsletter}
          onToggle={(newValue) => setNewsletter(newValue)}
          label={`Chcem dostávať novinky na (${email})`}
          size={'24px'}
        />
        <Text>
          Poskytnutím emailu súhlasíš s jeho spracovaním v súlade s{' '}
          <a href={GDPR_URL} target="_blank">
            ochranou osobných údajov
          </a>
        </Text>
        <Text size="very-small">{CHECK_EMAIL_IN_SPAN_NOTICE}</Text>
        <Button variant="accent" onClick={onSubmit}>
          Pokračovať
        </Button>
        <Flex justifyContent="space-between" alignSelf="stretch">
          <BackButton onClick={onStepBack}>Späť</BackButton>
          <Text weight="bold" align="right">
            {currentStep + 1}/{TOTAL_STEPS}
          </Text>
        </Flex>
      </Flex>
    </PageContent>
  )
}

type DiscordProps = {
  currentStep: number
  email: string
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
  const [sendDiscord, setSendDiscord] = useState(false)

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
        <Heading normalWeight variant="h4" withAccentUnderline noWrap>
          Discord server
        </Heading>
        <Text>
          Ak sa učíš programovať, tak možno ta bude zaujímať aj náš Discord
          server, kde sa vieš na všeličo opýtať, prípadne vieš iba sledovať, čo
          sa pýtajú ostatní a niečo sa priučiť.
        </Text>
        <CheckBox
          checked={sendDiscord}
          onToggle={(newValue) => setSendDiscord(newValue)}
          label={`Chcem dostať pozvánku na (${email})`}
          size={'24px'}
        />
        <Text>
          Poskytnutím emailu súhlasíš s jeho spracovaním v súlade s{' '}
          <a href={GDPR_URL} target="_blank">
            ochranou osobných údajov
          </a>
        </Text>
        <Text size="very-small">{CHECK_EMAIL_IN_SPAN_NOTICE}</Text>
        <Button disabled={disableButtons} variant="accent" onClick={onSubmit}>
          Dokončiť
        </Button>
        <Flex justifyContent="space-between" alignSelf="stretch">
          <BackButton onClick={handleOnStepBack}>Späť</BackButton>
          <Text weight="bold" align="right">
            {currentStep + 1}/{TOTAL_STEPS}
          </Text>
        </Flex>
      </Flex>
    </PageContent>
  )
}

const OnboardingPage: NextPage = () => {
  const {user, logout, isLoading} = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [name, setName] = useState(user?.displayName || '')
  const [receiveNewsletter, setReceiveNewsletter] = useState(false)
  const [loading, setLoading] = useState(false)
  const email = user?.email || ''

  const useAddSocUser = useAddUser()

  if (user == null || isLoading) return <Loading />

  if (!router.query || !router.query.from) {
    // if user visits onboarding page by manually writing url then he will be redirected to landing page
    router.push(routes.root)
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
        subscribedFrom: 'ONBOARDING',
      })
    } catch (err) {
      setLoading(false)
    } finally {
      if (router.query && router.query.from) {
        router.push(router.query.from as string)
      } else {
        router.push(routes.root)
      }
    }
  }

  return (
    <Wrapper>
      <NavBarWrapper justifyContent="space-between">
        <LogoWrapper>
          <LogoImage layout="fill" alt="Logo" src="/soc_logo.png" />
        </LogoWrapper>
        <Heading variant="h4" normalWeight withAccentUnderline>
          Onboarding
        </Heading>
        <Button onClick={logout}>Odhlásiť</Button>
      </NavBarWrapper>
      <MobileNavBarWrapper direction="column" gap="32px">
        <Flex justifyContent="space-between" alignSelf="stretch">
          <LogoWrapper>
            <LogoImage layout="fill" alt="Logo" src="/soc_logo.png" />
          </LogoWrapper>

          <Button onClick={logout}>Odhlásiť</Button>
        </Flex>
        <Heading variant="h4" normalWeight withAccentUnderline>
          Onboarding
        </Heading>
      </MobileNavBarWrapper>
      <WrapperFlex
        direction="column"
        gap="20px"
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        {currentStep === 0 && (
          <ConfirmName
            currentStep={currentStep}
            displayName={name || ''}
            imageUrl={user.photoURL}
            onStepForward={(name) => {
              setName(name)
              setCurrentStep(currentStep + 1)
            }}
          />
        )}
        {currentStep === 1 && (
          <Newsletter
            currentStep={currentStep}
            email={email}
            receiveNewsletter={receiveNewsletter}
            onStepBack={() => setCurrentStep(currentStep - 1)}
            onStepForward={(receiveNewsletter) => {
              setReceiveNewsletter(receiveNewsletter)
              setCurrentStep(currentStep + 1)
            }}
          />
        )}
        {currentStep === 2 && (
          <DiscordServer
            currentStep={currentStep}
            email={email}
            onStepBack={() => setCurrentStep(currentStep - 1)}
            onStepForward={async (sendInvitation) => {
              await handleFinishOnboarding(sendInvitation)
            }}
            disableButtons={loading}
          />
        )}
      </WrapperFlex>
    </Wrapper>
  )
}

export default OnboardingPage

const Wrapper = styled.div`
  margin: 0 auto;
  width: clamp(320px, 100%, 1200px);
  flex: 1;
  margin-bottom: 150px;

  @media ${device.L} {
    max-width: 900px;
  }

  @media ${device.S} {
    width: 100%;
  }
`

const NavBarWrapper = styled(Flex)`
  padding: 24px 32px;
  margin-bottom: 200px;

  @media ${device.S} {
    display: none;
  }
`

const MobileNavBarWrapper = styled(Flex)`
  display: none;
  padding: 24px 32px;
  margin-bottom: 200px;

  @media ${device.S} {
    display: flex;
  }
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
  [theme-type='DARK'] & {
    filter: invert(100%);
  }
`
