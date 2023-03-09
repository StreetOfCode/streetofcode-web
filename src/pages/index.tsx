import React, {useRef} from 'react'
import {NextPage} from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import Flex from '../components/core/Flex'
import Text from '../components/core/Text'
import Heading from '../components/core/Heading'
import Button from '../components/core/Button'
import NavBar from '../components/NavBar'
import {spotifyImageUrl, spotifyUrl} from '../components/landing-page/podcasts'
import {
  youtubeLightImageUrl,
  youtubeDarkImageUrl,
  youtubeUrl,
} from '../components/landing-page/videos'
import VideosSlider from '../components/landing-page/VideosSlider'
import {
  discordImageUrl,
  discordInviteUrl,
} from '../components/landing-page/discord'
import {CoursesSliderWrapper} from '../components/landing-page/CoursesSlider'
import * as Api from '../api'
import {CourseOverview} from '../types'
import PodcastsSlider from '../components/landing-page/PodcastsSlider'
import NextLink from '../components/core/NextLink'
import {device} from '../theme/device'
import VerticalSlider from '../components/VerticalSlider'
import {useTheme} from '../hooks/useTheme'
import HeroAnimation from '../theme/animations/HeroAnimation'
import {Post} from '../wp/types'
import {getAllPosts} from '../wp/api'
import {
  CATEGORY_NAME as PODCAST_CATEGORY_NAME,
  COUNT_IN_SLIDER as PODCAST_COUNT_IN_SLIDER,
} from '../components/domain/post/podcast/podcast-constants'
import {usImage} from '../images'
import Head from '../components/Head'
import {routes} from '../routes'
import CourseReviewItem from '../components/domain/course-review/CourseReviewItem'
import {
  informatika101Link,
  pavolReview,
  springBootKotlinLink,
  theodorReview,
} from '../testimonials'
import {HiOutlineArrowNarrowRight, HiSparkles} from 'react-icons/hi'

interface Props {
  courses: CourseOverview[]
  podcasts: Post[]
}

