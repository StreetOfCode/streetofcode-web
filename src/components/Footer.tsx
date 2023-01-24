import {useRouter} from 'next/router'
import React from 'react'
import Image from 'next/image'
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai'
import {FaDiscord, FaSpotify} from 'react-icons/fa'
import {SiPatreon} from 'react-icons/si'
import styled from 'styled-components'
import {device} from '../theme/device'
import Flex from './core/Flex'
import NextLink from './core/NextLink'
import Text from './core/Text'
import {useAuth} from '../AuthUserContext'
import {useGetUser} from '../api/user'
import {QueryGuard} from '../QueryGuard'
import NewsletterForm from './domain/newsletter/NewsletterForm'
import {routes} from '../routes'

const Footer = () => {
  const router = useRouter()
  const iconSize = 32
  const {user} = useAuth()
  const getSocUser = useGetUser(!!user)

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <Background>
      <WrapperFlex justifyContent="space-between">
        <LogoWithAddressFlex
          direction="column"
          alignSelf="stretch"
          justifyContent="space-between"
          alignItems="flex-start"
          flex="1"
        >
          <LogoWrapper>
            <LogoImage
              alt="Logo"
              src="/soc_logo.png"
              layout="fill"
              onClick={() => router.push(routes.root)}
            />
          </LogoWrapper>
          <div>
            <Text color="primary" size="small">
              Street of Code o.z.
            </Text>
            <Text color="primary" size="small">
              Hlaváčiková 29
            </Text>
            <Text color="primary" size="small">
              84105, Bratislava
            </Text>
          </div>
        </LogoWithAddressFlex>
        <NewsletterCopyrightAndSocials
          direction="column"
          gap="32px"
          alignSelf="stretch"
          justifyContent="space-between"
          flex="1"
        >
          {!user && <NewsletterForm from="FOOTER" />}
          {user && (
            <QueryGuard {...getSocUser}>
              {(socUser) => {
                return (
                  <>
                    {socUser && !socUser.receiveNewsletter && (
                      <NewsletterForm from="FOOTER" user={socUser} />
                    )}
                    {socUser && socUser.receiveNewsletter && <EmptyBox />}
                    {user && !socUser && <EmptyBox />}
                  </>
                )
              }}
            </QueryGuard>
          )}
          <Flex direction="column" gap="24px">
            <Text color="primary">
              Copyright © {getCurrentYear()} Street of Code
            </Text>
            <Flex gap="8px">
              <SocialIconLink href={routes.github} target="_blank">
                <AiFillGithub size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.twitter} target="_blank">
                <AiFillTwitterCircle size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.facebook} target="_blank">
                <AiFillFacebook size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.spotify} target="_blank">
                <FaSpotify size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.patreon} target="_blank">
                <SiPatreon size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.discord} target="_blank">
                <FaDiscord size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.instagram} target="_blank">
                <AiFillInstagram size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href={routes.youtube} target="_blank">
                <AiFillYoutube size={iconSize} />
              </SocialIconLink>
            </Flex>
          </Flex>
        </NewsletterCopyrightAndSocials>

        <NavigationFlex justifyContent="flex-end" flex="1">
          <Flex direction="column" gap={'24px'} alignItems="stretch">
            <NextLink href={routes.kurzy.index}>
              <Text color="primary" uppercase>
                kurzy
              </Text>
            </NextLink>
            <NextLink href={routes.clanky.index}>
              <Text color="primary" uppercase>
                články
              </Text>
            </NextLink>
            <NextLink href={routes.oProjekte}>
              <Text color="primary" uppercase>
                O projekte
              </Text>
            </NextLink>
            <NextLink href={routes.podcast.index}>
              <Text color="primary" uppercase>
                podcast
              </Text>
            </NextLink>
            <NextLink href={routes.feedback}>
              <Text color="primary" uppercase>
                feedback
              </Text>
            </NextLink>
          </Flex>
        </NavigationFlex>
      </WrapperFlex>
    </Background>
  )
}

const Background = styled.div`
  background-color: var(--color-footer-background);
`

const EmptyBox = styled.div`
  flex: 1;

  @media ${device.S} {
    display: none;
  }
`

const WrapperFlex = styled(Flex)`
  padding: 24px 32px;
  width: clamp(320px, 100%, 1200px);
  margin: 0 auto;

  @media ${device.L} {
    max-width: 900px;
  }

  @media ${device.S} {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`

const LogoWithAddressFlex = styled(Flex)`
  @media ${device.S} {
    flex-direction: row;
    justify-content: center;
    gap: 32px;
    order: 2;
  }
`

const NewsletterCopyrightAndSocials = styled(Flex)`
  @media ${device.S} {
    align-self: center;
    order: 3;
  }
`

const NavigationFlex = styled(Flex)`
  @media ${device.S} {
    order: 1;
  }
`

const SocialIconLink = styled.a`
  color: var(--color-primary);

  &:hover {
    opacity: 80%;
  }
`

const LogoWrapper = styled.div`
  margin-left: -24px;
  position: relative;
  aspect-ratio: 3 / 1;
  height: 60px;
`

const LogoImage = styled(Image)`
  [theme-type='LIGHT'] & {
    filter: invert(100%);
  }
`

export default Footer
