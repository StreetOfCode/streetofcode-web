import React from 'react'
import {toPng} from 'html-to-image'
import {NextPage} from 'next'
import PageContentWrapper from '../../components/PageContentWrapper'
import Flex from '../../components/core/Flex'
import Heading from '../../components/core/Heading'
import styled from 'styled-components'
import Image from 'next/image'

const posts = [
  {
    type: 'interview',
    title: 'Daria Hvizdálová',
    bottomText: 'School 42 – bezplatná škola programovania',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/09/Daria.png',
    ep: 86,
  },
  {
    type: 'interview',
    title: 'Radovan Debnár',
    bottomText: 'Príbeh Learn2Code, a prečo sa mení na Skillmea',
    imageUrl:
      'http://streetofcode.sk/wp-content/uploads/2022/09/radovanDebnar.png',
    ep: 85,
  },
  {
    type: 'interview',
    title: 'Slavomír Bača',
    bottomText: 'Ako môže samouk programátor zaujať firmu? (robime.it)',
    imageUrl:
      'http://streetofcode.sk/wp-content/uploads/2022/09/slavomirBaca.png',
    ep: 83,
  },
  {
    type: 'interview',
    title: 'Veronika Pizano',
    bottomText: 'Dievčatá a ženy v IT (Aj Ty v IT)',
    imageUrl:
      'http://streetofcode.sk/wp-content/uploads/2022/09/veronikaPizano.png',
    ep: 82,
  },
  {
    type: 'interview',
    title: 'Honza Javorek',
    bottomText: 'Najväčšie výzvy samoukov (junior.guru)',
    imageUrl:
      'http://streetofcode.sk/wp-content/uploads/2022/09/juniorGuru.png',
    ep: 91,
  },
  {
    type: 'interview',
    title: 'Matúš "Blejd" Koprda',
    bottomText: 'Aké je to byť frontend freelancer?',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/09/blejd.png',
    ep: 87,
  },
]

type Post = typeof posts[0]

const microphoneUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/09/mikrofon-purple.png'

const downloadPost = async (post: Post, index: number) => {
  const element = document.getElementById(`post-${index}`)
  if (!element) {
    console.log('element not found')
    return
  }

  const data = await toPng(element)
  const link = document.createElement('a')

  link.href = data
  link.download = `ep${post.ep}-landing.png`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const downloadAllPosts = (posts: Post[]) => {
  posts.forEach(async (post, index) => {
    await downloadPost(post, index)
  })
}

const InstagramPage: NextPage = () => {
  return (
    <>
      <PageContentWrapper>
        <button onClick={() => downloadAllPosts(posts)}>Download all</button>
        <WrapperFlex direction="row" gap="10px" justifyContent="center">
          {posts.map((post, i) => {
            return (
              <div key={i}>
                <div id={`post-${i}`}>
                  <PostFlex direction="column" gap="20px">
                    <TopTextFlex direction="column">
                      {post.type === 'interview' && (
                        <WhiteHeading variant="h5" normalWeight align="center">
                          Rozhovor
                        </WhiteHeading>
                      )}
                      <TitleFlex justifyContent="center">
                        <WhiteHeading variant="h3" align="center">
                          {post.title}
                        </WhiteHeading>
                      </TitleFlex>
                    </TopTextFlex>
                    <PostImageFlex justifyContent="center">
                      <PostImage
                        src={post.imageUrl}
                        layout="fill"
                        objectFit="contain"
                      />
                    </PostImageFlex>
                    <NameFlex justifyContent="center">
                      <Heading variant="h5" normalWeight align="center">
                        {post.bottomText}
                      </Heading>
                    </NameFlex>
                    <Pictogram>
                      <Image src={microphoneUrl} width={40} height={70} />
                    </Pictogram>
                  </PostFlex>
                </div>
                <button onClick={() => downloadPost(post, i)}>
                  Export as PNG
                </button>
              </div>
            )
          })}
        </WrapperFlex>
      </PageContentWrapper>
    </>
  )
}

export default InstagramPage

const WrapperFlex = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const PostFlex = styled(Flex)`
  position: relative;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(126, 80, 230, 1) 70%
  );

  padding: 10px;
  width: 563px;
  height: 563px;
`

const TopTextFlex = styled(Flex)`
  width: 100%;
`

const PostImageFlex = styled(Flex)`
  position: relative;
  width: 420px;
  height: 320px;
`

const PostImage = styled(Image)`
  border-radius: 20px;
`

const WhiteHeading = styled(Heading)`
  color: white;
`

const TitleFlex = styled(Flex)`
  padding-top: 5px;
  padding-bottom: 5px;
  width: 80%;
  border: 2px solid white;
  border-radius: 5px;
`

const NameFlex = styled(Flex)`
  width: 80%;
`

const Pictogram = styled('div')`
  position: absolute;
  left: 10px;
  bottom: 5px;
`
