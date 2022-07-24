import React from 'react'
import {NextPage} from 'next'
import PageContentWrapper from '../components/PageContentWrapper'
import NavBar from '../components/NavBar'
import Heading from '../components/core/Heading'

const ProjectPage: NextPage = () => {
  return (
    <>
      <NavBar />
      <PageContentWrapper>
        <Heading variant="h2">O projekte</Heading>
      </PageContentWrapper>
    </>
  )
}

export default ProjectPage
