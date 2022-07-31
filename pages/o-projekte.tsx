import React from 'react'
import Head from 'next/head'
import {NextPage} from 'next'
import PageContentWrapper from '../components/PageContentWrapper'
import NavBar from '../components/NavBar'
import Heading from '../components/core/Heading'

const Header = () => {
  return (
    <Head>
      <title>Stret of Code</title>
      <meta name="description">Miesto, kde sa naučíš programovať</meta>
    </Head>
  )
}

const ProjectPage: NextPage = () => {
  return (
    <>
      <Header />
      <NavBar />
      <PageContentWrapper>
        <Heading variant="h2">O projekte</Heading>
      </PageContentWrapper>
    </>
  )
}


export default ProjectPage
