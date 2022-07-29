import React, {useRef} from 'react'
import type {NextPage} from 'next'
import styled, {keyframes} from 'styled-components'
import Flex from '../components/core/Flex'
import Text from '../components/core/Text'
import Heading from '../components/core/Heading'
import Button from '../components/core/Button'
import NavBar from '../components/NavBar'
import {spotifyImageUrl, spotifyUrl} from '../components/landing-page/podcasts'
import {youtubeImageUrl, youtubeUrl} from '../components/landing-page/videos'
import VideosSlider from '../components/landing-page/VideosSlider'
import {discordImageUrl, discordInviteUrl} from '../components/landing-page/discord'
import TypingAnimation from '../theme/animations/TypingAnimation'
import {CoursesSliderWrapper} from '../components/landing-page/CoursesSlider'
import * as Api from '../api'
import {CourseOverview} from '../types'
import PodcastsSlider from '../components/landing-page/PodcastsSlider'
import NextLink from '../components/core/NextLink'
import {device} from '../theme/device'

interface Props {
  courses: CourseOverview[]
}

const Home: NextPage<Props> = ({courses}) => {
  const coursesRef = useRef<null | HTMLDivElement>(null)

  const handleVerticalSliderClick = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <Wrapper>
      <GradientWrapper>
        <NavBar />
        <Box>
          <HeroSection gap="16px" justifyContent="space-between">
            <Flex direction="column" gap="48px" alignItems="flex-start" alignSelf="stretch">
              <div>
                <Heading variant="title" noWrap>Nauč sa s nami</Heading>
                <Heading variant="title" color="accent">programovať</Heading>
              </div>
              <div>
                <Heading variant="h3">Pomôžeme ti na tvojej ceste začínajúceho</Heading>
                <Heading variant="h3">programátora či začínajúcej programátorky</Heading>
              </div>
              <NextLink href={'/kurzy'}>
                <Button variant="accent" size="very-large" uppercase bold>online kurzy</Button>
              </NextLink>
            </Flex>
            <AnimationWrapper>
              <TypingAnimation />
            </AnimationWrapper>
          </HeroSection>
          <VerticalSlider onClick={handleVerticalSliderClick} />
        </Box>
        <Box ref={coursesRef}>
          <Flex direction="column" gap="48px" alignItems="flex-start">
            <div>
              <Heading variant="h2">Pozri si naše</Heading>
              <Heading variant="h1" color="accent">kurzy</Heading>
            </div>
            <CoursesSlider showCoursesCount={3} courses={courses} />
            <MobileCoursesSlider showCoursesCount={1} courses={courses} />
            <NextLink href={'/kurzy'} alignSelf="center">
              <AllCoursesText
                color="accent"
                uppercase
                align="center"
                withAccentUnderline
                size="large"
              >zobraziť všetky
              </AllCoursesText>
            </NextLink>
          </Flex>
        </Box>
      </GradientWrapper>
      <Box>
        <Flex direction="column" gap="48px" alignItems="flex-start">
          <div>
            <Heading variant="h2">Po ceste do školy, do práce alebo</Heading>
            <Heading variant="h2">pri upratovaní si môžeš pustiť náš</Heading>
            <Heading variant="h1" color="accent">podcast</Heading>
          </div>
          <PodcastSliderStyled showPodcastsCount={3} />
          <MobilePodcastSlider showPodcastsCount={1} />
          <PodcastSocialsFlex justifyContent="center" gap="64px" alignSelf="center">
            <a href={spotifyUrl} target="blank">
              <SpotifyIcon src={spotifyImageUrl} alt="Street of Code podcast" loading="lazy" />
            </a>
            <a href={youtubeUrl} target="blank">
              <YoutubeIcon src={youtubeImageUrl} alt="Street of Code video" loading="lazy" />
            </a>
          </PodcastSocialsFlex>
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" gap="48px" alignItems="flex-start">
          <div>
            <Heading variant="h2">Keď ti popri tom všetkom raste ešte</Heading>
            <Heading variant="h2">zostane čas, tak si môžeš pozrieť naše</Heading>
            <Heading variant="h1" color="accent">videá</Heading>
          </div>
          <VideosSliderStyled showVideosCount={2} />
          <MobileVideosSlider showVideosCount={1} />
          <a href={youtubeUrl} target="blank" style={{alignSelf: 'center'}}>
            <YoutubeIcon src={youtubeImageUrl} alt="Street of Code video" loading="lazy" />
          </a>
        </Flex>
      </Box>
      <Box>
        <Flex justifyContent="space-between" gap="32px">
          <div>
            <Heading variant="h2">Ak sa na niečom zasekneš</Heading>
            <Heading variant="h2">alebo budeš potrebovať pomoc,</Heading>
            <Heading variant="h2">tak ju možno nájdeš na našom</Heading>
            <Heading variant="h1" color="accent">Discorde</Heading>
            <a href={discordInviteUrl} target="blank">
              <DiscordButton variant="accent" size="large">
                Pridaj sa!
              </DiscordButton>
            </a>
          </div>
          <DiscordImage src={discordImageUrl} alt="Street of Code Discord" loading="lazy" />
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" gap="32px" alignItems="flex-start">
          <div>
            <Heading variant="h2" inline>A kto sme vlastne</Heading>
            <Heading variant="h1" color="accent" inline> my?</Heading>
          </div>
          <AboutUsContentWrapper gap="32px" justifyContent="space-between" alignItems="flex-start">
            <UsImage src="http://streetofcode.sk/wp-content/uploads/2022/06/P1200649-scaled.jpg" alt="Street of Code" />
            <Heading variant="h3" normalWeight>
              Sme dvaja kamaráti, full-time programátori, ktorí sa rozhodli,
              že by chceli robiť okrem práce aj niečo navyše.
              Niečo, čo by potenciálne mohlo aj pomôcť iným ľudom.
              Preto sme sa rozhodli vytvoriť Street of Code.
            </Heading>
          </AboutUsContentWrapper>
        </Flex>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
`

const GradientWrapper = styled.div`
  background: ${(props) => `linear-gradient(150deg, ${props.theme.accentColor}, white 35%)`};
  margin-bottom: 2em;
`

const AllCoursesText = styled(Text)`
  align-self: center;
  &:hover {
    cursor: pointer;
  }
`

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 24px 32px;
  margin-bottom: 64px;

  > * {
    margin-right: 2em;
    margin-left: 2em;
    width: clamp(360px, 100%, 1200px);
    align-self: center;
    flex-grow: 1;
  }

  @media ${device.mobile} {
    margin-bottom: 16px;
  }
`

const CoursesSlider = styled(CoursesSliderWrapper)`
  @media ${device.tablet} {
    display: none;
  }
`

const MobileCoursesSlider = styled(CoursesSliderWrapper)`
  display: none;

  @media ${device.tablet} {
    display: flex;;
  }
`

const PodcastSliderStyled = styled(PodcastsSlider)`
  @media ${device.tablet} {
    display: none;
  }
`

const MobilePodcastSlider = styled(PodcastsSlider)`
  display: none;

  @media ${device.tablet} {
    display: flex;;
  }
`

const VideosSliderStyled = styled(VideosSlider)`
  @media ${device.tablet} {
    display: none;
  }
`

const MobileVideosSlider = styled(VideosSlider)`
  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`

const PodcastSocialsFlex = styled(Flex)`
  @media ${device.tablet} {
    flex-direction: column;
    gap: 32px;
  }
`


const HeroSection = styled(Flex)`
  padding-top: 3em;
  padding-bottom: 1em;
`

const AnimationWrapper = styled.div`
  max-width: 500px;
  padding-top: 24px;
  svg {
    overflow: visible;
  }

  @media ${device.mobile} {
    display: none;
  }
`

const verticalSliderAnimation = keyframes({
  '0%': {top: 43},
  '50%': {top: 2},
  '100%': {top: 43},
})

const VerticalSlider = styled.div`
  position: relative;
  margin-top: 6em;
  width: 30px;
  height: 70px;
  border-radius: 22px;
  border: ${(props) => `4px solid ${props.theme.accentColor}`};

  :hover {
    cursor: pointer;
  }

  ::after {
    position: absolute;
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.accentColor};
    top: 43px;
    left: 2px;

    animation: ${verticalSliderAnimation} 2.5s linear infinite;
  }
`

const DiscordButton = styled(Button)`
  margin-top: 24px;
`

const DiscordImage = styled.img`
  max-height: 425px;
  border-radius: 22px;
  border: ${(props) => `2px solid ${props.theme.accentColor}`};
  transform: rotate(10deg);

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
  }

  @media ${device.tablet} {
    max-height: 300px;
  }

  @media ${device.mobile} {
    display: none;
  }
`

const SpotifyIcon = styled.img`
  max-width: 320px;
`

const YoutubeIcon = styled.img`
  max-width: 320px;
`

const UsImage = styled.img`
  max-height: 425px;
  border-radius: 22px;
  border: ${(props) => `2px solid ${props.theme.accentColor}`};
  transition: 250ms ease-in-out;

   &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
  }

  @media ${device.tablet} {
    max-height: 250px;
  }

  @media ${device.mobile} {
    border: ${(props) => `2px solid ${props.theme.accentColor}`};
    &:hover {
      transform: unset;
      transition: unset;
      box-shadow: unset;
    }
  }
`

const AboutUsContentWrapper = styled(Flex)`
  @media ${device.tablet} {
    flex-direction: column;
  }
`

export const getStaticProps = async () => {
  const response = await Api.noAuthFetch(Api.coursesOverviewUrl())

  const courses = await response.json() as CourseOverview[]

  return {
    props: {courses}, // will be passed to the page component as props
  }
}

export default Home
