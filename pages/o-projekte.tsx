import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {NextPage} from 'next'
import PageContentWrapper from '../components/PageContentWrapper'
import NavBar from '../components/NavBar'
import Heading from '../components/core/Heading'
import Flex from '../components/core/Flex'
import Text from '../components/core/Text'
import styled from 'styled-components'
import UserAvatar from '../components/domain/user/UserAvatar'
import {device} from '../theme/device'
import {spotifyUrl} from '../components/landing-page/podcasts'
import {youtubeUrl} from '../components/landing-page/videos'
import {discordInviteUrl} from '../components/landing-page/discord'

const Header = () => {
  return (
    <Head>
      <title>Street of Code</title>
      <meta name="description">Miesto, kde sa naučíš programovať</meta>
    </Head>
  )
}

// Images
// eslint-disable-next-line max-len
const JakubImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2020/03/00100lPORTRAIT_00100_BURST20190815135005128_COVER1.jpg'
const GabrielIamgeUrl =
  'http://streetofcode.sk/wp-content/uploads/2020/04/7520735.png'
const IvanImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/08/Ivan.jpg'
const FirstPodcastImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/08/prvy_podcast-scaled.jpg'
const ProjectMockupImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/08/leto-2020_EDITED.jpg'
const FirstDesignHome =
  'http://streetofcode.sk/wp-content/uploads/2022/08/Home.png'
const FirstDesignCourseDetail =
  'http://streetofcode.sk/wp-content/uploads/2022/08/Course-Detail.png'
const FirstDesignTakeCoursePage =
  'http://streetofcode.sk/wp-content/uploads/2022/08/Take-Course.png'

// Links
const UcimeSaOOP =
  'https://www.youtube.com/playlist?list=PL5Od02qMtU8iA1ypGekw_3Ry_YluVJD5I'
const PodcastKracko = 'https://www.youtube.com/watch?v=S2mtVgxNC_I'
const FirstVideoPodcast = 'https://www.youtube.com/watch?v=DrGCl0LoNIU'
const Informatika101 =
  'https://www.youtube.com/playlist?list=PL5Od02qMtU8j4Evu2H-eHSXuNSVlfrhcx'
const Patreon = 'https://www.patreon.com/streetofcode'

