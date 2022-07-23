import React, {Component, ErrorInfo, ReactNode} from 'react'
import Flex from '../core/Flex'
import Heading from '../core/Heading'
import NextLink from '../core/NextLink'

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, handle-callback-err
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // maybe use some service
  }

  public render() {
    if (this.state.hasError) {
      return (<Flex direction="column" justifyContent="center" gap="48px">
        <Heading variant="h2">Nastala neočakávaná chyba</Heading>
        <NextLink href="/">
          <Heading variant="h3" withAccentUnderline>Prejsť na hlavnú stránku</Heading>
        </NextLink>
      </Flex>)
    }

    return this.props.children
  }
}

export default ErrorBoundary
