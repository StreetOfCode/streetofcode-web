import React, {HTMLAttributes} from 'react'
import styled from 'styled-components'


const PageContentWrapper = ({children}: HTMLAttributes<HTMLElement>) => {
  return (<Wrapper>
    {children}
  </Wrapper>)
}

const Wrapper = styled.div`
  flex: 1;
  align-self: center;
  padding-top: 100px;
  padding-bottom: 100px;
  max-width: 1200px;
  width: 100%;
`

export default PageContentWrapper
