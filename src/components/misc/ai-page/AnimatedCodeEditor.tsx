import React, {useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'

const codeLines = [
  '// vytvor funkciu na sčítanie',
  'function sum(a: number, b: number) {',
  '  return a + b;',
  '}',
]

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const EditorWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${float} 6s ease-in-out infinite;
  max-width: 600px;
  width: 100%;
`

const EditorHeader = styled.div`
  background: var(--color-primary);
  border: 1px solid var(--color-secondary-light, rgba(0, 0, 0, 0.1));
  border-bottom: none;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const TrafficLights = styled.div`
  display: flex;
  gap: 8px;
`

const TrafficLight = styled.div<{color: string}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
`

const FileName = styled.span`
  font-size: 12px;
  color: var(--color-secondary);
  margin-left: 16px;
  opacity: 0.7;
`

const CodeContent = styled.div`
  background: var(--color-primary);
  border: 1px solid var(--color-secondary-light, rgba(0, 0, 0, 0.1));
  border-top: none;
  padding: 24px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  min-height: 120px;
`

const CodeLine = styled.div`
  display: flex;
  gap: 16px;
  min-height: 24px;
  line-height: 24px;
`

const LineNumber = styled.span`
  color: var(--color-secondary);
  opacity: 0.5;
  user-select: none;
  width: 24px;
  text-align: right;
  flex-shrink: 0;
`

const LineContent = styled.span`
  flex: 1;
  color: var(--color-secondary);
`

const Comment = styled.span`
  color: var(--color-secondary);
  opacity: 0.6;
  font-style: italic;
`

const Keyword = styled.span`
  color: #ff79c6;
`

const FunctionName = styled.span`
  color: var(--color-accent);
`

const Type = styled.span`
  color: #8be9fd;
`

const Cursor = styled.span`
  animation: ${blink} 1s step-end infinite;
  color: var(--color-secondary);
`

export const AnimatedCodeEditor: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([
    codeLines[0],
    '',
    '',
    '',
  ])
  const [currentLine, setCurrentLine] = useState(1)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    const typeCode = () => {
      if (currentLine >= codeLines.length) {
        setTimeout(() => {
          setDisplayedLines([codeLines[0], '', '', ''])
          setCurrentLine(1)
          setCurrentChar(0)
        }, 3000)
        return
      }

      const targetLine = codeLines[currentLine]
      if (currentChar <= targetLine.length) {
        const newLines = [...codeLines]
        newLines[currentLine] = targetLine.substring(0, currentChar)
        setDisplayedLines(newLines)
        setCurrentChar(currentChar + 1)
        setTimeout(typeCode, 50)
      } else {
        setCurrentLine(currentLine + 1)
        setCurrentChar(0)
        setTimeout(typeCode, 200)
      }
    }

    const timer = setTimeout(typeCode, 1000)
    return () => clearTimeout(timer)
  }, [currentLine, currentChar])

  const renderLineContent = (line: string, index: number) => {
    if (index === 0) {
      return <Comment>{line}</Comment>
    }

    if (index === 1) {
      const showCursor = currentLine === 1 && line.length < codeLines[1].length
      return (
        <>
          <Keyword>function</Keyword> <FunctionName>sum</FunctionName>
          <span>(</span>
          <span>a</span>
          <span>: </span>
          <Type>number</Type>
          <span>, </span>
          <span>b</span>
          <span>: </span>
          <Type>number</Type>
          <span>) {'{'}</span>
          {showCursor && <Cursor>|</Cursor>}
        </>
      )
    }

    if (index === 2) {
      const showCursor = currentLine === 2 && line.length < codeLines[2].length
      return (
        <>
          {'  '}
          <Keyword>return</Keyword> <span>a + b</span>
          <span>;</span>
          {showCursor && <Cursor>|</Cursor>}
        </>
      )
    }

    if (index === 3) {
      const showCursor = currentLine === 3 && line.length < codeLines[3].length
      return (
        <>
          <span>{'}'}</span>
          {showCursor && <Cursor>|</Cursor>}
        </>
      )
    }

    return line
  }

  return (
    <EditorWrapper>
      <EditorHeader>
        <TrafficLights>
          <TrafficLight color="#FF5F56" />
          <TrafficLight color="#FFBD2E" />
          <TrafficLight color="#27C93F" />
        </TrafficLights>
        <FileName>sum.ts</FileName>
      </EditorHeader>
      <CodeContent>
        {displayedLines.map((line, i) => (
          <CodeLine key={i}>
            <LineNumber>{i + 1}</LineNumber>
            <LineContent>{renderLineContent(line, i)}</LineContent>
          </CodeLine>
        ))}
      </CodeContent>
    </EditorWrapper>
  )
}
