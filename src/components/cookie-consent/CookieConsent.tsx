import React, {useContext, useEffect, useState} from 'react'
import {hasCookie, setCookie} from 'cookies-next'
import Flex from '../core/Flex'
import Text from '../core/Text'
import styled from 'styled-components'
import {createPortal} from 'react-dom'
import {device} from '../../theme/device'
import Button from '../core/Button'
import {GDPR_URL} from '../../constants'
import CookieConsentContext from './CookieConsentContext'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true)
  const {setAggreedToCookies} = useContext(CookieConsentContext)

  useEffect(() => {
    setShowConsent(!hasCookie('cookieConsent'))
  }, [])

  const denyCookie = () => {
    setShowConsent(false)
    setCookie('cookieConsent', 'false', {})
  }

  const acceptCookie = () => {
    setShowConsent(false)
    setAggreedToCookies(true)
    setCookie('cookieConsent', 'true', {})
  }

  if (!showConsent) {
    return null
  }

  return (
    <>
      {showConsent &&
        createPortal(
          <Background>
            <ContentWrapper
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
              <Flex gap="12px">
                <Button onClick={denyCookie}>Odmietnuť</Button>
                <Button onClick={acceptCookie} variant="accent">
                  Súhlasím
                </Button>
              </Flex>
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
  /* background-color: rgba(var(--color-primary), 0.75); */ // NOT WORKING
  background: linear-gradient(
    150deg,
    var(--color-accent) 35%,
    var(--color-primary) 100%
  );
`
const ContentWrapper = styled(Flex)`
  width: 100%;
  padding: 24px 32px;

  @media ${device.M} {
    flex-direction: column;
  }
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

export default CookieConsent
