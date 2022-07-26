import {useRouter} from 'next/router'
import React from 'react'
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
import Flex from './core/Flex'
import NextLink from './core/NextLink'
import Text from './core/Text'

const Footer = () => {
  const router = useRouter()
  const iconSize = 32

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <Background>
      <WrapperFlex justifyContent="space-between">
        <Flex direction="column" alignSelf="stretch" justifyContent="space-between" alignItems="flex-start" flex="1">
          <Logo alt="Logo" src="/soc_logo.png" onClick={() => router.push('/')} />
          <div>
            <Text color="primary" size="small">Street of Code o.z.</Text>
            <Text color="primary" size="small">Hlaváčiková 29</Text>
            <Text color="primary" size="small">84105, Bratislava</Text>
          </div>
        </Flex>
        <Flex direction="column" alignSelf="flex-end" gap="24px">
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
        <Flex justifyContent="flex-end" flex="1">
          <Flex direction="column" gap={'24px'} alignItems="stretch">
            <NextLink href="/kurzy">
              <Text color="primary" uppercase>kurzy</Text>
            </NextLink>
            <NextLink href="#">
              <Text color="primary" uppercase>články</Text>
            </NextLink>
            <NextLink href="/o-projekte">
              <Text color="primary" uppercase>O projekte</Text>
            </NextLink>
            <NextLink href="#">
              <Text color="primary" uppercase>videá</Text>
            </NextLink>
            <NextLink href="#">
              <Text color="primary" uppercase>podcasty</Text>
            </NextLink>
            <NextLink href="/feedback">
              <Text color="primary" uppercase>feedback</Text>
            </NextLink>
          </Flex>
        </Flex>
      </WrapperFlex>
    </Background>
  )
}

const Background = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
`

const WrapperFlex = styled(Flex)`
  padding: 2.5em 0;
  width: clamp(920px, 100%, 1200px);
  margin: 0 auto;
`


const SocialIconLink = styled.a`
  color: ${(props) => props.theme.primaryColor};

  &:hover {
    color: ${(props) => props.theme.greyBackgroundColor};
  }
`

const Logo = styled.img`
  height: 60px;
  margin-left: -1em;
  filter: invert(100%);
`

export default Footer
