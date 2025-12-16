import React, {useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {device} from '../../../theme/device'

const codeLines = [
  '// vytvor funkciu na scitanie',
  'function sum(a: number, b: number) {',
  '  return a + b;',
  '}',
]

const AnimatedCodeEditor: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([
    codeLines[0],
    '',
    '',
    '',
  ])
  const [currentLine, setCurrentLine] = useState(1)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      // Reset after completion
      const timer = setTimeout(() => {
        setDisplayedLines([codeLines[0], '', '', ''])
        setCurrentLine(1)
        setCurrentChar(0)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const targetLine = codeLines[currentLine]
    if (currentChar <= targetLine.length) {
      const timer = setTimeout(
        () => {
          const newLines = [...codeLines]
          newLines[currentLine] = targetLine.substring(0, currentChar)
          setDisplayedLines(newLines)
          setCurrentChar((c) => c + 1)
        },
        currentChar === 0 ? 200 : 50,
      )
      return () => clearTimeout(timer)
    }

    setCurrentLine((l) => l + 1)
    setCurrentChar(0)
    return undefined
  }, [currentLine, currentChar])

  const renderLine = (line: string, index: number) => {
    const targetLine = codeLines[index]
    const isTyping = currentLine === index && currentChar <= targetLine.length

    if (index === 0) {
      return <Comment>{line}</Comment>
    }

    if (index === 1) {
      if (!line) return <Cursor show={currentLine === 1} />
      return (
        <>
          <Keyword>function</Keyword> <FunctionName>sum</FunctionName>
          <Punctuation>(</Punctuation>
          <Variable>a</Variable>
          <Punctuation>: </Punctuation>
          <Type>number</Type>
          <Punctuation>, </Punctuation>
          <Variable>b</Variable>
          <Punctuation>: </Punctuation>
          <Type>number</Type>
          <Punctuation>) {'{'}</Punctuation>
          {isTyping && <Cursor show />}
        </>
      )
    }

    if (index === 2) {
      if (!line) return null
      return (
        <>
          {'  '}
          <Keyword>return</Keyword> <Variable>a + b</Variable>
          <Punctuation>;</Punctuation>
          {isTyping && <Cursor show />}
        </>
      )
    }

    if (index === 3) {
      if (!line) return null
      return (
        <>
          <Punctuation>{'}'}</Punctuation>
          {isTyping && <Cursor show />}
        </>
      )
    }

    return line
  }

  return (
    <EditorWrapper>
      <EditorHeader>
        <WindowButtons>
          <WindowButton color="#ff5f56" />
          <WindowButton color="#ffbd2e" />
          <WindowButton color="#27ca40" />
        </WindowButtons>
        <FileName>sum.ts</FileName>
      </EditorHeader>
      <EditorContent>
        {displayedLines.map((line, i) => (
          <CodeLine key={i}>
            <LineNumber>{i + 1}</LineNumber>
            <LineContent>{renderLine(line, i)}</LineContent>
          </CodeLine>
        ))}
      </EditorContent>
      <GlowEffect />
    </EditorWrapper>
  )
}

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`

const EditorWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${float} 6s ease-in-out infinite;

  @media ${device.S} {
    animation: none;
  }
`

const EditorHeader = styled.div`
  background: var(--color-primary);
  border: 1px solid var(--color-shadow);
  border-bottom: none;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const WindowButtons = styled.div`
  display: flex;
  gap: 8px;
`

const WindowButton = styled.div<{color: string}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
`

const FileName = styled.span`
  color: var(--color-grey);
  font-size: 12px;
  margin-left: 16px;
`

const EditorContent = styled.div`
  background: rgba(var(--color-primary-rgb, 255, 255, 255), 0.5);
  background: var(--color-primary);
  border: 1px solid var(--color-shadow);
  border-top: none;
  padding: 24px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  min-height: 140px;

  @media ${device.S} {
    padding: 16px;
    font-size: 12px;
  }
`

const CodeLine = styled.div`
  display: flex;
  gap: 16px;
  min-height: 24px;
  line-height: 24px;
`

const LineNumber = styled.span`
  color: var(--color-grey);
  user-select: none;
  width: 24px;
  text-align: right;
`

const LineContent = styled.span`
  flex: 1;
`

const Comment = styled.span`
  color: var(--color-grey);
  font-style: italic;
`

const Keyword = styled.span`
  color: #4f8fef;
`

const FunctionName = styled.span`
  color: var(--color-accent);
`

const Variable = styled.span`
  color: var(--color-secondary);
`

const Type = styled.span`
  color: #4f8fef;
`

const Punctuation = styled.span`
  color: var(--color-grey);
`

const Cursor = styled.span<{show?: boolean}>`
  display: ${(props) => (props.show ? 'inline-block' : 'none')};
  width: 2px;
  height: 18px;
  background: var(--color-accent);
  margin-left: 2px;
  vertical-align: middle;
  animation: ${blink} 1s infinite;
`

const GlowEffect = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(126, 80, 230, 0.1) 0%,
    transparent 50%,
    rgba(0, 184, 212, 0.1) 100%
  );
  pointer-events: none;
`

export default AnimatedCodeEditor