const Home: NextPage<Props> = ({courses, podcasts}) => {
  const {theme} = useTheme()
  const coursesRef = useRef<null | HTMLDivElement>(null)

  const youtubeImageUrl =
    theme.type === 'LIGHT' ? youtubeDarkImageUrl : youtubeLightImageUrl

  return (
    <>
      <Head
        title="Street of Code"
        description="Nauč sa s nami programovať!"
        url={routes.host}
      />
      <Wrapper>
        <GradientWrapper>
          <NavBar />
          <Box>
            <HeroSection gap="32px" justifyContent="space-between">
              <HeroSectionTextFles
                direction="column"
                gap="48px"
                alignItems="flex-start"
                alignSelf="stretch"
              >
                <div>
                  <Heading variant="h1" noWrap>
                    Naučíme ťa
                  </Heading>
                  <Heading variant="h1" color="accent">
                    programovať
                  </Heading>
                </div>
                <NextLink href={routes.kurzy.index}>
                  <HeroActionButton
                    variant="accent"
                    size="very-large"
                    uppercase
                    bold
                  >
                    online kurzy
                  </HeroActionButton>
                </NextLink>
              </HeroSectionTextFles>
              <AnimationWrapper>
                <HeroAnimation />
              </AnimationWrapper>
            </HeroSection>
            <VerticalSlider innerRef={coursesRef} />
          </Box>
          <Box ref={coursesRef}>
            <Flex direction="column" gap="24px" alignItems="flex-start">
              <div>
                <Heading inline variant="h3">
                  Pozri si naše
                </Heading>
                <Heading inline variant="h3" color="accent">
                  {' '}
                  kurzy
                </Heading>
              </div>
              <CoursesSliderWrapper courses={courses} />
              <NextLink href={routes.kurzy.index} alignSelf="center">
                <AllCoursesText
                  color="accent"
                  uppercase
                  align="center"
                  withAccentUnderline
                  size="large"
                >
                  zobraziť všetky
                </AllCoursesText>
              </NextLink>
            </Flex>
          </Box>
        </GradientWrapper>
        <Box>
          <Flex direction="column" gap="48px" alignItems="flex-start">
            <div>
              <Heading inline variant="h3">
                Na našich kurzoch si dávame {}
              </Heading>
              <Flex gap="8px" style={{display: 'inline-block'}}>
                <Heading inline variant="h3" color="accent">
                  extra
                </Heading>
                <SparksIcon />
              </Flex>
              <Heading inline variant="h3">
                {' '}
                záležať
              </Heading>
            </div>
            <TestimonialsFlexWrapper
              gap="32px"
              alignItems="flex-start"
              justifyContent="flex-end"
            >
              <Flex direction="column" gap="16px">
                <Testimonial review={pavolReview} courseSlug={''} />
                <Flex gap="8px" alignSelf="flex-start">
                  <TestimonialArrowIcon />
                  {informatika101Link}
                </Flex>
              </Flex>
              <Flex direction="column" gap="16px">
                <Testimonial review={theodorReview} courseSlug={''} />
                <Flex gap="8px" alignSelf="flex-start">
                  <TestimonialArrowIcon />
                  {springBootKotlinLink}
                </Flex>
              </Flex>
            </TestimonialsFlexWrapper>
          </Flex>
        </Box>
        <Box>
          <Flex direction="column" gap="48px" alignItems="flex-start">
            <div>
              <Heading inline variant="h3">
                Po ceste do školy, do práce alebo pri upratovaní si môžeš pustiť
                náš
              </Heading>
              <Heading inline variant="h3" color="accent">
                {' '}
                podcast
              </Heading>
            </div>
            <PodcastsSlider podcasts={podcasts} />
            <PodcastSocialsFlex
              justifyContent="center"
              gap="64px"
              alignSelf="center"
            >
              <ProviderLink href={spotifyUrl} target="blank">
                <Image
                  src={spotifyImageUrl}
                  alt="Street of Code podcast"
                  width="280"
                  height="63"
                  priority
                />
              </ProviderLink>
              <ProviderLink href={youtubeUrl} target="blank">
                <Image
                  src={youtubeImageUrl}
                  alt="Street of Code video"
                  width="280"
                  height="63"
                  priority
                />
              </ProviderLink>
            </PodcastSocialsFlex>
          </Flex>
        </Box>
        <Box>
          <Flex direction="column" gap="48px" alignItems="flex-start">
            <div>
              <Heading inline variant="h3">
                Keď ti popri tom všetkom raste ešte zostane čas, tak si môžeš
                pozrieť naše
              </Heading>
              <Heading inline variant="h3" color="accent">
                {' '}
                videá
              </Heading>
            </div>
            <VideosSlider />
            <ProviderLink
              href={youtubeUrl}
              target="blank"
              style={{alignSelf: 'center'}}
            >
              <Image
                src={youtubeImageUrl}
                alt="Street of Code video"
                width="280"
                height="63"
                priority
              />
            </ProviderLink>
          </Flex>
        </Box>
        <Box>
          <Flex justifyContent="space-between" gap="32px">
            <div>
              <Heading variant="h3" inline>
                Ak sa na niečom zasekneš, alebo budeš potrebovať pomoc, tak ju
                možno nájdeš na našom
              </Heading>
              <Heading variant="h3" color="accent" inline>
                {' '}
                Discorde
              </Heading>
              <div>
                <a href={discordInviteUrl} target="blank">
                  <DiscordButton variant="accent" size="large">
                    Pridaj sa!
                  </DiscordButton>
                </a>
              </div>
            </div>
            <DiscordImage>
              <StyledImage
                src={discordImageUrl}
                alt="Street of Code Discord"
                layout="fill"
                priority
              />
            </DiscordImage>
          </Flex>
        </Box>
        <Box>
          <Flex direction="column" gap="32px" alignItems="flex-start">
            <div>
              <Heading variant="h3" inline>
                A kto sme vlastne
              </Heading>
              <Heading variant="h3" color="accent" inline>
                {' '}
                my?
              </Heading>
            </div>
            <AboutUsContentWrapper
              gap="32px"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <UsImage>
                <StyledImage
                  src={usImage}
                  alt="Street of Code"
                  layout="fill"
                  priority
                />
              </UsImage>
              <Heading variant="h5" normalWeight>
                Sme dvaja kamaráti, full-time programátori, ktorí sa rozhodli,
                že by chceli robiť okrem práce aj niečo navyše. Niečo, čo by
                potenciálne mohlo aj pomôcť iným ľudom. Preto sme sa rozhodli
                vytvoriť Street of Code.
              </Heading>
            </AboutUsContentWrapper>
          </Flex>
        </Box>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
`

const GradientWrapper = styled.div`
  background: linear-gradient(
    150deg,
    var(--color-accent),
    var(--color-primary) 35%
  );
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

  padding: 24px 48px;
  margin-bottom: 64px;

  > * {
    margin-right: 2em;
    margin-left: 2em;
    width: clamp(320px, 100%, 1200px);
    align-self: center;
    flex-grow: 1;

    @media ${device.L} {
      max-width: 900px;
    }
  }

  @media ${device.S} {
    margin-bottom: 16px;
  }
`

const HeroSectionTextFles = styled(Flex)`
  @media ${device.S} {
    gap: 32px;
  }
`

const ProviderLink = styled('a')`
  @media ${device.M} {
    width: 180px;
  }

  &:hover {
    opacity: 0.75;
  }
`

const PodcastSocialsFlex = styled(Flex)`
  @media ${device.M} {
    gap: 32px;
  }

  @media ${device.S} {
    flex-direction: column;
  }
`

const HeroSection = styled(Flex)`
  padding-top: 36px;
  padding-bottom: 12px;

  @media ${device.S} {
    padding-top: 0;
    padding-bottom: 0;
  }
`

const AnimationWrapper = styled.div`
  width: 100%;
  min-width: 150px;
  margin-top: -100px;
  svg {
    overflow: visible;
  }

  @media (max-width: 829px) {
    display: none;
  }

  @media ${device.XL} {
    max-width: 400px;
  }

  @media ${device.L} {
    max-width: 300px;
  }

  @media ${device.M} {
    max-width: 250px;
  }
`

const DiscordButton = styled(Button)`
  margin-top: 24px;
`

const DiscordImage = styled.div`
  flex-shrink: 0;

  width: 200px;
  aspect-ratio: 0.55;

  transform: rotate(10deg);
  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    transition: 250ms ease-in-out;
  }

  @media ${device.L} {
    width: 180px;
  }

  @media ${device.M} {
    width: 160px;
  }

  @media ${device.S} {
    display: none;
  }
`

const UsImage = styled.div`
  position: relative;
  flex-shrink: 0;

  width: 400px;
  aspect-ratio: 4 / 3;

  transition: 250ms ease-in-out;

  &:hover {
    transform: scale(1.1);
    transition: 250ms ease-in-out;
  }

  @media ${device.M} {
    width: 300px;
  }

  @media ${device.S} {
    &:hover {
      transform: unset;
      transition: unset;
      box-shadow: unset;
    }
  }
`

const StyledImage = styled(Image)`
  border-radius: 22px;
  border: 2px solid var(--color-accent) !important;
`

const AboutUsContentWrapper = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
  }
`

const HeroActionButton = styled(Button)`
  @media ${device.M} {
    font-size: 20px;
  }

  @media ${device.XS} {
    font-size: 16px;
  }
`

const TestimonialsFlexWrapper = styled(Flex)`
  @media ${device.M} {
    flex-direction: column;
    align-self: center;
  }
`

const Testimonial = styled(CourseReviewItem)`
  min-width: 300px;
  max-width: 450px;
`

const TestimonialArrowIcon = styled(HiOutlineArrowNarrowRight)`
  width: 24px;
  height: 24px;
  margin-left: 72px;
`

const SparksIcon = styled(HiSparkles)`
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
  margin-left: 4px;
  margin-bottom: 16px;
  margin-right: -4px;
  color: var(--color-accent);

  @media ${device.S} {
    width: 20px;
    height: 20px;
  }
`

export const getStaticProps = async () => {
  const response = await Api.noAuthFetch(Api.coursesOverviewUrl())

  const courses = (response.ok ? await response.json() : []) as CourseOverview[]

  const podcasts = await getAllPosts(
    PODCAST_CATEGORY_NAME,
    PODCAST_COUNT_IN_SLIDER,
  )

  return {
    props: {courses, podcasts},
  }
}

export default Home
