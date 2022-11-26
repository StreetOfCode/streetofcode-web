import React from 'react'
import styled from 'styled-components'
import Flex from '../../core/Flex'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import {BsPlayFill} from 'react-icons/bs'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import {useRouter} from 'next/router'

type Props = {
  lectureUrl: string
  lectureTitle: string
  onClosed: () => void
  hasQuiz: boolean
}

const NextLectureOverlay = ({
  lectureUrl,
  lectureTitle,
  onClosed,
  hasQuiz,
}: Props) => {
  const router = useRouter()

  const nextLecturePush = () => {
    router.push(lectureUrl)
  }

  if (hasQuiz) {
    return (
      <WrapperFlex justifyContent="center" gap="12px" direction="column">
        <Heading variant="h5">Nezabudni si spraviť kvíz</Heading>
        <CloseText size="very-small" onClick={onClosed}>
          Zavrieť
        </CloseText>
      </WrapperFlex>
    )
  }

  return (
    <WrapperFlex justifyContent="center" gap="12px" direction="column">
      <Text size="small">Ďalšia lekcia</Text>
      <Heading variant="h5">{lectureTitle}</Heading>
      <CountdownWrapper onClick={nextLecturePush}>
        <CountdownCircleTimer
          isPlaying
          duration={3}
          colors={'#FFFFFF'}
          size={72}
          onComplete={nextLecturePush}
          strokeWidth={5}
        >
          {() => <BsPlayFill size={24} />}
        </CountdownCircleTimer>
      </CountdownWrapper>
      <CloseText size="very-small" onClick={onClosed}>
        Zavrieť
      </CloseText>
    </WrapperFlex>
  )
}

// we don't want this to change colors based on current theme
const WrapperFlex = styled(Flex)`
  background-color: black;
  opacity: 0.9;
  width: 100%;
  max-width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  > * {
    color: white;
  }
`

const CountdownWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const CloseText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`

export default NextLectureOverlay
