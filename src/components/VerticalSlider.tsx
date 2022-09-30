import React, {HTMLAttributes} from 'react'
import styled, {keyframes} from 'styled-components'

type Props = {
  innerRef: React.MutableRefObject<null | HTMLDivElement>
} & HTMLAttributes<HTMLElement>

const VerticalSlider = ({innerRef}: Props) => {
  const handleVerticalSliderClick = () => {
    if (innerRef.current) {
      innerRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return <Slider ref={innerRef} onClick={handleVerticalSliderClick} />
}

const verticalSliderAnimation = keyframes({
  '0%': {top: 43},
  '50%': {top: 2},
  '100%': {top: 43},
})

const Slider = styled.div`
  align-self: center;
  position: relative;
  margin-top: 6em;
  width: 30px !important;
  height: 70px !important;
  border-radius: 22px;
  border: ${(props) => `4px solid ${props.theme.accentColor}`};

  :hover {
    cursor: pointer;
  }

  ::after {
    position: absolute;
    content: '';
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
export default VerticalSlider
