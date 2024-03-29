import React, {useContext, useEffect, useState} from 'react'
import Flex from '../core/Flex'
import Text from '../core/Text'
import styled from 'styled-components'
import {createPortal} from 'react-dom'
import {device} from '../../theme/device'
import Button from '../core/Button'
import {GDPR_URL} from '../../constants'
import {CookieConsentContext} from './CookieConsentContext'
import CheckBox from '../core/CheckBox'
import {useTheme} from '../../hooks/useTheme'
import {CookieConsent} from '../../types'

const CookieConsentModal = () => {
  const [showConsent, setShowConsent] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [userCookieConsent, setUserCookieConsent] = useState<CookieConsent>({
    agreedToAnalyticsCookies: false,
    agreedToMarketingCookies: false,
  })
  const {theme} = useTheme()
  const {cookieConsent, setCookieConsent} = useContext(CookieConsentContext)

  useEffect(() => {
    if (cookieConsent == null) {
      setShowConsent(true)
    }
  }, [cookieConsent, setShowConsent])

  const denyCookies = () => {
    setCookieConsent({
      agreedToAnalyticsCookies: false,
      agreedToMarketingCookies: false,
    })
    setShowConsent(false)
  }

  const acceptAllCookies = () => {
    setCookieConsent({
      agreedToAnalyticsCookies: true,
      agreedToMarketingCookies: true,
    })
    setShowConsent(false)
  }

  const confirmSettings = () => {
    setCookieConsent(userCookieConsent)
    setShowConsent(false)
  }

  if (!showConsent) {
    return null
  }

  const toggleSettings = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setSettingsOpen(!settingsOpen)
  }

  return (
    <>
      {showConsent &&
        createPortal(
          <Background>
            <ContentWrapper direction="column" gap="24px">
              <MainContent
                justifyContent="space-between"
                alignItems="center"
                gap="32px"
              >
                <CookiesText color="secondary">
                  Za účelom lepšieho fungovania webstránky používame cookies🍪.
                  Viac info nájdeš na{' '}
                  <a href={GDPR_URL} target="_blank" rel="noopener noreferrer">
                    ochrana osobných údajov.
                  </a>
                </CookiesText>
                <ButtonsFlex gap="12px">
                  <SettingsText onClick={toggleSettings}>
                    Nastavenia
                  </SettingsText>
                  <Button onClick={denyCookies}>Odmietnuť</Button>
                  <Button
                    onClick={() => {
                      if (settingsOpen) {
                        confirmSettings()
                      } else {
                        acceptAllCookies()
                      }
                    }}
                    variant="accent"
                    noWrap
                  >
                    {settingsOpen ? 'Potvrdiť výber' : 'Súhlasím'}
                  </Button>
                </ButtonsFlex>
              </MainContent>
              {settingsOpen && (
                <SettingsFlexWrapper
                  direction="column"
                  gap="12px"
                  alignItems="flex-start"
                  alignSelf="stretch"
                >
                  <CheckBox
                    checkedColor={theme.secondaryColor}
                    checked
                    disabled
                    size="24px"
                    label="Potrebné cookies"
                  />
                  <CookieDescription size="small">
                    Tieto cookies sú potrebné pre správne fungovanie webstránky.
                  </CookieDescription>
                  <CheckBox
                    checkedColor={theme.secondaryColor}
                    checked={userCookieConsent.agreedToAnalyticsCookies}
                    onToggle={(value) =>
                      setUserCookieConsent({
                        ...userCookieConsent,
                        agreedToAnalyticsCookies: value,
                      })
                    }
                    size="24px"
                    label="Analytické cookies"
                  />
                  <CookieDescription size="small">
                    Analytické cookies nám pomáhajú pochopiť, ako komunikovať s
                    návštevníkmi webovej stránky prostredníctvom zberu a
                    hlásenia informácií anonymne.
                  </CookieDescription>
                  <CheckBox
                    checkedColor={theme.secondaryColor}
                    checked={userCookieConsent.agreedToMarketingCookies}
                    onToggle={(value) =>
                      setUserCookieConsent({
                        ...userCookieConsent,
                        agreedToMarketingCookies: value,
                      })
                    }
                    size="24px"
                    label="Marketingové cookies"
                  />
                  <CookieDescription size="small">
                    Marketingové cookies používame na sledovanie návštevníkov na
                    webovej stránke. Tieto cookies sú nastavené tretími
                    stranami, ktoré môžu sledovať používateľa cez viacero
                    webových stránok a používať zozbierané údaje na zobrazenie
                    prispôsobených reklám.
                  </CookieDescription>
                </SettingsFlexWrapper>
              )}
            </ContentWrapper>
          </Background>,
          document.body,
        )}
    </>
  )
}

const Background = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(
    150deg,
    var(--color-accent) 35%,
    var(--color-primary) 100%
  );
`
const SettingsText = styled(Text)`
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
  @media ${device.XS} {
    order: 3;
  }
`

const SettingsFlexWrapper = styled(Flex)`
  @media ${device.S} {
    align-self: center;
  }
`

const CookieDescription = styled(Text)`
  opacity: 0.8;
`

const ButtonsFlex = styled(Flex)`
  @media ${device.S} {
    flex-wrap: wrap;
  }
`

const MainContent = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
  }
`

const ContentWrapper = styled(Flex)`
  margin: 0 auto;
  max-width: 880px;
  padding: 24px 32px;
`

const CookiesText = styled(Text)`
  a {
    color: var(--color-secondary);
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
`

export default CookieConsentModal
