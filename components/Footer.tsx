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
import {useGetUser} from './api/user'
import {QueryGuard} from '../QueryGuard'
import NewsletterForm from './domain/newsletter/NewsletterForm'

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
            <LogoImage alt="Logo" src="/soc_logo.png" layout="fill" onClick={() => router.push('/')} />
          </LogoWrapper>
          <div>
            <Text color="primary" size="small">Street of Code o.z.</Text>
            <Text color="primary" size="small">Hlaváčiková 29</Text>
            <Text color="primary" size="small">84105, Bratislava</Text>
          </div>
        </LogoWithAddressFlex>
        <NewsletterCopyrightAndSocials
          direction="column"
          gap="32px"
          alignSelf="stretch"
          justifyContent="space-between"
          flex="1"
        >
          {!user && <NewsletterForm />}
          <QueryGuard {...getSocUser}>
            {(socUser) => {
              return (
                <>
                  {socUser && !socUser.receiveNewsletter && <NewsletterForm user={socUser} />}
                  {socUser && socUser.receiveNewsletter && <EmptyBox />}
                </>
              )
            }}
          </QueryGuard>
          <Flex direction="column" gap="24px">
            <Text color="primary">Copyright © {getCurrentYear()} Street of Code</Text>
            <Flex gap="8px">
              <SocialIconLink href="https://github.com/StreetOfCode" target="_blank">
                <AiFillGithub size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href="https://twitter.com/StreetofCode1" target="_blank">
                <AiFillTwitterCircle size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href="https://www.facebook.com/streetofcode/" target="_blank">
                <AiFillFacebook size={iconSize} />
              </SocialIconLink>
              <SocialIconLink
                href="https://open.spotify.com/show/1nBhViArymuLrxuU4XkwRP?si=3w6MXuQ-SPKpffrsQd3rKg&nd=1"
                target="_blank"
              ><FaSpotify size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href="https://www.patreon.com/streetofcode" target="_blank">
                <SiPatreon size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href="https://discord.com/invite/7K4dG6Nru4" target="_blank">
                <FaDiscord size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href="https://www.instagram.com/streetofcode/" target="_blank">
                <AiFillInstagram size={iconSize} />
              </SocialIconLink>
              <SocialIconLink href="https://www.youtube.com/channel/UCzt3kHgfLwGGPcTk6jP1_Cg" target="_blank">
                <AiFillYoutube size={iconSize} />
              </SocialIconLink>
            </Flex>
          </Flex>
        </NewsletterCopyrightAndSocials>

        <NavigationFlex justifyContent="flex-end" flex="1">
          <Flex direction="column" gap={'24px'} alignItems="stretch">
            <NextLink href="/kurzy">
              <Text color="primary" uppercase>kurzy</Text>
            </NextLink>
            <NextLink href="/clanky">
              <Text color="primary" uppercase>články</Text>
            </NextLink>
            <NextLink href="/o-projekte">
              <Text color="primary" uppercase>O projekte</Text>
            </NextLink>
            <NextLink href="/podcasty">
              <Text color="primary" uppercase>podcasty</Text>
            </NextLink>
            <NextLink href="/feedback">
              <Text color="primary" uppercase>feedback</Text>
            </NextLink>
          </Flex>
        </NavigationFlex>
      </WrapperFlex>
    </Background>
  )
}

const Background = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
`

const EmptyBox = styled.div`
  flex: 1;

  @media ${device.mobile} {
    display: none;
  }
`

const WrapperFlex = styled(Flex)`
  padding: 24px 32px;
  width: clamp(360px, 100%, 1200px);
  margin: 0 auto;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`

const LogoWithAddressFlex = styled(Flex)`
  @media ${device.mobile} {
    flex-direction: row;
    justify-content: center;
    gap: 32px;
    order: 2;
  }
`

const NewsletterCopyrightAndSocials = styled(Flex)`
  @media ${device.mobile} {
    align-self: center;
    order: 3;
  }
`

const NavigationFlex = styled(Flex)`
  @media ${device.mobile} {
    order: 1;
  }
`

const SocialIconLink = styled.a`
  color: ${(props) => props.theme.primaryColor};

  &:hover {
    color: ${(props) => props.theme.greyBackgroundColor};
  }
`

const LogoWrapper = styled.div`
  margin-left: -24px;
  position: relative;
  aspect-ratio: 3 / 1;
  height: 60px;
`

const LogoImage = styled(Image)`
  filter: invert(100%);
`

export default Footer
