import React from 'react'
import {PrismLight as _SyntaxHighlighter} from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import kotlin from 'react-syntax-highlighter/dist/cjs/languages/prism/kotlin'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import {vs, vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {useTheme} from '../hooks/useTheme'

// all languages we want to syntax highlight need to be imported and registered
// https://github.com/react-syntax-highlighter/react-syntax-highlighter#light-build
_SyntaxHighlighter.registerLanguage('javascript', javascript)
_SyntaxHighlighter.registerLanguage('kotlin', kotlin)
_SyntaxHighlighter.registerLanguage('python', python)

export type SyntaxHighlighterProps = {
  children: string | string[]
  language: string
  customStyle?: React.CSSProperties
}

const SyntaxHighlighter = ({
  children,
  language,
  customStyle,
}: SyntaxHighlighterProps) => {
  const {isLightTheme} = useTheme()
  return (
    <_SyntaxHighlighter
      language={language}
      style={isLightTheme ? vs : vscDarkPlus}
      wrapLines
      wrapLongLines
      customStyle={customStyle}
    >
      {children}
    </_SyntaxHighlighter>
  )
}

export default SyntaxHighlighter
