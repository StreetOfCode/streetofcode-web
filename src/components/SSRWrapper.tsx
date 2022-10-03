import React, {useEffect, useState} from 'react'

// Check if we're running on the server and render the
// corresponding component. This is useful so we can
// e.g. avoid rendering the Loading component when running
// on the server (SSR).
// https://nextjs.org/docs/messages/react-hydration-error
const SSRWrapper = ({
  ClientChildren,
  SSRChildren,
}: {
  ClientChildren: () => React.ReactElement
  SSRChildren: () => React.ReactElement
}) => {
  const [isSSR, setIsSSR] = useState(true)

  // useEffect is not executed on the server.
  useEffect(() => {
    setIsSSR(false)
  }, [])

  // isSSR is true on the server and false on the client.
  if (isSSR) {
    return <SSRChildren />
  } else {
    return <ClientChildren />
  }
}

export default SSRWrapper