const ProjectPage: NextPage = () => {
  const renderLink = (text: string, src: string) => {
    return (
      <a href={src} target="blank">
        {text}
      </a>
    )
  }

  return (
    <>
      <Header />
      <NavBar />
      <StyledPagedContentWrapper>
        <Flex direction="column" gap="48px">
          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h2">
              Čo je to Street of Code?
            </AlignedHeading>
            <Text>
              Street of Code je miesto, kde sa môžeš vzdelávať o programovaní.
              Vytvárame programátorský podcast, videá a kurzy pre začínajúcich
              programátorov. Street of Code založili dvaja full-time
              programátori, ktorí sa rozhodli, že by chceli robiť okrem práce aj
              niečo navyše. Niečo, čo by potenciálne mohlo aj pomôcť iným ľudom.
            </Text>
          </Flex>

          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h3">Tím</AlignedHeading>
            <AvatarsFlexWrapper justifyContent="space-between" gap="32px">
              <Flex direction="column" gap="16px">
                <UserAvatar
                  sizePx={200}
                  imageUrl={JakubImageUrl}
                  name="Jakub Jahič"
                />
                <Text size="small">
                  <b>Jakub (29).</b> Spoluzakladeľ Street of Code. Baví ma
                  filozofovať o programovaní a o živote. Rád pomáham začínajúcim
                  programátorom a vytváram kurzy.
                </Text>
              </Flex>

              <Flex direction="column" gap="16px">
                <UserAvatar
                  sizePx={200}
                  imageUrl={GabrielIamgeUrl}
                  name="Gabriel Kerekeš"
                />
                <Text size="small">
                  <b>Gabriel (28).</b> Spoluzakladateľ Street of Code. Various
                  versions have evolved over the years, sometimes by accident,
                  sometimes on purpose (injected humour and the like).
                </Text>
              </Flex>

              <Flex direction="column" gap="16px">
                <UserAvatar
                  sizePx={200}
                  imageUrl={IvanImageUrl}
                  name="Ivan Hrabčák"
                />
                <Text size="small">
                  <b>Ivan (17).</b> Stážista v Street of Code. Various versions
                  have evolved over the years, sometimes by accident, sometimes
                  on purpose (injected humour and the like).
                </Text>
              </Flex>
            </AvatarsFlexWrapper>
          </Flex>

          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h3">
              Ako to celé začalo? (2018)
            </AlignedHeading>
            <Text>
              V roku 2018 sme doštudovali FEI-ku. Už počas školy sme sa cez
              prázdniny pokúšali viackrát vytvoriť nejaký projekt, mobilnú appku
              alebo niečo podobné, avšak na začiatku školského roka sme na to už
              buď nemali čas, alebo ten projekt sám o sebe ani vlastne nebol
              dostatočne zaujímavý.
            </Text>
            <Flex
              direction="column"
              alignSelf="center"
              alignItems="center"
              gap="8px"
            >
              <Image
                src={FirstPodcastImageUrl}
                width="512"
                height="316"
                alt="Prvý podcast"
              />
              <Text size="very-small">Natáčanie prvých podcastov (2018)</Text>
            </Flex>
            <Text>
              V lete 2018 však prišiel nápad vytvoriť podcast. V tom čase na
              Slovensko neboli žiadne programátorské podcasty. Celkovo podcasty
              neboli ešte také populárne. Mali sme za sebou vysokú školu a prvé
              roky praxe, o čom sa dalo veľa kecať, tak sme to skúšili. Ohlasy
              neboli veľké, ale nás to bavilo a stále sme rástli.
            </Text>
            <Text>
              Vtedy sme ešte netušili, či nám to vydrží a už duplom sme
              netušili, že budeme robiť aj niečo iné ako podcasty.
            </Text>
            <Text>
              Btw ak ti príde náš názov Street of Code divný, tak aj nad týmito
              názvami sme uvažovali:
            </Text>
            <OtherNamesGrid>
              <Text size="small">Objektovo orientovaný</Text>
              <Text size="small">Binárny podcast</Text>
              <Text size="small">Jednotky a Nulky</Text>
              <Text size="small">Ify a Elsy</Text>
              <Text size="small">Na binárnej vlne</Text>
              <Text size="small">Poctivý kód</Text>
              <Text size="small">Čisté kódy</Text>
              <Text size="small">Kód je život</Text>
              <Text size="small">Republika Kódu</Text>
              <Text size="small">Kódovinky</Text>
              <Text size="small">Bodkočiarka</Text>
              <Text size="small">Snívam v kódoch</Text>
              <Text size="small">Kódy z vody</Text>
              <Text size="small">Riadky kódu</Text>
              <Text size="small">Binárny svet</Text>
            </OtherNamesGrid>
          </Flex>

          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h3">
              Ako to prebiehalo? (2019-2022)
            </AlignedHeading>
            <Text>
              Podcasty sme nahrávali každé dva týždne. Dĺžka a kvalita (dúfajme)
              sa stále zvyšovala. Vytvorili sme si Wordpress stránku a
              uploadovali sme podcasty na {renderLink('Spotify', spotifyUrl)}.
              Neskôr sme si založili {renderLink('YouTube', youtubeUrl)} kanál,
              kam ktorého sme dávali podcasty.
            </Text>
            <Text>
              V prvom roku sme sa snažili písať aj články. Dokonca naše prvé
              články boli po anglicky, lebo sme ešte nevedeli, či ich chceme mať
              po anglicky alebo slovensky. Prvé programátorské videá (
              {renderLink('Učíme sa OOP - Kalkulačka', UcimeSaOOP)}) sme nahrali
              v júni 2019.
            </Text>
            <Text>
              Rok 2019 bol prvý pre nás, v ktorom sme obaja boli full-time
              zamestnaní, na čo si bolo treba zvyknúť.
            </Text>
            <AlignedHeading variant="h4">Prelomový rok 2020</AlignedHeading>
            <Text>V tomto roku sme mali niekoľko významných miľlníkov:</Text>
            <Text>
              <StyledUL>
                <li>
                  Prvý {renderLink('podcast', FirstVideoPodcast)}, v ktoré malo
                  video formát. Doteraz sme nahrávali iba audio.
                </li>
                <li>
                  Prvý {renderLink('podcast', PodcastKracko)} s hosťom (Jakub
                  Kracina, Štúdium v Brne vs. v Bratislave).
                </li>
                <li>
                  Prvý code retreat (Myjava), z čoho sa stala tradícia. Code
                  retreat je výlet, na ktorom programujeme a premýšľame o našich
                  víziach, cieľoch a zmysle života.
                </li>
                <li>
                  Nápad a vytvorenie projektu kurzová platforma (čo je vlastne
                  táto stránka). Páčila sa nám idea mať vlastnú stránku s našimi
                  kurzami. Brainstormovali sme, ako by to mohlo vyzerať, navrhli
                  sme databázu, zvolili sme technológie (React + Kotlin Spring
                  Boot) a vytvorili projekt.
                </li>
                <li>
                  Prvý kurz {renderLink('Informatika 101', Informatika101)} -
                  ktorý sme zavesili na YouTube.
                </li>
                <li>
                  Vytvorili sme si plán, ktorý chceme dosiahnuť. Na výsledok
                  (ale nie celý) sa práve pozeráš.
                </li>
                <li>
                  Viedli sme krúžok na strednej škole, kde sme učili Python (tu
                  sme spoznali Ivana).
                </li>
                <li>
                  Vytvorili sme {renderLink('Discord', discordInviteUrl)} kanál
                  a začali vytvárať komunitu.
                </li>
              </StyledUL>
            </Text>
            <Flex
              direction="column"
              alignSelf="center"
              alignItems="center"
              gap="8px"
            >
              <Image
                src={ProjectMockupImageUrl}
                width="348"
                height="495"
                alt="Návrh webstránky"
              />
              <Text size="very-small">Návrh kurzovej platformy (2020)</Text>
            </Flex>
            <Text>
              V roku 2021 a 2022 sme začali pravidelne pozývať rôznych hosťov do
              našich podcastov. Vždy bol náš cieľ, aby bol podcast poučný pre
              začínajúcich programátorov, a zároveň aj dostatočne zaujímavý pre
              tých skúsenejších. Taktiež sme experimentovali s novým typom
              obsahu, ako napr. streamy na YouTube či rôzne videá.
            </Text>
            <Text>
              Projekt kurzová platforma a samotné vytváranie kurzov bol oveľa
              väčší challenge, ako sme si spočiatku mysleli. Hoci sme urobili
              prvú verziu stránky rýchlo, uvedomili sme si, že nie je vôbec
              vizuálne príťažlivá a potrebujeme niečo lepšie. Na obrázkoch
              nižšie hneď uvidíš prečo.
            </Text>
            <Flex direction="column" alignSelf="center" gap="48px">
              <Flex
                direction="column"
                alignSelf="center"
                alignItems="center"
                gap="8px"
              >
                <BorderedImage
                  src={FirstDesignHome}
                  width="480"
                  height="270"
                  alt="Návrh webstránky"
                />
                <Text size="very-small">
                  Prvá nakódená verzia - úvodná stránka
                </Text>
              </Flex>
              <Flex
                direction="column"
                alignSelf="center"
                alignItems="center"
                gap="8px"
              >
                <BorderedImage
                  src={FirstDesignCourseDetail}
                  width="480"
                  height="322"
                  alt="Návrh webstránky"
                />
                <Text size="very-small">
                  Prvá nakódená verzia - detail kurzu
                </Text>
              </Flex>
              <Flex
                direction="column"
                alignSelf="center"
                alignItems="center"
                gap="8px"
              >
                <BorderedImage
                  src={FirstDesignTakeCoursePage}
                  width="480"
                  height="445"
                  alt="Návrh webstránky"
                />
                <Text size="very-small">
                  Prvá nakódená verzia - robenie kurzu
                </Text>
              </Flex>
            </Flex>
            <Text>
              Celý projekt sme zahodili a začali odznova. Učili sme sa dizajn a
              frontend. Spravili sme si dizajnový návrh stránky, ktorý sme aspoň
              10x prerobili. Iterovali sme, kým sme neboli spokojní.
            </Text>
            <Text>
              V roku 2021 prišli rôzne životné zmeny, ako napr. Jakubova svadba
              či Gabovo dieťa Kubko. Museli sme sa adaptovať a času bolo stále
              menej.
            </Text>
            <Text>
              V roku 2022 sme sa však poriadne hecli a dokončili túto webstránku
              a konečne spustili naše kurzy. Čaká nás ešte veľa roboty, ale
              stále nás to baví a napĺňa a veľmi sa tešíme.
            </Text>
          </Flex>

          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h3">
              Aké sú naše ciele? (2023 - )
            </AlignedHeading>
            <Text>
              Našich cieľov je stále viac a viac. Medzi ne môžeme zaradiť:
              <StyledUL>
                <li>Pravideľne pridávať nové kurzy.</li>
                <li>
                  Obohacovať túto stránku o nové funkcie. Eventuálne by sme
                  chceli, aby sa dalo na tejto stránke aj priamo programovať
                  (možno niečo podobné ako má{' '}
                  {renderLink('Scrimba', 'https://scrimba.com/')}).
                </li>
                <li>
                  Vytvoriť akúsi Roadmapu pre začínajúceho programátora. Návod,
                  ako začať programovať a ako následne pokračovať. Vyznačiť
                  rôzne možnosti, ktoré budú obsahovať zdroje, kde sa to dá
                  naučiť.
                </li>
                <li>
                  Zväčšovať komunitu, prepájať ľudí s podobnými cieľmi, aby si
                  navzájom pomáhali.
                </li>
                <li>Online workshopy</li>
                <li>
                  Robiť prednášky (či už na vysokých školách alebo
                  konferenciách)
                </li>
              </StyledUL>
            </Text>
          </Flex>

          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h3">
              Ako náš môžeš podporiť?
            </AlignedHeading>
            <Text>
              Podporiť nás môžeš na {renderLink('Patreone', Patreon)}. Budeme ti
              veľmi vďační.
            </Text>
          </Flex>

          <Flex direction="column" gap="16px" alignItems="flex-start">
            <AlignedHeading variant="h3">Spolupráca</AlignedHeading>
            <Text>
              Spoluprácu vítame. Napíš nám tvoj nápad a určite sa ozveme. Ak by
              si nám náhodou vedel alebo vedela pomôcť s dotáciami, tak by sme
              ti boli veľmi vďační. Máme vytvorené občianske združenie.
            </Text>
          </Flex>
        </Flex>
      </StyledPagedContentWrapper>
    </>
  )
}

const StyledPagedContentWrapper = styled(PageContentWrapper)`
  span {
    max-width: 750px;
  }
`

const OtherNamesGrid = styled.div`
  margin-top: 8px;
  align-self: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

const StyledUL = styled.ul`
  margin: 0;
  margin-left: 16px;
  padding: 0;

  li {
    margin: 6px;
    padding: 0;
  }
`

const BorderedImage = styled(Image)`
  border: ${(props) => `1px solid ${props.theme.secondaryColor}`} !important;
  border-radius: 12px;
`

const AlignedHeading = styled(Heading)`
  align-self: center;
`

const AvatarsFlexWrapper = styled(Flex)`
  @media ${device.mobile} {
    flex-direction: column;
  }
`

export default ProjectPage
