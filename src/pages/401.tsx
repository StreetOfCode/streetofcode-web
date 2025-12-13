import React from 'react'
import Head from '../components/Head'
import Button from '../components/core/Button'
import {useRouter} from 'next/router'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

export default function Custom401() {
  const router = useRouter()
  return (
    <>
      <Head
        title="401 – Unauthorized"
        description="Nemáš oprávnenie na zobrazenie tejto stránky."
        url="/401"
      />
      <Wrapper>
        <Title>401</Title>
        <Message>Nemáš oprávnenie na zobrazenie tejto stránky.</Message>
        <Button onClick={() => router.push('/')}>Prejsť na úvod</Button>
      </Wrapper>
    </>
  )
}
