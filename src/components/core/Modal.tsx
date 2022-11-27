import React, {HTMLAttributes, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {AiOutlineClose} from 'react-icons/ai'
import Flex from './Flex'
import {device} from '../../theme/device'
import {createPortal} from 'react-dom'

type Props = {
  className?: string
  onClose: () => void
} & HTMLAttributes<HTMLElement>

const Modal = ({className, children, onClose}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef])

  return createPortal(
    <Background>
      <ContentWrapper
        innerRef={modalRef}
        justifyContent="center"
        alignItems="center"
        className={className}
      >
        <CloseModalIcon onClick={onClose} />
        {children}
      </ContentWrapper>
    </Background>,
    document.body,
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.75);
`

const ContentWrapper = styled(Flex)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.secondaryColor};
  border: ${(props) => props.theme.accentColor} 2px solid;
  border-radius: 22px;
  padding: 24px;
  box-shadow: ${(props) => `1px 8px 20px ${props.theme.shadowColor}`};
  max-width: 600px;

  @media ${device.S} {
    width: 320px;
  }
`

const CloseModalIcon = styled(AiOutlineClose)`
  &:hover {
    cursor: pointer;
  }

  width: 18px;
  height: 18px;

  position: absolute;
  top: 10px;
  right: 10px;

  color: ${(props) => props.theme.primaryColor};
`

export default Modal
