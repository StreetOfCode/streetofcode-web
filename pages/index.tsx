import React, {useRef} from 'react'
import type {GetServerSideProps, NextPage} from 'next'
import styled, {keyframes} from 'styled-components'
import Flex from '../components/core/Flex'
import Text from '../components/core/Text'
import Heading from '../components/core/Heading'
import Button from '../components/core/Button'
import NavBar from '../components/NavBar'
import {useRouter} from 'next/router'
import {spotifyImageUrl, spotifyUrl} from '../components/landing-page/podcasts'
import {youtubeImageUrl, youtubeUrl} from '../components/landing-page/videos'
import VideosSlider from '../components/landing-page/VideosSlider'
import {discordImageUrl, discordInviteUrl} from '../components/landing-page/discord'
import TypingAnimation from '../theme/animations/TypingAnimation'
import CoursesSlider from '../components/landing-page/CoursesSlider'
import * as Api from '../api'
import {CourseOverview} from '../types'
import nookies from 'nookies'
interface Props {
  courses: CourseOverview[]
}

const Home: NextPage<Props> = ({courses}) => {
  const coursesRef = useRef<null | HTMLDivElement>(null)
  const router = useRouter()

  const handleCoursesButton = () => {
    router.push('/courses')
  }

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
        <Box paddingTop="0" paddingBottom="0">
          <NavBar />
        </Box>
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
              <Button variant="accent" size="very-large" onClick={handleCoursesButton}>online kurzy</Button>
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
            <CoursesSlider courses={courses} />
            <AllCoursesText
              color="accent"
              uppercase
              withAccentUnderline
              size="large"
              onClick={handleCoursesButton}
            >zobraziť všetky
            </AllCoursesText>
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
          {/* <PodcastsSlider /> */}
          <Flex justifyContent="center" gap="64px">
            <a href={spotifyUrl} target="blank">
              <SpotifyIcon src={spotifyImageUrl} alt="Street of Code podcast" loading="lazy" />
            </a>
            <a href={youtubeUrl} target="blank">
              <YoutubeIcon src={youtubeImageUrl} alt="Street of Code video" loading="lazy" />
            </a>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" gap="48px" alignItems="flex-start">
          <div>
            <Heading variant="h2">Keď ti popri tom všetkom raste ešte</Heading>
            <Heading variant="h2">zostane čas, tak si môžeš pozrieť naše</Heading>
            <Heading variant="h1" color="accent">videá</Heading>
          </div>
          <VideosSlider />
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
                pridaj sa!
              </DiscordButton>
            </a>
          </div>
          <DiscordImage src={discordImageUrl} alt="Street of Code Discord" loading="lazy" />
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" gap="32px">
          <div style={{alignSelf: 'flex-start'}}>
            <Heading variant="h2" inline>A kto sme vlastne</Heading>
            <Heading variant="h1" color="accent" inline> my?</Heading>
          </div>
          <Flex gap="32px" justifyContent="space-between" alignItems="flex-start">
            <UsImage src="http://streetofcode.sk/wp-content/uploads/2022/06/P1200649-scaled.jpg" alt="Street of Code" />
            <Heading variant="h3" normalWeight>
              Sme dvaja kamaráti, full-time programátori, ktorí sa rozhodli,
              že by chceli robiť okrem práce aj niečo navyše.
              Niečo, čo by potenciálne mohlo aj pomôcť iným ľudom.
              Preto sme sa rozhodli vytvoriť Street of Code.
            </Heading>
          </Flex>
        </Flex>
      </Box>
    </Wrapper>
  )
}

// // toto je pre jeden article
// export const getStaticProps = async (context) => {
//   const response = await Api.authFetch(Api.coursesOverviewUrl())

//   const courses = await response.json() as CourseOverview[]

//   return {
//     props: {
//       courses,
//     },
//   }
// }

// // tomuto povieme ze vsetky idecka ktore najdu v tom requeste tak nech to prebuildi na serveri a nachysta
// export const getStaticPaths = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')

//   const articles = await res.json()

//   const ids = articles.map((article) => article.id)
//   const paths = ids.map((id) => ({params: {id: id.toString()}}))

//   return {
//     paths,
//     fallback: false,
//   }
// }

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

const Box = styled.div<{paddingBottom?: string, paddingTop?: string}>`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding-top: ${(props) => props.paddingTop || '3em'};
  padding-bottom: ${(props) => props.paddingBottom || '3em'};

  margin-bottom: 75px;

  > * {
    margin-right: 2em;
    margin-left: 2em;
    width: clamp(920px, 100%, 1200px);
    align-self: center;
    flex-grow: 1;
  }
`

const HeroSection = styled(Flex)`
  padding-top: 1em;
  padding-bottom: 1em;
`

const AnimationWrapper = styled.div`
  max-width: 500px;
  padding-top: 24px;
  svg {
    overflow: visible;
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
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.accentColor};
    top: 43px;
    left: 3px;

    animation: ${verticalSliderAnimation} 2.5s linear infinite;
  }
`

const DiscordButton = styled(Button)`
  margin-top: 24px;
`

const DiscordImage = styled.img`
  max-height: 425px;
  border-radius: 22px;
  border: ${(props) => `4px solid ${props.theme.accentColor}`};
  transform: rotate(10deg);

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
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
  border: ${(props) => `4px solid ${props.theme.accentColor}`};
  transition: 250ms ease-in-out;

   &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
    box-shadow: 1px 8px 20px #D6D6D6;
  }
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  let token: string | null = null
  if (typeof window !== 'undefined') {
    token = nookies.get(context)?.token
  }
  const response = await Api.authFetch(Api.coursesOverviewUrl(), token)

  const courses = await response.json() as CourseOverview[]

  return {
    props: {courses}, // will be passed to the page component as props
  }
}

export default Home
