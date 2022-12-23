/* eslint-disable max-len */
import React, {useEffect, useState} from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
}

const HeroAnimation = ({className}: Props) => {
  const [mounted, setMounted] = useState(false)
  // add hidden styles to prevent double animation at first render
  const classNames = clsx('animated', className, !mounted && 'hidden')

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <svg
      id="freepik_stories-code-typing"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
      version="1.1"
      viewBox="100 -50 375 375"
    >
      <g
        id="freepik--background-simple--inject-11"
        style={{
          WebkitTransformOrigin: 250.34,
          msTransformOrigin: 250.34,
          transformOrigin: 250.34,
        }}
        className="animable"
      >
        <path
          d="M481.72 245.83a119.56 119.56 0 01-3.33 28.48c-.75 3.06-1.65 6.11-2.68 9.11-.3.86-.6 1.72-.92 2.57-.26.7-.53 1.4-.8 2.09l-.23.57c-.29.72-.58 1.44-.89 2.15l-.15.35c-.3.7-.61 1.4-.92 2.09l-.42.91c-.28.62-.57 1.23-.87 1.84s-.63 1.29-.95 1.93c-.12.23-.23.46-.35.68l-.85 1.65-.69 1.27q-1.59 2.94-3.33 5.8c-.47.78-.95 1.56-1.44 2.33-.11.19-.23.38-.35.57q-.84 1.32-1.71 2.64c-.47.71-.94 1.42-1.43 2.13l-1.27 1.85-.28.39c-.44.64-.9 1.28-1.35 1.92-.56.79-1.13 1.56-1.7 2.34-.12.16-.23.32-.35.47-.65.89-1.32 1.77-2 2.64-.4.52-.8 1-1.21 1.56-.72.95-1.46 1.89-2.21 2.83s-1.43 1.79-2.16 2.68l-.24.29c-.72.89-1.44 1.77-2.18 2.65-.21.27-.44.54-.66.8-.67.81-1.35 1.62-2 2.42q-2.94 3.48-5.93 6.9-6.08 7-12.41 13.89c-3.51 3.8-7.07 7.58-10.7 11.29-17.42 17.89-36.28 34.58-56.79 47.88-2.55 1.65-5.12 3.26-7.72 4.79l-2.85 1.67-.49.28c-1 .56-2 1.11-2.95 1.65s-2 1.11-3 1.64l-1.38.72q-3 1.56-6 3c-1.09.52-2.18 1-3.28 1.51s-2 .91-3.05 1.35l-1.25.53c-.93.4-1.87.78-2.81 1.16q-2.72 1.1-5.48 2.09l-2.12.76-1.2.41-2 .65-1.72.55h-.06q-1.69.53-3.39 1c-1.79.52-3.58 1-5.38 1.46-1.19.3-2.38.58-3.58.85s-2.26.5-3.4.74l-.27.05c-1.18.24-2.37.47-3.56.68l-1.82.31-1.84.29c-.55.09-1.11.17-1.66.24l-2 .28a154.51 154.51 0 01-21.37 1.21h-1.28a176.84 176.84 0 01-19.35-1.45l-1.41-.19-2.43-.34-1.89-.3c-2.67-.42-5.32-.9-8-1.44-.59-.11-1.17-.23-1.75-.36-1.78-.37-3.57-.77-5.34-1.19-1.19-.28-2.37-.57-3.55-.87l-1.77-.46-1.77-.47c-2.35-.63-4.69-1.31-7-2q-4.06-1.23-8.08-2.61l-2.92-1c-3-1.07-6-2.2-9-3.37l-1.63-.66-1.31-.57-.88-.4c-1.94-.88-4-1.91-6.32-3.07l-1.16-.6c-1.39-.73-2.84-1.5-4.33-2.32-3.13-1.72-6.48-3.62-10-5.69-40-23.54-101.26-67.72-115.64-84.47-.73-.85-1.44-1.71-2.15-2.58-.55-.68-1.1-1.37-1.63-2.07s-1-1.26-1.44-1.91-.83-1.13-1.23-1.71-.76-1.07-1.13-1.61l-.08-.12c-.45-.67-.9-1.34-1.34-2s-.84-1.3-1.24-2c-.2-.31-.39-.63-.58-.95q-.67-1.11-1.32-2.22c-.46-.82-.92-1.64-1.37-2.47-.78-1.45-1.53-2.91-2.23-4.39l-.54-1.15a91.47 91.47 0 01-3.74-9.29c-.39-1.1-.74-2.21-1.08-3.32a94.89 94.89 0 01-1.18-4.31c-.07-.29-.14-.57-.2-.86-.18-.75-.35-1.51-.5-2.27a68.89 68.89 0 01-.6-3.19c0-.26-.09-.52-.12-.78-.09-.55-.17-1.1-.24-1.66s-.17-1.33-.24-2c0-.23-.05-.45-.07-.67-.06-.57-.1-1.14-.15-1.7a.61.61 0 000-.14c-.05-.68-.09-1.35-.11-2a1.28 1.28 0 010-.19q0-1.06-.06-2.13v-2c0-1 .05-2.09.11-3.13 0-.68.09-1.36.15-2 .12-1.34.28-2.68.48-4 .1-.68.21-1.36.34-2q.36-2 .87-4.05a69.72 69.72 0 013.45-10.25 72.21 72.21 0 013.59-7.34c.1-.2.22-.41.34-.61 5.39-9.49 12.72-17.91 21-25.71.88-.84 1.77-1.66 2.68-2.47s1.91-1.72 2.88-2.58l.18-.16q2.32-2 4.71-4c2.45-2.05 4.94-4.06 7.45-6.06l.25-.2c2.15-1.7 4.32-3.39 6.48-5.07 3.4-2.63 6.81-5.25 10.15-7.86l2.64-2.07c1-.76 1.92-1.52 2.87-2.28a213.69 213.69 0 0023.86-22.64q2.08-2.28 4.14-4.59c.65-.74 1.3-1.47 1.94-2.21 9.13-10.4 17.62-20.92 27.07-30.85q3.38-3.55 6.92-7c2-1.91 4-3.79 6.14-5.63A90.77 90.77 0 01167 101c3.55-2.76 7.29-5.41 11.29-7.94 1-.63 2-1.24 2.93-1.84 99.71-62 173.1-41.74 222.06 0Q408.85 96 414 101c2.08 2 4.09 4.09 6 6.19.22.22.42.45.63.69q2.06 2.19 4 4.41l1.15 1.32c.57.66 1.14 1.32 1.7 2s1.37 1.63 2.05 2.45l1.27 1.56c2.73 3.36 5.33 6.77 7.81 10.2.5.68 1 1.37 1.48 2.06 3.42 4.8 6.6 9.65 9.55 14.47l1.25 2.06q.63 1 1.23 2.07l1.19 2.05c.4.69.79 1.37 1.17 2.05l1.14 2c.39.68.76 1.36 1.11 2l1.09 2c.36.67.71 1.35 1.06 2l1 2 1 2q2 4 3.73 7.82c.58 1.3 1.16 2.59 1.71 3.86 2.49 5.72 4.62 11.19 6.36 16.28a.19.19 0 010 .07c.17.49.33 1 .49 1.45s.33 1 .49 1.48.25.75.36 1.13c.18.56.36 1.12.53 1.69s.37 1.22.54 1.83c.33 1.12.65 2.24 1 3.37.26.95.51 1.9.75 2.86 0 .18.1.35.14.53s.07.3.11.45c.14.56.28 1.12.41 1.69.36 1.49.69 3 1 4.49.17.82.34 1.63.49 2.45l.09.46q.23 1.15.42 2.31c.18 1 .35 2.07.5 3.1.13.78.24 1.57.35 2.36 0 .11 0 .23.05.35.07.52.14 1 .2 1.58s.11.88.16 1.31c.18 1.59.34 3.17.47 4.76l.09 1.08.12 1.81c0 .67.08 1.34.11 2 0 .52.05 1 .07 1.55 0 .76.05 1.53.06 2.29s.04 1.95.04 2.84z"
          style={{
            WebkitTransformOrigin: 250.34,
            msTransformOrigin: 250.34,
            transformOrigin: 250.34,
          }}
          fill="#7E50E6"
          className="animable"
        />
        <g>
          <g
            style={{
              WebkitTransformOrigin: 250.34,
              msTransformOrigin: 250.34,
              transformOrigin: 250.34,
            }}
            className="animable"
            opacity="0.7"
          >
            <path
              d="M481.72 245.83a119.56 119.56 0 01-3.33 28.48c-.75 3.06-1.65 6.11-2.68 9.11-.3.86-.6 1.72-.92 2.57-.26.7-.53 1.4-.8 2.09l-.23.57c-.29.72-.58 1.44-.89 2.15l-.15.35c-.3.7-.61 1.4-.92 2.09l-.42.91c-.28.62-.57 1.23-.87 1.84s-.63 1.29-.95 1.93c-.12.23-.23.46-.35.68l-.85 1.65-.69 1.27q-1.59 2.94-3.33 5.8c-.47.78-.95 1.56-1.44 2.33-.11.19-.23.38-.35.57q-.84 1.32-1.71 2.64c-.47.71-.94 1.42-1.43 2.13l-1.27 1.85-.28.39c-.44.64-.9 1.28-1.35 1.92-.56.79-1.13 1.56-1.7 2.34-.12.16-.23.32-.35.47-.65.89-1.32 1.77-2 2.64-.4.52-.8 1-1.21 1.56-.72.95-1.46 1.89-2.21 2.83s-1.43 1.79-2.16 2.68l-.24.29c-.72.89-1.44 1.77-2.18 2.65-.21.27-.44.54-.66.8-.67.81-1.35 1.62-2 2.42q-2.94 3.48-5.93 6.9-6.08 7-12.41 13.89c-3.51 3.8-7.07 7.58-10.7 11.29-17.42 17.89-36.28 34.58-56.79 47.88-2.55 1.65-5.12 3.26-7.72 4.79l-2.85 1.67-.49.28c-1 .56-2 1.11-2.95 1.65s-2 1.11-3 1.64l-1.38.72q-3 1.56-6 3c-1.09.52-2.18 1-3.28 1.51s-2 .91-3.05 1.35l-1.25.53c-.93.4-1.87.78-2.81 1.16q-2.72 1.1-5.48 2.09l-2.12.76-1.2.41-2 .65-1.72.55h-.06q-1.69.53-3.39 1c-1.79.52-3.58 1-5.38 1.46-1.19.3-2.38.58-3.58.85s-2.26.5-3.4.74l-.27.05c-1.18.24-2.37.47-3.56.68l-1.82.31-1.84.29c-.55.09-1.11.17-1.66.24l-2 .28a154.51 154.51 0 01-21.37 1.21h-1.28a176.84 176.84 0 01-19.35-1.45l-1.41-.19-2.43-.34-1.89-.3c-2.67-.42-5.32-.9-8-1.44-.59-.11-1.17-.23-1.75-.36-1.78-.37-3.57-.77-5.34-1.19-1.19-.28-2.37-.57-3.55-.87l-1.77-.46-1.77-.47c-2.35-.63-4.69-1.31-7-2q-4.06-1.23-8.08-2.61l-2.92-1c-3-1.07-6-2.2-9-3.37l-1.63-.66-1.31-.57-.88-.4c-1.94-.88-4-1.91-6.32-3.07l-1.16-.6c-1.39-.73-2.84-1.5-4.33-2.32-3.13-1.72-6.48-3.62-10-5.69-40-23.54-101.26-67.72-115.64-84.47-.73-.85-1.44-1.71-2.15-2.58-.55-.68-1.1-1.37-1.63-2.07s-1-1.26-1.44-1.91-.83-1.13-1.23-1.71-.76-1.07-1.13-1.61l-.08-.12c-.45-.67-.9-1.34-1.34-2s-.84-1.3-1.24-2c-.2-.31-.39-.63-.58-.95q-.67-1.11-1.32-2.22c-.46-.82-.92-1.64-1.37-2.47-.78-1.45-1.53-2.91-2.23-4.39l-.54-1.15a91.47 91.47 0 01-3.74-9.29c-.39-1.1-.74-2.21-1.08-3.32a94.89 94.89 0 01-1.18-4.31c-.07-.29-.14-.57-.2-.86-.18-.75-.35-1.51-.5-2.27-.23-1.06-.43-2.12-.6-3.19 0-.26-.09-.52-.12-.78-.09-.55-.17-1.1-.24-1.66s-.17-1.33-.24-2c0-.23-.05-.45-.07-.67-.06-.57-.1-1.14-.15-1.7a.61.61 0 000-.14c-.05-.68-.09-1.35-.11-2a1.28 1.28 0 010-.19q0-1.06-.06-2.13c0-1.73 0-3.45.11-5.17 0-.68.09-1.36.15-2 .12-1.34.28-2.68.48-4 .1-.68.21-1.36.34-2q.36-2 .87-4.05a69.72 69.72 0 013.45-10.25 72.21 72.21 0 013.59-7.34c.1-.2.22-.41.34-.61 5.39-9.49 12.72-17.91 21-25.71l1.42-1.33 1.26-1.14c1-.87 1.91-1.72 2.88-2.58l.18-.16q2.32-2 4.71-4c2.45-2.05 4.94-4.06 7.45-6.06l.25-.2c2.15-1.7 4.32-3.39 6.48-5.07l3.26-2.52c2.31-1.78 4.62-3.56 6.89-5.34l2.64-2.07c1-.76 1.92-1.52 2.87-2.28a213.69 213.69 0 0023.86-22.64q2.08-2.28 4.14-4.59c.65-.74 1.3-1.47 1.94-2.21 9.13-10.4 17.62-20.92 27.07-30.85q3.38-3.55 6.92-7c2-1.91 4-3.79 6.14-5.63 2.35-2.23 4.78-4.34 7.35-6.34 3.55-2.76 7.29-5.41 11.29-7.94 1-.63 2-1.24 2.93-1.84 99.71-62 173.1-41.74 222.06 0Q408.85 96 414 101c2.08 2 4.09 4.09 6 6.19.22.22.42.45.63.69q2.06 2.19 4 4.41l1.15 1.32c.57.66 1.14 1.32 1.7 2s1.37 1.63 2.05 2.45l1.27 1.56c2.73 3.36 5.33 6.77 7.81 10.2.5.68 1 1.37 1.48 2.06 3.42 4.8 6.6 9.65 9.55 14.47l1.25 2.06q.63 1 1.23 2.07l1.19 2.05c.4.69.79 1.37 1.17 2.05l1.14 2c.39.68.76 1.36 1.11 2l1.09 2c.36.67.71 1.35 1.06 2l1 2 1 2q2 4 3.73 7.82c.58 1.3 1.16 2.59 1.71 3.86 2.49 5.72 4.62 11.19 6.36 16.28a.19.19 0 010 .07c.17.49.33 1 .49 1.45s.33 1 .49 1.48.25.75.36 1.13c.18.56.36 1.12.53 1.69s.37 1.22.54 1.83c.33 1.12.65 2.24 1 3.37.26.95.51 1.9.75 2.86 0 .18.1.35.14.53s.07.3.11.45c.14.56.28 1.12.41 1.69.36 1.49.69 3 1 4.49.17.82.34 1.63.49 2.45l.09.46q.23 1.15.42 2.31c.18 1 .35 2.07.5 3.1.13.78.24 1.57.35 2.36 0 .11 0 .23.05.35.07.52.14 1 .2 1.58s.11.88.16 1.31c.18 1.59.34 3.17.47 4.76l.09 1.08.12 1.81c0 .67.08 1.34.11 2 0 .52.05 1 .07 1.55 0 .76.05 1.53.06 2.29s.04 1.95.04 2.84z"
              style={{
                WebkitTransformOrigin: 250.34,
                msTransformOrigin: 250.34,
                transformOrigin: 250.34,
              }}
              fill="#FFF"
              className="animable"
            />
          </g>
        </g>
      </g>
      <g
        id="freepik--Plant--inject-11"
        style={{
          WebkitTransformOrigin: 77.288,
          msTransformOrigin: 77.288,
          transformOrigin: 77.288,
        }}
        className="animable"
      >
        <g>
          <path
            d="M32.14 262.26c-.2-.13-.15-.22 0 0z"
            style={{
              WebkitTransformOrigin: 32.074,
              msTransformOrigin: 32.074,
              transformOrigin: 32.074,
            }}
            fill="#263238"
            className="animable"
            opacity="0.2"
          />
        </g>
        <g>
          <path
            d="M125.67 253.44a18.32 18.32 0 01-12.57 14.47l-2.48.81c-8.92 12.63-24.56 18-37.89 10.19l-3.9-2.29-10.92-13h-.13c-3.46.72-7.37.19-9.93-2.25a3.4 3.4 0 11-5.51-3.25c-2.2 1.94-5.6 1.05-7.72-1.07a66.7 66.7 0 012-17.29 69.72 69.72 0 013.38-10.2 72.21 72.21 0 013.59-7.34c.1-.2.22-.41.34-.61a87.87 87.87 0 016.65-10l1.26-1.14c1-.87 1.91-1.72 2.88-2.58l.18-.16q2.32-2 4.71-4c2.45-2.05 4.94-4.06 7.45-6.06l.25-.2c2.15-1.7 4.32-3.39 6.48-5.07l3.26-2.52a8.94 8.94 0 011.92.45c2.67.93 3.13 3.38 5 5.06 2.46 2.25 4.82-1.53 8.61-1.41 11.65.36 7.13 12.31 12.82 10.81 24.57-6.48 20.44 24.95 9.76 31.85 6.3 5.17 11.73 8.62 10.51 16.8z"
            style={{
              WebkitTransformOrigin: 80.2272,
              msTransformOrigin: 80.2272,
              transformOrigin: 80.2272,
            }}
            className="animable"
            opacity="0.2"
          />
        </g>
        <ellipse
          cx="72.84"
          cy="242.39"
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          rx="41.44"
          ry="40.93"
          style={{
            WebkitTransformOrigin: 72.84,
            msTransformOrigin: 72.84,
            transformOrigin: 72.84,
          }}
          className="animable"
        />
        <ellipse
          cx="72.84"
          cy="240.73"
          fill="#263238"
          stroke="#FFF"
          strokeMiterlimit="10"
          rx="37.78"
          ry="37.32"
          style={{
            WebkitTransformOrigin: 72.84,
            msTransformOrigin: 72.84,
            transformOrigin: 72.84,
          }}
          className="animable"
        />
        <path
          d="M32.24 255.44c-2.38 1.48-3.06 6.45-1.19 8.61s5.46.49 6.19-2.87a1.12 1.12 0 002 .28 2.3 2.3 0 00.14-2.1c-.18-.15-.11-.26 0 0 1.22 1 3.32-.09 3.61-2.16-.89 5.5 4.11 10.3 7.79 7.5-1.09 2.34.34 5.41 2.24 6s3.94-.53 5.76-1.77 3.69-2.67 5.68-2.76c1.73-.08 3.34.9 5 1.48 5.26 1.83 11.42-.6 15.44-6.11 2.66 4.55 9.21 2.87 11-2.79.37 2.65 2.18 4.67 4.21 4.69s4.06-1.94 4.76-4.57c0 2.51 2.28 3.74 3.88 2.13a9.38 9.38 0 002.31-8.87c2.72-.11 5.36-3.27 5.77-6.93s-1.43-7.34-4.06-8.06c4.52-1.87 8-8 8.22-14.29s-3.06-12.09-7.49-13.55a4.7 4.7 0 00-5.08 1.06c-.53-3.57-2.15-6.76-4.54-8.36-3.8-2.57-9.09-.81-11.92 4a9.41 9.41 0 00.22-8.38c-1.26-2.33-3.76-3.27-5.88-2.17-.45-3.83-3.41-6.55-6.3-5.81s-5.22 4.84-5 8.71c-.27-3.12-4-3.89-5.28-1.27.11.24-.06.1 0 0-1.84-3.86-5.58-5.84-9.05-4.71-3.69 1.21-6.79 5.84-7.27 10.9a6.51 6.51 0 00-9 .25c-2.73 2.46-4.31 7.14-3.83 11.32-2.87-2.83-7.7-1.28-9.67 3.1s-.62 10.58 2.71 12.42c-2.29.35-4.31 3.39-4.31 6.47s2 5.72 4.33 5.64c-2.32.2-4.51 2.94-4.85 6.05s1.22 6.24 3.46 6.92z"
          style={{
            WebkitTransformOrigin: 74.867,
            msTransformOrigin: 74.867,
            transformOrigin: 74.867,
          }}
          fill="#7E50E6"
          className="animable"
        />
        <g>
          <g
            style={{
              WebkitTransformOrigin: 73.1857,
              msTransformOrigin: 73.1857,
              transformOrigin: 73.1857,
            }}
            className="animable"
            opacity="0.2"
          >
            <path
              d="M70.33 241.1a4.32 4.32 0 00-4-1 4.81 4.81 0 00-3 3.72c-.32 1.81.52 3.81 1.9 4.15 1.69.42 3.42-1.47 5.14-1.26a11.1 11.1 0 011.77.58c2.47.69 5-1.53 7.06-3.61a9.82 9.82 0 002-2.49 4.06 4.06 0 00.26-3.29c-.6-1.35-2.1-1.46-3.36-1.2a13.44 13.44 0 00-7 4.1c.07-.51.14-1 .22-1.52z"
              style={{
                WebkitTransformOrigin: 72.477,
                msTransformOrigin: 72.477,
                transformOrigin: 72.477,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M106.45 236.17a5.69 5.69 0 00-2.14-1.32 2.06 2.06 0 00-2.26 1 3.28 3.28 0 00.56 3.76 5.21 5.21 0 003.13 1.17c1.14.15 2.58.12 3.17-1.21a2.88 2.88 0 00-.48-2.88 4.93 4.93 0 00-2.22-1.27z"
              style={{
                WebkitTransformOrigin: 105.398,
                msTransformOrigin: 105.398,
                transformOrigin: 105.398,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M49.91 215.74a11 11 0 00-4.74 7.32c-.18.94-.18 2.12.46 2.58a1.67 1.67 0 001.55 0l6.64-2.4a10 10 0 00-3 2.19 5 5 0 00-1.2 3.92 2.88 2.88 0 003 2.44 6.44 6.44 0 003.67-2.08 6.75 6.75 0 002.38-4.45c0-1.8-1.7-3.37-2.81-2.15a24.48 24.48 0 007.14-4.59 8.59 8.59 0 002.09-2.58 4.33 4.33 0 00.27-3.44c-2.16-5.09-5.15 2.75-6.55 3.52-2.63 1.46-5.53-2.26-8.9-.28z"
              style={{
                WebkitTransformOrigin: 55.3313,
                msTransformOrigin: 55.3313,
                transformOrigin: 55.3313,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M39.23 238.69a3.17 3.17 0 00.53 2.88 1.3 1.3 0 002.12-.68 8.1 8.1 0 00-4 3.09c-1 1.64-.77 4.39.69 4.91.91.33 1.89-.31 2.75-.95a56.84 56.84 0 006.93-6.15 3.16 3.16 0 002.48 4.14c1.64.08 3.2-1.14 4.63-2.32 1.75-1.45 3.77-3.61 3.36-6.09a3 3 0 00-4.23-2.26c-1.7.75-3 2.56-4.21 4.3 1-1.78-.31-4.25-1.93-4.43s-3.16 1.14-4.17 2.68c1.86-1.4 2.33-4.77-.12-5-1.62-.16-4.41 4.19-4.83 5.88z"
              style={{
                WebkitTransformOrigin: 48.0219,
                msTransformOrigin: 48.0219,
                transformOrigin: 48.0219,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M89.77 228.09c-1.38-.58-3.14.68-3.54 2.53s.63 3.87 2.08 4.06a4.43 4.43 0 00-2.83 2 3.56 3.56 0 00-.63 2.14 2 2 0 001.94 1.8 5.36 5.36 0 002.59-1.08 4.38 4.38 0 00-2.55 1.09 2.57 2.57 0 00-.43 3c.52.64 1.39.47 2.11.17a11.31 11.31 0 004.38-3.37 3.53 3.53 0 003.59 1.73 3.47 3.47 0 002.14-3.9 2.51 2.51 0 00-2.2-1.94 5.77 5.77 0 00-2.88.75 7.41 7.41 0 002.37-3.38c.37-1.44-.35-3.29-1.51-3.11-1.31.21-2 2.52-3.06 3.4-1.25-1.43 1.19-4.74-1.57-5.89z"
              style={{
                WebkitTransformOrigin: 91.7668,
                msTransformOrigin: 91.7668,
                transformOrigin: 91.7668,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M66.36 222.6c-1.5 1.37-2.07 3.93-2 6.21.06 2.52.91 5.16 2.71 6.06 2.36 1.18 5.39-1.53 5.89-4.83a8.08 8.08 0 00-3.41-7.92 2.87 2.87 0 00-3.19.48z"
              style={{
                WebkitTransformOrigin: 68.7065,
                msTransformOrigin: 68.7065,
                transformOrigin: 68.7065,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M83.08 218.86l.6.64a2.62 2.62 0 00-4.34-.17 4.75 4.75 0 00-.12 5.56 2.71 2.71 0 004.36-.66 4 4 0 005.23-1.57c1.25-1.93 1-5.17-.59-6.26s-4.18.85-4 3.25l-.7-1z"
              style={{
                WebkitTransformOrigin: 83.9917,
                msTransformOrigin: 83.9917,
                transformOrigin: 83.9917,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M101.41 221.52a13.71 13.71 0 00-2.93 5.27c-.47 2.07.19 4.62 1.79 5s3.12-1.35 4.07-3.15a8.06 8.06 0 001.07-5.4c-.44-1.77-2.45-2.71-3.49-1.26z"
              style={{
                WebkitTransformOrigin: 101.918,
                msTransformOrigin: 101.918,
                transformOrigin: 101.918,
              }}
              fill="#FFF"
              className="animable"
            />
            <path
              d="M75.12 210.83a2.3 2.3 0 00-3.72-1.08 5.11 5.11 0 00-1.26 5 3.93 3.93 0 003.35 2.91 3.69 3.69 0 003.61-4.09 3.21 3.21 0 003.43 1.46 8.94 8.94 0 003.63-1.94c1.54-1.21 3.19-3 3.07-5.25a3.2 3.2 0 00-2.8-3.12 5.13 5.13 0 00-3.86 2.05c-.85.95-1.56 2.12-2.48 3s-2.15 1.35-3.1.75z"
              style={{
                WebkitTransformOrigin: 78.5871,
                msTransformOrigin: 78.5871,
                transformOrigin: 78.5871,
              }}
              fill="#FFF"
              className="animable"
            />
          </g>
        </g>
      </g>
      <g
        id="freepik--Keyboard--inject-11"
        style={{
          WebkitTransformOrigin: 261.035,
          msTransformOrigin: 261.035,
          transformOrigin: 261.035,
        }}
        className="animable"
      >
        <path
          style={{
            WebkitTransformOrigin: 261.015,
            msTransformOrigin: 261.015,
            transformOrigin: 261.015,
          }}
          fill="#7E50E6"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M145.68 272.76H376.35V369.90999999999997H145.68z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 161.35,
            msTransformOrigin: 161.35,
            transformOrigin: 161.35,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M150.5 278.64H172.2V290.65H150.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 353.92,
            msTransformOrigin: 353.92,
            transformOrigin: 353.92,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M336.83 337.2H371.01V349.21H336.83z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 360.46,
            msTransformOrigin: 360.46,
            transformOrigin: 360.46,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M349.91 293.64H371.01000000000005V305.65H349.91z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 161.35,
            msTransformOrigin: 161.35,
            transformOrigin: 161.35,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M150.5 322.39H172.2V334.4H150.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 159.285,
            msTransformOrigin: 159.285,
            transformOrigin: 159.285,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M150.5 307.92H168.07V319.93H150.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 156.505,
            msTransformOrigin: 156.505,
            transformOrigin: 156.505,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M150.5 293.28H162.51V305.28999999999996H150.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 171.845,
            msTransformOrigin: 171.845,
            transformOrigin: 171.845,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M165.84 293.28H177.85V305.28999999999996H165.84z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 187.175,
            msTransformOrigin: 187.175,
            transformOrigin: 187.175,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M181.17 293.28H193.17999999999998V305.28999999999996H181.17z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 202.505,
            msTransformOrigin: 202.505,
            transformOrigin: 202.505,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M196.5 293.28H208.51V305.28999999999996H196.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 217.845,
            msTransformOrigin: 217.845,
            transformOrigin: 217.845,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M211.84 293.28H223.85V305.28999999999996H211.84z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 233.175,
            msTransformOrigin: 233.175,
            transformOrigin: 233.175,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M227.17 293.28H239.17999999999998V305.28999999999996H227.17z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 248.505,
            msTransformOrigin: 248.505,
            transformOrigin: 248.505,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M242.5 293.28H254.51V305.28999999999996H242.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 263.845,
            msTransformOrigin: 263.845,
            transformOrigin: 263.845,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M257.84 293.28H269.84999999999997V305.28999999999996H257.84z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 279.175,
            msTransformOrigin: 279.175,
            transformOrigin: 279.175,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M273.17 293.28H285.18V305.28999999999996H273.17z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 294.505,
            msTransformOrigin: 294.505,
            transformOrigin: 294.505,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M288.5 293.28H300.51V305.28999999999996H288.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 309.845,
            msTransformOrigin: 309.845,
            transformOrigin: 309.845,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M303.84 293.28H315.84999999999997V305.28999999999996H303.84z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 325.175,
            msTransformOrigin: 325.175,
            transformOrigin: 325.175,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M319.17 293.28H331.18V305.28999999999996H319.17z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 340.515,
            msTransformOrigin: 340.515,
            transformOrigin: 340.515,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M334.51 293.28H346.52V305.28999999999996H334.51z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 156.505,
            msTransformOrigin: 156.505,
            transformOrigin: 156.505,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M150.5 352.02H162.51V364.03H150.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 171.845,
            msTransformOrigin: 171.845,
            transformOrigin: 171.845,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M165.84 352.02H177.85V364.03H165.84z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 187.175,
            msTransformOrigin: 187.175,
            transformOrigin: 187.175,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M181.17 352.02H193.17999999999998V364.03H181.17z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 203.83,
            msTransformOrigin: 203.83,
            transformOrigin: 203.83,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M196.5 352.02H211.16V364.03H196.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 251.155,
            msTransformOrigin: 251.155,
            transformOrigin: 251.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M214.48 352.02H287.83V364.03H214.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 318.495,
            msTransformOrigin: 318.495,
            transformOrigin: 318.495,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M312.49 352.02H324.5V364.03H312.49z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 333.825,
            msTransformOrigin: 333.825,
            transformOrigin: 333.825,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M327.82 352.02H339.83V364.03H327.82z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 349.185,
            msTransformOrigin: 349.185,
            transformOrigin: 349.185,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M343.18 352.02H355.19V364.03H343.18z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 300.155,
            msTransformOrigin: 300.155,
            transformOrigin: 300.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M290.83 352.02H309.47999999999996V364.03H290.83z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 365.005,
            msTransformOrigin: 365.005,
            transformOrigin: 365.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M359 352.02H371.01V364.03H359z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 177.485,
            msTransformOrigin: 177.485,
            transformOrigin: 177.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M171.48 307.92H183.48999999999998V319.93H171.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 192.815,
            msTransformOrigin: 192.815,
            transformOrigin: 192.815,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M186.81 307.92H198.82V319.93H186.81z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 208.155,
            msTransformOrigin: 208.155,
            transformOrigin: 208.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M202.15 307.92H214.16V319.93H202.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 223.485,
            msTransformOrigin: 223.485,
            transformOrigin: 223.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M217.48 307.92H229.48999999999998V319.93H217.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 238.825,
            msTransformOrigin: 238.825,
            transformOrigin: 238.825,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M232.82 307.92H244.82999999999998V319.93H232.82z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 254.155,
            msTransformOrigin: 254.155,
            transformOrigin: 254.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M248.15 307.92H260.16V319.93H248.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 269.485,
            msTransformOrigin: 269.485,
            transformOrigin: 269.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M263.48 307.92H275.49V319.93H263.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 284.825,
            msTransformOrigin: 284.825,
            transformOrigin: 284.825,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M278.82 307.92H290.83V319.93H278.82z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 300.155,
            msTransformOrigin: 300.155,
            transformOrigin: 300.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M294.15 307.92H306.15999999999997V319.93H294.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 315.485,
            msTransformOrigin: 315.485,
            transformOrigin: 315.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M309.48 307.92H321.49V319.93H309.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 330.825,
            msTransformOrigin: 330.825,
            transformOrigin: 330.825,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M324.82 307.92H336.83V319.93H324.82z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 346.155,
            msTransformOrigin: 346.155,
            transformOrigin: 346.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M340.15 307.92H352.15999999999997V319.93H340.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 363.245,
            msTransformOrigin: 363.245,
            transformOrigin: 363.245,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M371.01 307.92L371.01 334.58 359 334.58 359 319.94 355.48 319.94 355.48 307.92 371.01 307.92z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 181.005,
            msTransformOrigin: 181.005,
            transformOrigin: 181.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M175 322.56H187.01V334.57H175z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 196.335,
            msTransformOrigin: 196.335,
            transformOrigin: 196.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M190.33 322.56H202.34V334.57H190.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 211.665,
            msTransformOrigin: 211.665,
            transformOrigin: 211.665,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M205.66 322.56H217.67V334.57H205.66z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 227.005,
            msTransformOrigin: 227.005,
            transformOrigin: 227.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M221 322.56H233.01V334.57H221z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 242.335,
            msTransformOrigin: 242.335,
            transformOrigin: 242.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M236.33 322.56H248.34V334.57H236.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 257.675,
            msTransformOrigin: 257.675,
            transformOrigin: 257.675,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M251.67 322.56H263.68V334.57H251.67z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 273.005,
            msTransformOrigin: 273.005,
            transformOrigin: 273.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M267 322.56H279.01V334.57H267z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 288.335,
            msTransformOrigin: 288.335,
            transformOrigin: 288.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M282.33 322.56H294.34V334.57H282.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 303.675,
            msTransformOrigin: 303.675,
            transformOrigin: 303.675,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M297.67 322.56H309.68V334.57H297.67z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 319.005,
            msTransformOrigin: 319.005,
            transformOrigin: 319.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M313 322.56H325.01V334.57H313z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 334.335,
            msTransformOrigin: 334.335,
            transformOrigin: 334.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M328.33 322.56H340.34V334.57H328.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 349.675,
            msTransformOrigin: 349.675,
            transformOrigin: 349.675,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M343.67 322.56H355.68V334.57H343.67z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 174.485,
            msTransformOrigin: 174.485,
            transformOrigin: 174.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M168.48 337.2H180.48999999999998V349.21H168.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 189.815,
            msTransformOrigin: 189.815,
            transformOrigin: 189.815,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M183.81 337.2H195.82V349.21H183.81z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 205.155,
            msTransformOrigin: 205.155,
            transformOrigin: 205.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M199.15 337.2H211.16V349.21H199.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 220.485,
            msTransformOrigin: 220.485,
            transformOrigin: 220.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M214.48 337.2H226.48999999999998V349.21H214.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 235.815,
            msTransformOrigin: 235.815,
            transformOrigin: 235.815,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M229.81 337.2H241.82V349.21H229.81z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 251.155,
            msTransformOrigin: 251.155,
            transformOrigin: 251.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M245.15 337.2H257.16V349.21H245.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 266.485,
            msTransformOrigin: 266.485,
            transformOrigin: 266.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M260.48 337.2H272.49V349.21H260.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 281.825,
            msTransformOrigin: 281.825,
            transformOrigin: 281.825,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M275.82 337.2H287.83V349.21H275.82z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 297.155,
            msTransformOrigin: 297.155,
            transformOrigin: 297.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M291.15 337.2H303.15999999999997V349.21H291.15z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 312.485,
            msTransformOrigin: 312.485,
            transformOrigin: 312.485,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M306.48 337.2H318.49V349.21H306.48z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 327.825,
            msTransformOrigin: 327.825,
            transformOrigin: 327.825,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M321.82 337.2H333.83V349.21H321.82z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 181.005,
            msTransformOrigin: 181.005,
            transformOrigin: 181.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M175 279.36H187.01V291.37H175z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 196.335,
            msTransformOrigin: 196.335,
            transformOrigin: 196.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M190.33 279.36H202.34V291.37H190.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 211.665,
            msTransformOrigin: 211.665,
            transformOrigin: 211.665,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M205.66 279.36H217.67V291.37H205.66z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 227.005,
            msTransformOrigin: 227.005,
            transformOrigin: 227.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M221 279.36H233.01V291.37H221z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 242.335,
            msTransformOrigin: 242.335,
            transformOrigin: 242.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M236.33 279.36H248.34V291.37H236.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 257.675,
            msTransformOrigin: 257.675,
            transformOrigin: 257.675,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M251.67 279.36H263.68V291.37H251.67z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 273.005,
            msTransformOrigin: 273.005,
            transformOrigin: 273.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M267 279.36H279.01V291.37H267z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 288.335,
            msTransformOrigin: 288.335,
            transformOrigin: 288.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M282.33 279.36H294.34V291.37H282.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 303.675,
            msTransformOrigin: 303.675,
            transformOrigin: 303.675,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M297.67 279.36H309.68V291.37H297.67z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 319.005,
            msTransformOrigin: 319.005,
            transformOrigin: 319.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M313 279.36H325.01V291.37H313z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 334.335,
            msTransformOrigin: 334.335,
            transformOrigin: 334.335,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M328.33 279.36H340.34V291.37H328.33z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 349.675,
            msTransformOrigin: 349.675,
            transformOrigin: 349.675,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M343.67 279.36H355.68V291.37H343.67z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 365.005,
            msTransformOrigin: 365.005,
            transformOrigin: 365.005,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M359 279.36H371.01V291.37H359z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 157.775,
            msTransformOrigin: 157.775,
            transformOrigin: 157.775,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          d="M150.5 337.2H165.05V349.21H150.5z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 261.035,
            msTransformOrigin: 261.035,
            transformOrigin: 261.035,
          }}
          fill="#263238"
          d="M145.68 273.38L150.5 271.78 373.22 271.78 376.39 273.36 145.68 273.38z"
          className="animable"
        />
      </g>
      <g
        id="freepik--Hands--inject-11"
        style={{
          WebkitTransformOrigin: 257.555,
          msTransformOrigin: 257.555,
          transformOrigin: 257.555,
        }}
        className="animable"
      >
        <g>
          <path
            d="M310.33 440l-4.69-28.25a23.07 23.07 0 00-6.35-11.06c-9.33-9-21.66-18.24-22.19-30-.81-18-3.62-17.49-3.32-21.94a54.06 54.06 0 003.21-6.6 38.47 38.47 0 001.36-5.34 3.64 3.64 0 014-2.85 6.19 6.19 0 013.39 1.59 9.39 9.39 0 012.54 6.5 27.79 27.79 0 01-1 7.06 46.16 46.16 0 013 12.41c1.07-3.3 1.88-6.63 2.95-9.92.22-.12.14-.38.35-.5-1.51-3.24-.23-3.06-3.22-10.19-5-12-10.64-23.57-14.65-38.65a8.57 8.57 0 01.09-4.24c1.45-4.31 5.89-3.32 7.83-.81a8.28 8.28 0 011.2 2.18 116.46 116.46 0 009.57 18.45l10.89 16.6s3.79-3.11 4.37-4.5c.57-1.4.85-12.67.85-12.67s-.86 2.11-2.77 2c-1.38-.1-4.18.7-6.17-1.54a5.21 5.21 0 01-.18-6.54l4.93-6.66a7.48 7.48 0 017.74-.93 36.82 36.82 0 018.71 6.1 17.81 17.81 0 017.58 1.46c3.49 1.68 7.15 6.5 7.15 6.5s4.07.25 5.9 1.58c.46.33 6.67 10 4.43 17.53-1.33 4.49-2.15 11-2.75 12.76l-3.05 44.09 6.15 29-13.15 7.33a94 94 0 01-15.03 6.73z"
            style={{
              WebkitTransformOrigin: 311.037,
              msTransformOrigin: 311.037,
              transformOrigin: 311.037,
            }}
            className="animable"
            opacity="0.2"
          />
        </g>
        <path
          d="M347.67 388.48l.12-44.21c.48-1.78.87-8.34 1.89-12.91 1.74-7.66-5.1-16.9-5.58-17.2-1.92-1.19-6-1.17-6-1.17s-4-4.57-7.57-6a17.87 17.87 0 00-7.66-1 36.61 36.61 0 00-9.1-5.51 7.49 7.49 0 00-7.66 1.44l-4.47 7a5.21 5.21 0 00.61 6.52c2.14 2.11 4.88 1.12 6.26 1.12 1.91 0 2.63-2.16 2.63-2.16s.47 11.26 0 12.69c-.49 1.43-4.07 4.78-4.07 4.78l-12-15.83a114.51 114.51 0 01-10.77-17.78 8.5 8.5 0 00-1.35-2.09c-2.1-2.38-6.59-3.07-7.76 1.32a8.7 8.7 0 00.19 4.24c5 14.78 11.38 25.95 17.19 37.59 3.45 6.91 2.17 6.83 3.89 9.95-.2.14-.1.4-.32.53-.84 3.36-1.43 6.73-2.28 10.09a46 46 0 00-3.83-12.18 27.5 27.5 0 00.53-7.12 9.38 9.38 0 00-3-6.31 6.17 6.17 0 00-3.49-1.36 3.64 3.64 0 00-3.84 3.12 37.51 37.51 0 01-1 5.41 54.48 54.48 0 01-2.76 6.8c0 4.46 2.76 3.73 4.77 21.67 1.56 14 19.56 23.21 29.36 33.3l10.44 32.86A202.3 202.3 0 00356 417.79z"
          style={{
            WebkitTransformOrigin: 315.507,
            msTransformOrigin: 315.507,
            transformOrigin: 315.507,
          }}
          fill="#FFF"
          className="animable"
        />
        <g
          style={{
            WebkitTransformOrigin: 314.129,
            msTransformOrigin: 314.129,
            transformOrigin: 314.129,
          }}
          className="animable"
          clipPath='url("#freepik--clip-path--inject-11")'
        >
          <path
            d="M342.55 328.41a7.69 7.69 0 012.29-3.46 2.93 2.93 0 013.83.13q-1.12-3.43-2.38-6.83a10.56 10.56 0 00-2.78-4.68c-1.42-1.16-3.76-1.4-5 0a54.05 54.05 0 01.28 15.81c-.37 2.84-.85 6.1 1.06 8.23.53.43 1.45-.34 1.11-.93-.16-.28-.72-.3-1-.28a50.82 50.82 0 012.59-7.99z"
            style={{
              WebkitTransformOrigin: 343.56,
              msTransformOrigin: 343.56,
              transformOrigin: 343.56,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M342.55 328.41a7.69 7.69 0 012.29-3.46 2.93 2.93 0 013.83.13q-1.12-3.43-2.38-6.83a10.56 10.56 0 00-2.78-4.68c-1.42-1.16-3.76-1.4-5 0a54.05 54.05 0 01.28 15.81c-.37 2.84-.85 6.1 1.06 8.23.53.43 1.45-.34 1.11-.93-.16-.28-.72-.3-1-.28a50.82 50.82 0 012.59-7.99z"
            style={{
              WebkitTransformOrigin: 343.56,
              msTransformOrigin: 343.56,
              transformOrigin: 343.56,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <path
              d="M342.55 328.41a7.69 7.69 0 012.29-3.46 2.93 2.93 0 013.83.13q-1.12-3.43-2.38-6.83a10.56 10.56 0 00-2.78-4.68c-1.42-1.16-3.76-1.4-5 0a54.05 54.05 0 01.28 15.81c-.37 2.84-.85 6.1 1.06 8.23.53.43 1.45-.34 1.11-.93-.16-.28-.72-.3-1-.28a50.82 50.82 0 012.59-7.99z"
              style={{
                WebkitTransformOrigin: 343.56,
                msTransformOrigin: 343.56,
                transformOrigin: 343.56,
              }}
              fill="#FFF"
              className="animable"
              opacity="0.5"
            />
          </g>
          <path
            d="M326.59 323.67a28.27 28.27 0 00.54 5.74 7.14 7.14 0 003.2 4.61c-1-3.72-.46-7.67.08-11.48l1-7a5.17 5.17 0 01.71-2.32 1.8 1.8 0 012.11-.76c-1 .58-2.27-.2-2.87-1.18a29.42 29.42 0 00-1.53-3.08c-1.34-1.72-4.2-2.1-6.18-1.64.59 5.75 2.71 11.21 2.94 17.11z"
            style={{
              WebkitTransformOrigin: 328.94,
              msTransformOrigin: 328.94,
              transformOrigin: 328.94,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M326.59 323.67a28.27 28.27 0 00.54 5.74 7.14 7.14 0 003.2 4.61c-1-3.72-.46-7.67.08-11.48l1-7a5.17 5.17 0 01.71-2.32 1.8 1.8 0 012.11-.76c-1 .58-2.27-.2-2.87-1.18a29.42 29.42 0 00-1.53-3.08c-1.34-1.72-4.2-2.1-6.18-1.64.59 5.75 2.71 11.21 2.94 17.11z"
            style={{
              WebkitTransformOrigin: 328.94,
              msTransformOrigin: 328.94,
              transformOrigin: 328.94,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <g
              style={{
                WebkitTransformOrigin: 328.94,
                msTransformOrigin: 328.94,
                transformOrigin: 328.94,
              }}
              className="animable"
              opacity="0.5"
            >
              <path
                d="M326.59 323.67a28.27 28.27 0 00.54 5.74 7.14 7.14 0 003.2 4.61c-1-3.72-.46-7.67.08-11.48l1-7a5.17 5.17 0 01.71-2.32 1.8 1.8 0 012.11-.76c-1 .58-2.27-.2-2.87-1.18a29.42 29.42 0 00-1.53-3.08c-1.34-1.72-4.2-2.1-6.18-1.64.59 5.75 2.71 11.21 2.94 17.11z"
                style={{
                  WebkitTransformOrigin: 328.94,
                  msTransformOrigin: 328.94,
                  transformOrigin: 328.94,
                }}
                fill="#FFF"
                className="animable"
              />
            </g>
          </g>
          <path
            d="M310.27 308.25a3.51 3.51 0 01-1.06-2.1 3 3 0 00-1.17-2c-3.07 1.95-1.39 7.66-4.5 9.55-.6.37-1.37.58-1.7 1.2a1.58 1.58 0 00.33 1.76 3 3 0 001.7.8 6.85 6.85 0 006.54-2.84c1.22-1.68 2.06-4.38 1.46-6.37a1.54 1.54 0 01-1.6 0z"
            style={{
              WebkitTransformOrigin: 306.886,
              msTransformOrigin: 306.886,
              transformOrigin: 306.886,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M278.34 345.64c0 .21-.09.48.08.62s.61-.12.81-.4a5.35 5.35 0 015.95-1.93c.81 0 1.09-1.25.56-1.86a2.89 2.89 0 00-2.24-.72 4.36 4.36 0 01-2.36-.39 2.34 2.34 0 01-1-2.52c-.51 2.41-1.14 4.8-1.8 7.2z"
            style={{
              WebkitTransformOrigin: 282.164,
              msTransformOrigin: 282.164,
              transformOrigin: 282.164,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <g
              style={{
                WebkitTransformOrigin: 295.192,
                msTransformOrigin: 295.192,
                transformOrigin: 295.192,
              }}
              className="animable"
              opacity="0.5"
            >
              <path
                d="M310.27 308.25a3.51 3.51 0 01-1.06-2.1 3 3 0 00-1.17-2c-3.07 1.95-1.39 7.66-4.5 9.55-.6.37-1.37.58-1.7 1.2a1.58 1.58 0 00.33 1.76 3 3 0 001.7.8 6.85 6.85 0 006.54-2.84c1.22-1.68 2.06-4.38 1.46-6.37a1.54 1.54 0 01-1.6 0z"
                style={{
                  WebkitTransformOrigin: 306.886,
                  msTransformOrigin: 306.886,
                  transformOrigin: 306.886,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M278.34 345.64c0 .21-.09.48.08.62s.61-.12.81-.4a5.35 5.35 0 015.95-1.93c.81 0 1.09-1.25.56-1.86a2.89 2.89 0 00-2.24-.72 4.36 4.36 0 01-2.36-.39 2.34 2.34 0 01-1-2.52c-.51 2.41-1.14 4.8-1.8 7.2z"
                style={{
                  WebkitTransformOrigin: 282.164,
                  msTransformOrigin: 282.164,
                  transformOrigin: 282.164,
                }}
                fill="#FFF"
                className="animable"
              />
            </g>
          </g>
          <path
            d="M319.06 307.49c-1.75-.23-3.6-.28-5.13-1.17-1.9-1.12-3.21-3.5-5.42-3.6-2-.09-3.43 1.71-4.54 3.33a6.07 6.07 0 013.94-5.63 9.78 9.78 0 017.15.28 26.83 26.83 0 016.2 3.87 8.31 8.31 0 012.1 2c2.47 3.93-2.76 1.13-4.3.92z"
            style={{
              WebkitTransformOrigin: 313.991,
              msTransformOrigin: 313.991,
              transformOrigin: 313.991,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <path
              d="M319.06 307.49c-1.75-.23-3.6-.28-5.13-1.17-1.9-1.12-3.21-3.5-5.42-3.6-2-.09-3.43 1.71-4.54 3.33a6.07 6.07 0 013.94-5.63 9.78 9.78 0 017.15.28 26.83 26.83 0 016.2 3.87 8.31 8.31 0 012.1 2c2.47 3.93-2.76 1.13-4.3.92z"
              style={{
                WebkitTransformOrigin: 313.991,
                msTransformOrigin: 313.991,
                transformOrigin: 313.991,
              }}
              fill="#FFF"
              className="animable"
              opacity="0.5"
            />
          </g>
          <path
            d="M287.78 364.28a6.9 6.9 0 00.32-.67.76.76 0 00-.32.67z"
            style={{
              WebkitTransformOrigin: 287.939,
              msTransformOrigin: 287.939,
              transformOrigin: 287.939,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M290.75 348.79c-.2-2.46.15-4.94.05-7.41s-.75-5.07-2.55-6.77c-2.58-2.43-9.65-1.19-7.28 3.43a3 3 0 003.67 1.37 2.67 2.67 0 001.25-3.61 12.81 12.81 0 01-.61 14.56 11.62 11.62 0 012.82 13.25 1.46 1.46 0 011.65 0 5 5 0 011.27 2.26c.35.81 1 1.65 1.88 1.59 1.2-2.95.81-6.3 0-9.38s-1.9-6.08-2.15-9.29z"
            style={{
              WebkitTransformOrigin: 287.076,
              msTransformOrigin: 287.076,
              transformOrigin: 287.076,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M316.62 302.42a10 10 0 00-4.73-2z"
            style={{
              WebkitTransformOrigin: 314.255,
              msTransformOrigin: 314.255,
              transformOrigin: 314.255,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M328.38 333.71c-.38-1.7-1.17-3.28-1.64-5-1.09-3.91-.4-8.09-.9-12.12a20.92 20.92 0 00-7.43-13.45l-1.79-.76a10.09 10.09 0 013.6 5.24c1.39 4.78 1.82 9.76 2.44 14.7a197.1 197.1 0 004.15 22.68c1.19-3.68 2.4-7.54 1.57-11.29z"
            style={{
              WebkitTransformOrigin: 322.637,
              msTransformOrigin: 322.637,
              transformOrigin: 322.637,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M309.34 315.93a6.29 6.29 0 002.11-4.11 17 17 0 00-.11-4.22 1.4 1.4 0 01-1.58.95 3.55 3.55 0 01-1.89-1.72l-.36 1.25-.15-.68-.48.61c.71 2 1.4 4.33.3 6.16a7.23 7.23 0 01-2.25 2.08 3.8 3.8 0 004.41-.32z"
            style={{
              WebkitTransformOrigin: 308.231,
              msTransformOrigin: 308.231,
              transformOrigin: 308.231,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M311.28 307.1l.06.5a.8.8 0 00-.06-.5z"
            style={{
              WebkitTransformOrigin: 311.318,
              msTransformOrigin: 311.318,
              transformOrigin: 311.318,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M306.05 327.34c-3.5-6.89-7-13.78-10.87-20.48a66.25 66.25 0 00-7.64-11.17c-1.34-1.49-5.16-4.95-7.27-2.67-1.41 1.52.44 4.28-1.29 5.93.4 0 2.35-.19 2.56.07a30.41 30.41 0 016.71 19.39c1.41-1.11 3.35.43 4.45 1.85a326.39 326.39 0 0119 27.1c-1.14-4.13-1.17-8.52-2.39-12.62a45 45 0 00-3.26-7.4z"
            style={{
              WebkitTransformOrigin: 295.34,
              msTransformOrigin: 295.34,
              transformOrigin: 295.34,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M346.79 344.13a43.81 43.81 0 003.13-13.84 22.65 22.65 0 00-3.14-12.53c-.58-.93-3-4.77-4.29-4.46-2.35.56.73 4.64 1.27 5.66 2 3.85 4.11 7.92 4 12.27-.1 3.35-1.51 6.5-2.64 9.65a20.79 20.79 0 00-1.41 6.86c-.17.26-.33.53-.52.77a10.27 10.27 0 01-6.28 4.15c1-3 1.93-6 2.9-9 .35-1.07.47-2.53-.15-3.27a2.8 2.8 0 00.31-1.3 6.61 6.61 0 00-.85-2.3c-1.34-2.88-.89-6.23-.56-9.39.4-3.9.55-7.91-.59-11.66s-3.79-7.23-7.51-8.47l1 1-1.26-.92 2.34 4.88-.86 1.23c1.29-.68 2.94.3 3.53 1.63a8.58 8.58 0 01.29 4.31 86.2 86.2 0 001.18 24.26 11.78 11.78 0 01-1.44 5.33 5.25 5.25 0 01-5 2.71 5.26 5.26 0 00-1.93-5.33c-2 2.8-.82 7.15-.52 10.34a112.45 112.45 0 002.33 14.36 46.42 46.42 0 012.55-12q1.62 5.92 3.26 11.85a7 7 0 01.62-3.23 2.41 2.41 0 012.76-1.28 3.41 3.41 0 011.65 2.06 36.75 36.75 0 012 21.63c1.34.75 3.12-.15 3.87-1.49a9 9 0 00.71-4.5q-.41-19.97-.75-39.98z"
            style={{
              WebkitTransformOrigin: 338.556,
              msTransformOrigin: 338.556,
              transformOrigin: 338.556,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M312.89 348.36c-.64 1.12 2 5.58 2.41 6.64q3.3 8.07 6.61 16.15a76.45 76.45 0 00-5.12-20.68c-.45-1.11-2.63-4.34-3.9-2.11z"
            style={{
              WebkitTransformOrigin: 317.35,
              msTransformOrigin: 317.35,
              transformOrigin: 317.35,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M316.31 319.84c-.38.57-.91 1.27-1.56 1.07s-.72-1-.71-1.63q.1-5.61.19-11.23c-3 2.17-2.64 5-2.85 8.24-.12 1.87.42 10.8-.86 11.89a33.33 33.33 0 007.44-9.06c-.52-.43-1.28.15-1.65.72z"
            style={{
              WebkitTransformOrigin: 314.24,
              msTransformOrigin: 314.24,
              transformOrigin: 314.24,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <g
              style={{
                WebkitTransformOrigin: 314.461,
                msTransformOrigin: 314.461,
                transformOrigin: 314.461,
              }}
              className="animable"
              opacity="0.5"
            >
              <path
                d="M287.78 364.28a6.9 6.9 0 00.32-.67.76.76 0 00-.32.67z"
                style={{
                  WebkitTransformOrigin: 287.939,
                  msTransformOrigin: 287.939,
                  transformOrigin: 287.939,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M290.75 348.79c-.2-2.46.15-4.94.05-7.41s-.75-5.07-2.55-6.77c-2.58-2.43-9.65-1.19-7.28 3.43a3 3 0 003.67 1.37 2.67 2.67 0 001.25-3.61 12.81 12.81 0 01-.61 14.56 11.62 11.62 0 012.82 13.25 1.46 1.46 0 011.65 0 5 5 0 011.27 2.26c.35.81 1 1.65 1.88 1.59 1.2-2.95.81-6.3 0-9.38s-1.9-6.08-2.15-9.29z"
                style={{
                  WebkitTransformOrigin: 287.076,
                  msTransformOrigin: 287.076,
                  transformOrigin: 287.076,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M316.62 302.42a10 10 0 00-4.73-2z"
                style={{
                  WebkitTransformOrigin: 314.255,
                  msTransformOrigin: 314.255,
                  transformOrigin: 314.255,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M328.38 333.71c-.38-1.7-1.17-3.28-1.64-5-1.09-3.91-.4-8.09-.9-12.12a20.92 20.92 0 00-7.43-13.45l-1.79-.76a10.09 10.09 0 013.6 5.24c1.39 4.78 1.82 9.76 2.44 14.7a197.1 197.1 0 004.15 22.68c1.19-3.68 2.4-7.54 1.57-11.29z"
                style={{
                  WebkitTransformOrigin: 322.637,
                  msTransformOrigin: 322.637,
                  transformOrigin: 322.637,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M309.34 315.93a6.29 6.29 0 002.11-4.11 17 17 0 00-.11-4.22 1.4 1.4 0 01-1.58.95 3.55 3.55 0 01-1.89-1.72l-.36 1.25-.15-.68-.48.61c.71 2 1.4 4.33.3 6.16a7.23 7.23 0 01-2.25 2.08 3.8 3.8 0 004.41-.32z"
                style={{
                  WebkitTransformOrigin: 308.231,
                  msTransformOrigin: 308.231,
                  transformOrigin: 308.231,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M311.28 307.1l.06.5a.8.8 0 00-.06-.5z"
                style={{
                  WebkitTransformOrigin: 311.318,
                  msTransformOrigin: 311.318,
                  transformOrigin: 311.318,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M306.05 327.34c-3.5-6.89-7-13.78-10.87-20.48a66.25 66.25 0 00-7.64-11.17c-1.34-1.49-5.16-4.95-7.27-2.67-1.41 1.52.44 4.28-1.29 5.93.4 0 2.35-.19 2.56.07a30.41 30.41 0 016.71 19.39c1.41-1.11 3.35.43 4.45 1.85a326.39 326.39 0 0119 27.1c-1.14-4.13-1.17-8.52-2.39-12.62a45 45 0 00-3.26-7.4z"
                style={{
                  WebkitTransformOrigin: 295.34,
                  msTransformOrigin: 295.34,
                  transformOrigin: 295.34,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M346.79 344.13a43.81 43.81 0 003.13-13.84 22.65 22.65 0 00-3.14-12.53c-.58-.93-3-4.77-4.29-4.46-2.35.56.73 4.64 1.27 5.66 2 3.85 4.11 7.92 4 12.27-.1 3.35-1.51 6.5-2.64 9.65a20.79 20.79 0 00-1.41 6.86c-.17.26-.33.53-.52.77a10.27 10.27 0 01-6.28 4.15c1-3 1.93-6 2.9-9 .35-1.07.47-2.53-.15-3.27a2.8 2.8 0 00.31-1.3 6.61 6.61 0 00-.85-2.3c-1.34-2.88-.89-6.23-.56-9.39.4-3.9.55-7.91-.59-11.66s-3.79-7.23-7.51-8.47l1 1-1.26-.92 2.34 4.88-.86 1.23c1.29-.68 2.94.3 3.53 1.63a8.58 8.58 0 01.29 4.31 86.2 86.2 0 001.18 24.26 11.78 11.78 0 01-1.44 5.33 5.25 5.25 0 01-5 2.71 5.26 5.26 0 00-1.93-5.33c-2 2.8-.82 7.15-.52 10.34a112.45 112.45 0 002.33 14.36 46.42 46.42 0 012.55-12q1.62 5.92 3.26 11.85a7 7 0 01.62-3.23 2.41 2.41 0 012.76-1.28 3.41 3.41 0 011.65 2.06 36.75 36.75 0 012 21.63c1.34.75 3.12-.15 3.87-1.49a9 9 0 00.71-4.5q-.41-19.97-.75-39.98z"
                style={{
                  WebkitTransformOrigin: 338.556,
                  msTransformOrigin: 338.556,
                  transformOrigin: 338.556,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M312.89 348.36c-.64 1.12 2 5.58 2.41 6.64q3.3 8.07 6.61 16.15a76.45 76.45 0 00-5.12-20.68c-.45-1.11-2.63-4.34-3.9-2.11z"
                style={{
                  WebkitTransformOrigin: 317.35,
                  msTransformOrigin: 317.35,
                  transformOrigin: 317.35,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M316.31 319.84c-.38.57-.91 1.27-1.56 1.07s-.72-1-.71-1.63q.1-5.61.19-11.23c-3 2.17-2.64 5-2.85 8.24-.12 1.87.42 10.8-.86 11.89a33.33 33.33 0 007.44-9.06c-.52-.43-1.28.15-1.65.72z"
                style={{
                  WebkitTransformOrigin: 314.24,
                  msTransformOrigin: 314.24,
                  transformOrigin: 314.24,
                }}
                fill="#FFF"
                className="animable"
              />
            </g>
          </g>
        </g>
        <path
          d="M324 307.59a78.74 78.74 0 012.72 20 10.81 10.81 0 00.36 3.36 3.34 3.34 0 002.29 2.29"
          style={{
            WebkitTransformOrigin: 326.685,
            msTransformOrigin: 326.685,
            transformOrigin: 326.685,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M338.11 314.16c3 6.26-.07 20.25.15 21.23a3.53 3.53 0 001.69 2.4"
          style={{
            WebkitTransformOrigin: 339.03,
            msTransformOrigin: 339.03,
            transformOrigin: 339.03,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M312.33 306.74c-.35 2-.64 4.29-1 6.28a11.54 11.54 0 01-4-8"
          style={{
            WebkitTransformOrigin: 309.83,
            msTransformOrigin: 309.83,
            transformOrigin: 309.83,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M293.17 360.09L291 361"
          style={{
            WebkitTransformOrigin: 292.085,
            msTransformOrigin: 292.085,
            transformOrigin: 292.085,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M293.72 361.82a12.5 12.5 0 000 5.06"
          style={{
            WebkitTransformOrigin: 293.591,
            msTransformOrigin: 293.591,
            transformOrigin: 293.591,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M306.36 343.14c.8 1.43 1.59 2.87 2.39 4.31"
          style={{
            WebkitTransformOrigin: 307.555,
            msTransformOrigin: 307.555,
            transformOrigin: 307.555,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M311 327.36l2.38-3.36"
          style={{
            WebkitTransformOrigin: 312.19,
            msTransformOrigin: 312.19,
            transformOrigin: 312.19,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M344.43 343.14l-.72 2.63"
          style={{
            WebkitTransformOrigin: 344.07,
            msTransformOrigin: 344.07,
            transformOrigin: 344.07,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M338.61 335.93q1-3.36 2.11-6.72"
          style={{
            WebkitTransformOrigin: 339.665,
            msTransformOrigin: 339.665,
            transformOrigin: 339.665,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M345.65 324a2.71 2.71 0 013.64 1.13"
          style={{
            WebkitTransformOrigin: 347.47,
            msTransformOrigin: 347.47,
            transformOrigin: 347.47,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M331.28 312.53a5.17 5.17 0 014.81 1.1"
          style={{
            WebkitTransformOrigin: 333.685,
            msTransformOrigin: 333.685,
            transformOrigin: 333.685,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M286.74 319.2a7.31 7.31 0 016.2-2.34"
          style={{
            WebkitTransformOrigin: 289.84,
            msTransformOrigin: 289.84,
            transformOrigin: 289.84,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M277.71 300.34a6.7 6.7 0 015-1.18"
          style={{
            WebkitTransformOrigin: 280.21,
            msTransformOrigin: 280.21,
            transformOrigin: 280.21,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M279.57 345.09a12.76 12.76 0 00-2.93 3.29z"
          style={{
            WebkitTransformOrigin: 278.105,
            msTransformOrigin: 278.105,
            transformOrigin: 278.105,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M280.53 340.55c1.58-1.13 4.1 1.39 5.55.1a2.3 2.3 0 00.49-2.16 7.5 7.5 0 01-.29-2.29"
          style={{
            WebkitTransformOrigin: 283.595,
            msTransformOrigin: 283.595,
            transformOrigin: 283.595,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M325.12 333.61a18.11 18.11 0 011.1 12.82"
          style={{
            WebkitTransformOrigin: 326.017,
            msTransformOrigin: 326.017,
            transformOrigin: 326.017,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M336.74 339.78a8.33 8.33 0 01-1 5.5"
          style={{
            WebkitTransformOrigin: 336.295,
            msTransformOrigin: 336.295,
            transformOrigin: 336.295,
          }}
          fill="none"
          className="animable"
        />
        <path
          d="M321.11 436.09l-10.44-32.86c-9.8-10.09-27.8-19.32-29.36-33.3-2-17.94-4.77-17.21-4.77-21.67a54.48 54.48 0 002.76-6.8 37.51 37.51 0 001-5.41 3.64 3.64 0 013.84-3.12 6.17 6.17 0 013.49 1.36 9.38 9.38 0 013 6.31 27.5 27.5 0 01-.53 7.12 46 46 0 013.83 12.18c.85-3.36 1.44-6.73 2.28-10.09.22-.13.12-.39.32-.53-1.72-3.12-.44-3-3.89-9.95-5.81-11.64-12.18-22.81-17.19-37.59a8.7 8.7 0 01-.19-4.24c1.17-4.39 5.66-3.7 7.76-1.32a8.5 8.5 0 011.35 2.09 114.51 114.51 0 0010.77 17.78l12 15.83s3.58-3.35 4.07-4.78h0c.47-1.43 0-12.69 0-12.69s-.72 2.16-2.63 2.16c-1.38 0-4.12 1-6.26-1.12a5.21 5.21 0 01-.61-6.52l4.47-7a7.49 7.49 0 017.66-1.44 36.61 36.61 0 019.1 5.51 17.87 17.87 0 017.66 1c3.6 1.45 7.57 6 7.57 6s4.07 0 6 1.17c.48.3 7.32 9.54 5.58 17.2-1 4.57-1.41 11.13-1.89 12.91l-.12 44.21 8.26 29.3"
          style={{
            WebkitTransformOrigin: 315.542,
            msTransformOrigin: 315.542,
            transformOrigin: 315.542,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M324 307.59a78.74 78.74 0 012.72 20 10.81 10.81 0 00.36 3.36 3.34 3.34 0 002.29 2.29"
          style={{
            WebkitTransformOrigin: 326.685,
            msTransformOrigin: 326.685,
            transformOrigin: 326.685,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M338.11 314.16c3 6.26-.07 20.25.15 21.23a3.53 3.53 0 001.69 2.4"
          style={{
            WebkitTransformOrigin: 339.03,
            msTransformOrigin: 339.03,
            transformOrigin: 339.03,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M312.33 306.74c-.35 2-.64 4.29-1 6.28a11.54 11.54 0 01-4-8"
          style={{
            WebkitTransformOrigin: 309.83,
            msTransformOrigin: 309.83,
            transformOrigin: 309.83,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M293.17 360.09L291 361"
          style={{
            WebkitTransformOrigin: 292.085,
            msTransformOrigin: 292.085,
            transformOrigin: 292.085,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M293.72 361.82a12.5 12.5 0 000 5.06"
          style={{
            WebkitTransformOrigin: 293.591,
            msTransformOrigin: 293.591,
            transformOrigin: 293.591,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M306.36 343.14c.8 1.43 1.59 2.87 2.39 4.31"
          style={{
            WebkitTransformOrigin: 307.555,
            msTransformOrigin: 307.555,
            transformOrigin: 307.555,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M311 327.36l2.38-3.36"
          style={{
            WebkitTransformOrigin: 312.19,
            msTransformOrigin: 312.19,
            transformOrigin: 312.19,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M344.43 343.14l-.72 2.63"
          style={{
            WebkitTransformOrigin: 344.07,
            msTransformOrigin: 344.07,
            transformOrigin: 344.07,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M338.61 335.93q1-3.36 2.11-6.72"
          style={{
            WebkitTransformOrigin: 339.665,
            msTransformOrigin: 339.665,
            transformOrigin: 339.665,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M345.65 324a2.71 2.71 0 013.64 1.13"
          style={{
            WebkitTransformOrigin: 347.47,
            msTransformOrigin: 347.47,
            transformOrigin: 347.47,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M331.28 312.53a5.17 5.17 0 014.81 1.1"
          style={{
            WebkitTransformOrigin: 333.685,
            msTransformOrigin: 333.685,
            transformOrigin: 333.685,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M286.74 319.2a7.31 7.31 0 016.2-2.34"
          style={{
            WebkitTransformOrigin: 289.84,
            msTransformOrigin: 289.84,
            transformOrigin: 289.84,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M277.71 300.34a6.7 6.7 0 015-1.18"
          style={{
            WebkitTransformOrigin: 280.21,
            msTransformOrigin: 280.21,
            transformOrigin: 280.21,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M279.57 345.09a12.76 12.76 0 00-2.93 3.29"
          style={{
            WebkitTransformOrigin: 278.105,
            msTransformOrigin: 278.105,
            transformOrigin: 278.105,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M280.53 340.55c1.58-1.13 4.1 1.39 5.55.1a2.3 2.3 0 00.49-2.16 7.5 7.5 0 01-.29-2.29"
          style={{
            WebkitTransformOrigin: 283.595,
            msTransformOrigin: 283.595,
            transformOrigin: 283.595,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M325.12 333.61a18.11 18.11 0 011.1 12.82"
          style={{
            WebkitTransformOrigin: 326.017,
            msTransformOrigin: 326.017,
            transformOrigin: 326.017,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M336.74 339.78a8.33 8.33 0 01-1 5.5"
          style={{
            WebkitTransformOrigin: 336.295,
            msTransformOrigin: 336.295,
            transformOrigin: 336.295,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <g>
          <path
            d="M240.05 354.79a6.06 6.06 0 01-.09 2.08c-.65 3-2.53 11.78-3.22 16.58-.82 5.86-10.29 24-10.29 24s-8.72 10.84-13.16 16.48c-2.18 2.77-5.63 14-8.56 24.66q-5.55-1.68-11-3.62c-3-1.07-6-2.2-9-3.37a147.09 147.09 0 01-15.62-7.6c1.66-6 2.77-10.67 2.75-10.94-.05-.63 3.56-7.58 3.56-7.58L172.27 364l-1.86-6.31a47.39 47.39 0 01-1.83-10 48.34 48.34 0 011.29-15.33l5.43-8.06 2.54-.19 7.86-11s4.25-1.28 5.34 1.92-3.54 9.18-3.54 9.18l-1.59 9.87 3.78 9.24 2 .72s.66-16.27.21-19.52l4.1-14.79a70.54 70.54 0 003.26-7.46c.76-2.49 5.23-5 7.8-.59a6.43 6.43 0 01.4 5.27c-1.05 3.05-1.92 5.45-1.92 5.45s-1 12.58-1.25 12.93 1.85 18.73 1.85 18.73l1.64.73.58-17.55 3.41-16.49s-.28-7.93 5.31-7a4.32 4.32 0 014.11 2.56c1.49 2.85.07 21.83.07 21.83l1.38 19.62 2.21 15.13 2.6-10.37s.15-14.86 9.53-16.13c0 0 2.79-.5 3.36 1.44s-1.39 5.9-1.11 9.7c.25 2.7.63 5.71.82 7.26z"
            style={{
              WebkitTransformOrigin: 204.443,
              msTransformOrigin: 204.443,
              transformOrigin: 204.443,
            }}
            className="animable"
            opacity="0.2"
          />
        </g>
        <path
          d="M237.2 336.42c-.43-2-3.24-1.69-3.24-1.69-9.45.56-10.72 15.37-10.72 15.37l-3.39 10.14-1-15.26.1-19.67s2.86-18.82 1.59-21.77a4.31 4.31 0 00-3.91-2.86c-5.5-1.38-5.82 6.55-5.82 6.55l-4.64 16.18-1.91 17.45-1.58-.84s-.75-18.52-.43-18.83 2.22-12.79 2.22-12.79 1.05-2.33 2.33-5.29a6.43 6.43 0 000-5.29c-2.23-4.54-6.87-2.42-7.83 0a70.39 70.39 0 01-3.8 7.19l-5.3 14.49c.2 3.28-1.68 19.46-1.68 19.46l-1.91-.87-3.07-9.5 2.34-9.73s5.07-5.6 4.22-8.88-5.18-2.32-5.18-2.32L175.88 318h-2.55l-6 7.61a48.27 48.27 0 00-1.38 25.29l1.38 6.43v41.56s-4.12 6.66-4.12 7.29c0 .29-1.7 5.54-4.07 12.09 10.37 6.1 19.3 10.82 25.63 13.31 3 1.18 6 2.3 9 3.37 3.8-10.67 8.24-22.08 10.69-24.75 4.86-5.28 14.38-15.44 14.38-15.44s10.81-17.37 12.08-23.14c1-4.74 3.58-13.35 4.46-16.3a5.77 5.77 0 00.24-2.07c-.07-1.56-.22-4.59-.22-7.26-.04-3.79 2.22-7.6 1.8-9.57z"
          style={{
            WebkitTransformOrigin: 198.196,
            msTransformOrigin: 198.196,
            transformOrigin: 198.196,
          }}
          fill="#FFF"
          className="animable"
        />
        <g
          style={{
            WebkitTransformOrigin: 200.264,
            msTransformOrigin: 200.264,
            transformOrigin: 200.264,
          }}
          className="animable"
          clipPath='url("#freepik--clip-path-2--inject-11")'
        >
          <path
            d="M172.3 332.24c1.62-2 4.94-2.79 6.82-1a7.17 7.17 0 011.71 4 8.53 8.53 0 001.51 4.12c1 1.13 2.89 1.57 3.9.49.14 2.19.27 4.38.41 6.57a26.05 26.05 0 003.44-13.42c0-2.27-.39-4.58.14-6.8s2.24-4.36 4.52-4.47c2.52-.11 4.51 2.34 5 4.82s-.08 5-.23 7.54a22.94 22.94 0 002.16 11.21l1.59-3.22c.48 2.16 1 4.31 1.43 6.46l1.24-14.21a10.36 10.36 0 01.87-3.9 3.46 3.46 0 013.21-2c1.8.18 2.84 2.1 3.44 3.8 4.51 12.75 2.65 26.74.74 40.12 1.25.23 2.31-1 2.62-2.27a29 29 0 01.67-3.74c.47-1.19 1.91-2.16 3-1.48 1.58 1 .48 4.06 2.13 4.91a22.82 22.82 0 014.53-10.93c1.11-1.44 2.77-2.87 4.53-2.41a3.56 3.56 0 012.37 3c.19 1.34 2.13-4.2 1.79-2.89.76-7.71-.76-8.52 0-16.24.14-1.39 2.39-3.8 1.43-4.82s-3.63-2.4-4.84-1.84-5.13 2.52-5.91 3.59c-4.92 6.79-4.58 16.61-6.11 24.85-1.31-12.56-2.6-25.33-.3-37.74 1.27-6.85 3.61-14 1.4-20.59-1-3-3.69-6-6.82-5.46-2.52.46-4 3-5.07 5.36-3.44 7.9-5 16.48-6.48 25l5.62-25.65a17.35 17.35 0 00.58-6.74c-.41-2.24-1.94-4.43-4.16-4.9s-4.4.84-6.06 2.36c-6 5.44-8.16 13.74-10.1 21.56a15.52 15.52 0 001.16-6.31c-.21-2.14-1.57-4.32-3.67-4.79-2.73-.59-5.2 1.84-6.4 4.35s-1.78 5.42-3.69 7.45c-1.39-1.56-4-1.47-5.74-.31a11.09 11.09 0 00-3.65 5 46.52 46.52 0 00-3.87 22.48 8.23 8.23 0 018.21-4.68c-.2-1.7-.39-3.4-.59-5.11"
            style={{
              WebkitTransformOrigin: 200.264,
              msTransformOrigin: 200.264,
              transformOrigin: 200.264,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M178.89 348.51c-.09 1.26-.17 2.52-.26 3.78a1.82 1.82 0 012.77-.7 4.14 4.14 0 01.63-2.34c.32-.76.35-1.84-.39-2.2s-1.74.58-2.21 1.44c0-.31-.07-.62-.11-.94z"
            style={{
              WebkitTransformOrigin: 180.437,
              msTransformOrigin: 180.437,
              transformOrigin: 180.437,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M193.23 346.25a8.84 8.84 0 00-2 4.18 4.31 4.31 0 011.47-1.08 1.48 1.48 0 011.66.38c.22.3.3.74.64.91a.79.79 0 001-.36 2.28 2.28 0 00.25-1.1 6.08 6.08 0 00-.12-2.17 2.11 2.11 0 00-1.44-1.51 1.3 1.3 0 00-1.57 1.1z"
            style={{
              WebkitTransformOrigin: 193.764,
              msTransformOrigin: 193.764,
              transformOrigin: 193.764,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M207.12 349.69a11.36 11.36 0 00-2.1 5 4.38 4.38 0 001.95-1.05 3.86 3.86 0 012-1 1.39 1.39 0 011.55 1.22 9.41 9.41 0 01.08-2.54 5.35 5.35 0 00-.18-2.52 2.13 2.13 0 00-1.93-1.42 1.34 1.34 0 00-1.18 1.8z"
            style={{
              WebkitTransformOrigin: 207.847,
              msTransformOrigin: 207.847,
              transformOrigin: 207.847,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <path
            d="M168.91 354.71a10 10 0 00-1.17 4.7 1.64 1.64 0 011.47-1.46 3.28 3.28 0 012.13.57 5.78 5.78 0 00.14-2.3 2 2 0 00-1.46-1.6c-.77-.12-1.61.61-1.4 1.35l-.23-.57z"
            style={{
              WebkitTransformOrigin: 169.638,
              msTransformOrigin: 169.638,
              transformOrigin: 169.638,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <path
              d="M172.3 332.24c1.62-2 4.94-2.79 6.82-1a7.17 7.17 0 011.71 4 8.53 8.53 0 001.51 4.12c1 1.13 2.89 1.57 3.9.49.14 2.19.27 4.38.41 6.57a26.05 26.05 0 003.44-13.42c0-2.27-.39-4.58.14-6.8s2.24-4.36 4.52-4.47c2.52-.11 4.51 2.34 5 4.82s-.08 5-.23 7.54a22.94 22.94 0 002.16 11.21l1.59-3.22c.48 2.16 1 4.31 1.43 6.46l1.24-14.21a10.36 10.36 0 01.87-3.9 3.46 3.46 0 013.21-2c1.8.18 2.84 2.1 3.44 3.8 4.51 12.75 2.65 26.74.74 40.12 1.25.23 2.31-1 2.62-2.27a29 29 0 01.67-3.74c.47-1.19 1.91-2.16 3-1.48 1.58 1 .48 4.06 2.13 4.91a22.82 22.82 0 014.53-10.93c1.11-1.44 2.77-2.87 4.53-2.41a3.56 3.56 0 012.37 3c.19 1.34 2.13-4.2 1.79-2.89.76-7.71-.76-8.52 0-16.24.14-1.39 2.39-3.8 1.43-4.82s-3.63-2.4-4.84-1.84-5.13 2.52-5.91 3.59c-4.92 6.79-4.58 16.61-6.11 24.85-1.31-12.56-2.6-25.33-.3-37.74 1.27-6.85 3.61-14 1.4-20.59-1-3-3.69-6-6.82-5.46-2.52.46-4 3-5.07 5.36-3.44 7.9-5 16.48-6.48 25l5.62-25.65a17.35 17.35 0 00.58-6.74c-.41-2.24-1.94-4.43-4.16-4.9s-4.4.84-6.06 2.36c-6 5.44-8.16 13.74-10.1 21.56a15.52 15.52 0 001.16-6.31c-.21-2.14-1.57-4.32-3.67-4.79-2.73-.59-5.2 1.84-6.4 4.35s-1.78 5.42-3.69 7.45c-1.39-1.56-4-1.47-5.74-.31a11.09 11.09 0 00-3.65 5 46.52 46.52 0 00-3.87 22.48 8.23 8.23 0 018.21-4.68c-.2-1.7-.39-3.4-.59-5.11"
              style={{
                WebkitTransformOrigin: 200.264,
                msTransformOrigin: 200.264,
                transformOrigin: 200.264,
              }}
              fill="#FFF"
              className="animable"
              opacity="0.5"
            />
          </g>
          <g>
            <g
              style={{
                WebkitTransformOrigin: 189.207,
                msTransformOrigin: 189.207,
                transformOrigin: 189.207,
              }}
              className="animable"
              opacity="0.5"
            >
              <path
                d="M178.89 348.51c-.09 1.26-.17 2.52-.26 3.78a1.82 1.82 0 012.77-.7 4.14 4.14 0 01.63-2.34c.32-.76.35-1.84-.39-2.2s-1.74.58-2.21 1.44c0-.31-.07-.62-.11-.94z"
                style={{
                  WebkitTransformOrigin: 180.437,
                  msTransformOrigin: 180.437,
                  transformOrigin: 180.437,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M193.23 346.25a8.84 8.84 0 00-2 4.18 4.31 4.31 0 011.47-1.08 1.48 1.48 0 011.66.38c.22.3.3.74.64.91a.79.79 0 001-.36 2.28 2.28 0 00.25-1.1 6.08 6.08 0 00-.12-2.17 2.11 2.11 0 00-1.44-1.51 1.3 1.3 0 00-1.57 1.1z"
                style={{
                  WebkitTransformOrigin: 193.764,
                  msTransformOrigin: 193.764,
                  transformOrigin: 193.764,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M207.12 349.69a11.36 11.36 0 00-2.1 5 4.38 4.38 0 001.95-1.05 3.86 3.86 0 012-1 1.39 1.39 0 011.55 1.22 9.41 9.41 0 01.08-2.54 5.35 5.35 0 00-.18-2.52 2.13 2.13 0 00-1.93-1.42 1.34 1.34 0 00-1.18 1.8z"
                style={{
                  WebkitTransformOrigin: 207.847,
                  msTransformOrigin: 207.847,
                  transformOrigin: 207.847,
                }}
                fill="#FFF"
                className="animable"
              />
              <path
                d="M168.91 354.71a10 10 0 00-1.17 4.7 1.64 1.64 0 011.47-1.46 3.28 3.28 0 012.13.57 5.78 5.78 0 00.14-2.3 2 2 0 00-1.46-1.6c-.77-.12-1.61.61-1.4 1.35l-.23-.57z"
                style={{
                  WebkitTransformOrigin: 169.638,
                  msTransformOrigin: 169.638,
                  transformOrigin: 169.638,
                }}
                fill="#FFF"
                className="animable"
              />
            </g>
          </g>
        </g>
        <path
          d="M159.11 418.29c2.37-6.55 4.07-11.8 4.07-12.09 0-.63 4.12-7.29 4.12-7.29v-41.56l-1.38-6.43a48.27 48.27 0 011.38-25.29l6-7.61h2.55l8.66-10.36s4.34-1 5.18 2.32-4.22 8.88-4.22 8.88l-2.34 9.73 3.07 9.5 1.91.87s1.88-16.18 1.68-19.46l5.3-14.49a70.39 70.39 0 003.8-7.19c1-2.42 5.6-4.54 7.83 0a6.43 6.43 0 010 5.29c-1.28 3-2.33 5.29-2.33 5.29s-1.9 12.47-2.22 12.79.43 18.83.43 18.83l1.58.84 1.91-17.45 4.64-16.18s.32-7.93 5.82-6.55a4.31 4.31 0 013.91 2.86c1.27 2.95-1.59 21.77-1.59 21.77L218.8 345l1 15.26 3.39-10.14s1.27-14.81 10.72-15.37c0 0 2.81-.29 3.24 1.69s-1.84 5.78-1.84 9.59c0 2.67.15 5.7.22 7.26a5.77 5.77 0 01-.24 2.07c-.88 3-3.42 11.56-4.46 16.3-1.27 5.77-12.08 23.14-12.08 23.14s-9.52 10.16-14.38 15.44c-2.45 2.67-6.89 14.08-10.69 24.75"
          style={{
            WebkitTransformOrigin: 198.157,
            msTransformOrigin: 198.157,
            transformOrigin: 198.157,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M188 340.52a6 6 0 01-1.42 5.7"
          style={{
            WebkitTransformOrigin: 187.397,
            msTransformOrigin: 187.397,
            transformOrigin: 187.397,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M171.84 354.5c1.37-2.12 2.71-5.05 2.34-7.55-.72-4.91-3-10.56-2-15.42.64-3.1 1.28-6.21 1.93-9.31"
          style={{
            WebkitTransformOrigin: 173.041,
            msTransformOrigin: 173.041,
            transformOrigin: 173.041,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M211.71 308.12a9.81 9.81 0 015 0c0-.47 0-.93.05-1.4"
          style={{
            WebkitTransformOrigin: 214.235,
            msTransformOrigin: 214.235,
            transformOrigin: 214.235,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M198.58 301.88a3.2 3.2 0 005-2.67"
          style={{
            WebkitTransformOrigin: 201.08,
            msTransformOrigin: 201.08,
            transformOrigin: 201.08,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M234.72 336.59a6.13 6.13 0 00-4.59 6.33l2.45.74"
          style={{
            WebkitTransformOrigin: 232.419,
            msTransformOrigin: 232.419,
            transformOrigin: 232.419,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M202.54 337.81c.11 1.68-.1 5.69 0 7.37"
          style={{
            WebkitTransformOrigin: 202.542,
            msTransformOrigin: 202.542,
            transformOrigin: 202.542,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M204.38 340.14q-.3 4.11-.61 8.24v-1.05"
          style={{
            WebkitTransformOrigin: 204.075,
            msTransformOrigin: 204.075,
            transformOrigin: 204.075,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M219.64 363.31a13.74 13.74 0 01-.94 9.06"
          style={{
            WebkitTransformOrigin: 219.358,
            msTransformOrigin: 219.358,
            transformOrigin: 219.358,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M194.29 348.9c-2.18 2.39-1.86 8.13-.32 11.28"
          style={{
            WebkitTransformOrigin: 193.513,
            msTransformOrigin: 193.513,
            transformOrigin: 193.513,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M210.4 352.85a11.23 11.23 0 01-2.67 7.33"
          style={{
            WebkitTransformOrigin: 209.065,
            msTransformOrigin: 209.065,
            transformOrigin: 209.065,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M178.41 350a10.22 10.22 0 001.49 7"
          style={{
            WebkitTransformOrigin: 179.099,
            msTransformOrigin: 179.099,
            transformOrigin: 179.099,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M169.13 357.51a8.53 8.53 0 001.54 5.34"
          style={{
            WebkitTransformOrigin: 169.894,
            msTransformOrigin: 169.894,
            transformOrigin: 169.894,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M181.85 311.41a3.17 3.17 0 013.5.56l1.23-1.63"
          style={{
            WebkitTransformOrigin: 184.215,
            msTransformOrigin: 184.215,
            transformOrigin: 184.215,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M192.11 318.75a4.16 4.16 0 015.29.89"
          style={{
            WebkitTransformOrigin: 194.755,
            msTransformOrigin: 194.755,
            transformOrigin: 194.755,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M208.13 323.75a6.7 6.7 0 015.69.12"
          style={{
            WebkitTransformOrigin: 210.975,
            msTransformOrigin: 210.975,
            transformOrigin: 210.975,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M172.48 332.14a5.41 5.41 0 015.24-2.6"
          style={{
            WebkitTransformOrigin: 175.1,
            msTransformOrigin: 175.1,
            transformOrigin: 175.1,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M165.77 341.7a2.84 2.84 0 012.37-2.66"
          style={{
            WebkitTransformOrigin: 166.955,
            msTransformOrigin: 166.955,
            transformOrigin: 166.955,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
      </g>
      <g
        id="freepik--Coffee--inject-11"
        style={{
          WebkitTransformOrigin: 429.49,
          msTransformOrigin: 429.49,
          transformOrigin: 429.49,
        }}
        className="animable"
      >
        <circle
          cx="423.44"
          cy="228.39"
          r="41.45"
          style={{
            WebkitTransformOrigin: 423.44,
            msTransformOrigin: 423.44,
            transformOrigin: 423.44,
          }}
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <g>
          <path
            d="M470.36 229.48c-8.84 14.49-12 12.53-42.12 27-15.31 7.34-30.1-16.23-20.09-40.42.49-1.18 4.81-7.15 4.81-7.15a22.08 22.08 0 0138.58-9.12 23.84 23.84 0 0121.18-5.06c.35 1 .68 2 1 3 .12.38.25.75.36 1.13.38 1.17.74 2.34 1.07 3.52q1 3.36 1.84 6.76a13.55 13.55 0 00-9.84.59c-2.21 1.08-4.06 2.86-6.36 3.74s-5.48.38-6.36-1.92c1.11 4.62 6 3.24 10.62 4.15 7.2 1.39 9.03 7.68 5.31 13.78z"
            style={{
              WebkitTransformOrigin: 440.936,
              msTransformOrigin: 440.936,
              transformOrigin: 440.936,
            }}
            className="animable"
            opacity="0.2"
          />
        </g>
        <path
          d="M456.75 222.33s7.42-1 10.94-.47a6.75 6.75 0 014.31 2.44 2.37 2.37 0 01.51 1.33l.4 5.8a2.37 2.37 0 01-.64 1.79c-1.45 1.51-5.82 4.26-18.76 5.25-18.23 1.39 3.24-16.14 3.24-16.14z"
          style={{
            WebkitTransformOrigin: 459.543,
            msTransformOrigin: 459.543,
            transformOrigin: 459.543,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M451.32 207.34A27.69 27.69 0 01457.4 225c0 6.91-8 30.51-28.49 33.39-21.69 3-39.13-15.52-35.41-37.86 2.58-15.48 40.41-34.83 57.82-13.19z"
          style={{
            WebkitTransformOrigin: 425.2,
            msTransformOrigin: 425.2,
            transformOrigin: 425.2,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <ellipse
          cx="424.82"
          cy="223.41"
          fill="#FFF"
          rx="31.47"
          ry="29.79"
          style={{
            WebkitTransformOrigin: 424.82,
            msTransformOrigin: 424.82,
            transformOrigin: 424.82,
          }}
          className="animable"
        />
        <ellipse
          cx="424.76"
          cy="224.97"
          fill="#263238"
          rx="25.84"
          ry="24.45"
          style={{
            WebkitTransformOrigin: 424.76,
            msTransformOrigin: 424.76,
            transformOrigin: 424.76,
          }}
          className="animable"
        />
        <path
          d="M456.29 223.41c0-16.45-14.09-29.78-31.47-29.78s-31.47 13.37-31.47 29.78"
          style={{
            WebkitTransformOrigin: 424.82,
            msTransformOrigin: 424.82,
            transformOrigin: 424.82,
          }}
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M448 243.57a28.79 28.79 0 008.3-20.16"
          style={{
            WebkitTransformOrigin: 452.15,
            msTransformOrigin: 452.15,
            transformOrigin: 452.15,
          }}
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M402.78 244.67a32.28 32.28 0 0022 8.53 32.85 32.85 0 0014.61-3.39"
          style={{
            WebkitTransformOrigin: 421.085,
            msTransformOrigin: 421.085,
            transformOrigin: 421.085,
          }}
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M398.24 239.36c.41.62.85 1.22 1.3 1.8"
          style={{
            WebkitTransformOrigin: 398.89,
            msTransformOrigin: 398.89,
            transformOrigin: 398.89,
          }}
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M393.35 223.41a28.39 28.39 0 003 12.71"
          style={{
            WebkitTransformOrigin: 394.85,
            msTransformOrigin: 394.85,
            transformOrigin: 394.85,
          }}
          fill="none"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M471 231.57s-5.61-3.93-14.72-.37"
          style={{
            WebkitTransformOrigin: 463.64,
            msTransformOrigin: 463.64,
            transformOrigin: 463.64,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M466.18 234.29a57.1 57.1 0 01-11.64 1.83"
          style={{
            WebkitTransformOrigin: 460.36,
            msTransformOrigin: 460.36,
            transformOrigin: 460.36,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M469.09 233.05a5.44 5.44 0 01-1.4.73"
          style={{
            WebkitTransformOrigin: 468.39,
            msTransformOrigin: 468.39,
            transformOrigin: 468.39,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M474.08 198.83c-.11-.38-.24-.75-.36-1.13-1.91-5.92-4.37-12.42-7.36-19.28-.55-1.27-1.13-2.56-1.71-3.86l-.67.06c-2.87.29-5.89.65-8.25 2.28s-3.77 5.07-2.24 7.52 5.43 3.78 4.81 6.55c-6.41 3.61-14.23 3.19-21.36 5A34.78 34.78 0 00425 201.6a36.71 36.71 0 00-3.24 2.72 12.81 12.81 0 00-1.32 1.42 4.89 4.89 0 00-1.13 2.54c-.25 2.67 2.18 4.49 4.77 5.65a.58.58 0 010 1.08 14.9 14.9 0 00-4.67 2.7 1.16 1.16 0 001 2h.4a7.55 7.55 0 013 .36 3.63 3.63 0 012.71 2.86c.16 2-2.15 3.86-5.15 4.09-.73.07-.17.94.9 1.12a16 16 0 006.4-.52c2.51-.6 5.19-1.47 6.61-3.62a4.52 4.52 0 00.6-3.18 3.22 3.22 0 00-2.66-2.92 87.49 87.49 0 0013.72-2.75l1.41-.43a13.16 13.16 0 003.87-1.69 5.39 5.39 0 001.69-1.86c1-2-.43-5.19-2.65-4.77 6.45-2.53 13.27-4 19.79-6.34.95-.39 2.01-.79 3.03-1.23z"
          style={{
            WebkitTransformOrigin: 446.553,
            msTransformOrigin: 446.553,
            transformOrigin: 446.553,
          }}
          fill="#FFF"
          className="animable"
        />
      </g>
      <g
        id="freepik--Monitor--inject-11"
        style={{
          WebkitTransformOrigin: 261.009,
          msTransformOrigin: 261.009,
          transformOrigin: 261.009,
        }}
        className="animable"
      >
        <g>
          <path
            d="M424.64 112.33a127 127 0 01-19.9 14c-36.41 21.54-77.54 34.44-119.38 40.73s-84.44 6.1-126.6 2.63c-8.28-.68-16.7-1.52-24.31-4.86-6.45-2.84-12.3-7.78-15-14.17 9.13-10.4 17.62-20.92 27.07-30.85q3.38-3.55 6.92-7c2-1.91 4-3.79 6.14-5.63 2.42-2.07 4.85-4.18 7.42-6.18 3.55-2.76 7.29-5.41 11.29-7.94 1-.63 2-1.24 2.93-1.84 99.71-62 173.1-41.74 222.06 0Q408.85 96 414 101c2.08 2 4.09 4.09 6 6.19.22.22.42.45.63.69q2.07 2.23 4.01 4.45z"
            style={{
              WebkitTransformOrigin: 272.045,
              msTransformOrigin: 272.045,
              transformOrigin: 272.045,
            }}
            className="animable"
            opacity="0.2"
          />
        </g>
        <path
          d="M428.58 102.39l-335.47 1.53 5.07-7.61a13.17 13.17 0 0110.94-5.85h303.56a13.14 13.14 0 0110.24 4.91z"
          style={{
            WebkitTransformOrigin: 260.845,
            msTransformOrigin: 260.845,
            transformOrigin: 260.845,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <rect
          width="86.68"
          height="86.68"
          x="214.16"
          y="152.67"
          fill="#757575"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
          rx="34.15"
          style={{
            WebkitTransformOrigin: 257.5,
            msTransformOrigin: 257.5,
            transformOrigin: 257.5,
          }}
        />
        <path
          d="M229.91 203.34v12.32a7 7 0 007 7h42.27a7 7 0 007-6.95c.05-5.55.35-12.37.35-12.37z"
          style={{
            WebkitTransformOrigin: 258.22,
            msTransformOrigin: 258.22,
            transformOrigin: 258.22,
          }}
          fill="#999"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M384.62 207.45H137.41a6.33 6.33 0 01-5.9-4l-38.13-97.89a3.9 3.9 0 013.62-5.32h328a3.9 3.9 0 013.64 5.32l-38.13 97.86a6.33 6.33 0 01-5.89 4.03z"
          style={{
            WebkitTransformOrigin: 261.01,
            msTransformOrigin: 261.01,
            transformOrigin: 261.01,
          }}
          fill="#BFBFBF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 260.635,
            msTransformOrigin: 260.635,
            transformOrigin: 260.635,
          }}
          fill="#263238"
          d="M386.45 198.93L134.98 198.93 100.38 106.44 420.89 106.44 386.45 198.93z"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 258.21,
            msTransformOrigin: 258.21,
            transformOrigin: 258.21,
          }}
          fill="#263238"
          d="M230.18 207.32H286.24V211.16H230.18z"
          className="animable"
        />
        <path
          d="M349.72 195H172.14c-1 0-1.9-.44-2.08-1l-25.26-80.29c-.28-.9.51-1.63 1.77-1.63h228.72c1.26 0 2 .73 1.76 1.63L351.8 194c-.18.51-1.11 1-2.08 1z"
          style={{
            WebkitTransformOrigin: 260.919,
            msTransformOrigin: 260.919,
            transformOrigin: 260.919,
          }}
          fill="#7E50E6"
          className="animable"
        />
        <path
          style={{
            WebkitTransformOrigin: 260.93,
            msTransformOrigin: 260.93,
            transformOrigin: 260.93,
          }}
          fill="#263238"
          d="M349.06 193.13L172.8 193.13 151.33 122.62 370.53 122.62 349.06 193.13z"
          className="animable"
        />
        <path
          d="M198.1 140.13h-33.37c-.83 0-1.37.44-1.21 1a1.81 1.81 0 001.76 1h33.18c.82 0 1.4-.44 1.31-1s-.85-1-1.67-1z"
          style={{
            WebkitTransformOrigin: 181.636,
            msTransformOrigin: 181.636,
            transformOrigin: 181.636,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M199.21 146.22h-28.38c-.81 0-1.35.43-1.2 1a1.77 1.77 0 001.71.95h28.22c.81 0 1.38-.43 1.29-.95s-.85-1-1.64-1z"
          style={{
            WebkitTransformOrigin: 185.232,
            msTransformOrigin: 185.232,
            transformOrigin: 185.232,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            d="M200.29 152.1h-32.2c-.8 0-1.32.42-1.18.92a1.76 1.76 0 001.7.92h32c.79 0 1.36-.41 1.27-.92s-.79-.92-1.59-.92z"
            style={{
              WebkitTransformOrigin: 184.388,
              msTransformOrigin: 184.388,
              transformOrigin: 184.388,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M201.33 157.78h-18.91c-.78 0-1.32.4-1.2.89s.85.89 1.63.89h18.81c.78 0 1.34-.4 1.25-.89s-.8-.89-1.58-.89z"
          style={{
            WebkitTransformOrigin: 192.061,
            msTransformOrigin: 192.061,
            transformOrigin: 192.061,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M202.34 163.26h-31.12c-.76 0-1.28.39-1.14.87s.86.85 1.63.85h30.94c.77 0 1.32-.38 1.24-.85s-.78-.87-1.55-.87z"
          style={{
            WebkitTransformOrigin: 186.977,
            msTransformOrigin: 186.977,
            transformOrigin: 186.977,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M203.31 168.57h-25.12c-.76 0-1.27.37-1.15.83s.83.83 1.58.83h25c.75 0 1.29-.37 1.21-.83s-.76-.83-1.52-.83z"
          style={{
            WebkitTransformOrigin: 190.93,
            msTransformOrigin: 190.93,
            transformOrigin: 190.93,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M204.25 173.7h-24.71c-.75 0-1.25.36-1.13.8s.81.81 1.55.81h24.59c.74 0 1.27-.36 1.19-.81s-.74-.8-1.49-.8z"
          style={{
            WebkitTransformOrigin: 192.07,
            msTransformOrigin: 192.07,
            transformOrigin: 192.07,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M205.16 178.66h-27c-.73 0-1.23.35-1.11.78s.8.78 1.53.78h26.83c.73 0 1.26-.35 1.18-.78s-.69-.78-1.43-.78z"
          style={{
            WebkitTransformOrigin: 191.815,
            msTransformOrigin: 191.815,
            transformOrigin: 191.815,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            d="M206.05 183.47h-17.42c-.72 0-1.22.34-1.12.76s.77.75 1.48.75h17.33c.72 0 1.24-.34 1.17-.75s-.72-.76-1.44-.76z"
            style={{
              WebkitTransformOrigin: 197.497,
              msTransformOrigin: 197.497,
              transformOrigin: 197.497,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            d="M196.94 133.81h-24.87c-.84 0-1.4.46-1.25 1a1.8 1.8 0 001.77 1h24.72c.84 0 1.43-.45 1.33-1a1.66 1.66 0 00-1.7-1z"
            style={{
              WebkitTransformOrigin: 184.723,
              msTransformOrigin: 184.723,
              transformOrigin: 184.723,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M195.73 127.26h-34.62c-.85 0-1.41.48-1.24 1.07a1.92 1.92 0 001.84 1.06h34.41c.85 0 1.46-.48 1.35-1.06a1.69 1.69 0 00-1.74-1.07z"
          style={{
            WebkitTransformOrigin: 178.661,
            msTransformOrigin: 178.661,
            transformOrigin: 178.661,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M206.9 188.13h-28.69c-.71 0-1.19.33-1.08.73s.78.73 1.49.73h28.55c.7 0 1.22-.32 1.15-.73s-.71-.73-1.42-.73z"
          style={{
            WebkitTransformOrigin: 192.72,
            msTransformOrigin: 192.72,
            transformOrigin: 192.72,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            style={{
              WebkitTransformOrigin: 212.87,
              msTransformOrigin: 212.87,
              transformOrigin: 212.87,
            }}
            fill="#FFF"
            d="M209.82 142.35L216.29 142.35 215.97 139.88 209.45 139.88 209.82 142.35z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 213.72,
              msTransformOrigin: 213.72,
              transformOrigin: 213.72,
            }}
            fill="#FFF"
            d="M210.72 148.37L217.08 148.37 216.77 145.98 210.36 145.98 210.72 148.37z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 214.545,
              msTransformOrigin: 214.545,
              transformOrigin: 214.545,
            }}
            fill="#FFF"
            d="M211.59 154.17L217.84 154.17 217.54 151.87 211.25 151.87 211.59 154.17z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 215.34,
              msTransformOrigin: 215.34,
              transformOrigin: 215.34,
            }}
            fill="#FFF"
            d="M212.43 159.78L218.58 159.78 218.28 157.56 212.1 157.56 212.43 159.78z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 216.11,
              msTransformOrigin: 216.11,
              transformOrigin: 216.11,
            }}
            fill="#FFF"
            d="M213.25 165.2L219.29 165.2 219 163.05 212.93 163.05 213.25 165.2z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 216.845,
              msTransformOrigin: 216.845,
              transformOrigin: 216.845,
            }}
            fill="#FFF"
            d="M214.03 170.44L219.97 170.44 219.7 168.36 213.72 168.36 214.03 170.44z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 217.57,
              msTransformOrigin: 217.57,
              transformOrigin: 217.57,
            }}
            fill="#FFF"
            d="M214.8 175.51L220.64 175.51 220.38 173.5 214.5 173.5 214.8 175.51z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 218.26,
              msTransformOrigin: 218.26,
              transformOrigin: 218.26,
            }}
            fill="#FFF"
            d="M215.53 180.41L221.28 180.41 221.03 178.47 215.24 178.47 215.53 180.41z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 218.935,
              msTransformOrigin: 218.935,
              transformOrigin: 218.935,
            }}
            fill="#FFF"
            d="M216.25 185.17L221.91 185.17 221.66 183.28 215.96 183.28 216.25 185.17z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 211.985,
              msTransformOrigin: 211.985,
              transformOrigin: 211.985,
            }}
            fill="#FFF"
            d="M208.88 136.12L215.47 136.12 215.14 133.56 208.5 133.56 208.88 136.12z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 211.065,
              msTransformOrigin: 211.065,
              transformOrigin: 211.065,
            }}
            fill="#FFF"
            d="M207.91 129.65L214.62 129.65 214.28 126.99 207.51 126.99 207.91 129.65z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 219.585,
              msTransformOrigin: 219.585,
              transformOrigin: 219.585,
            }}
            fill="#FFF"
            d="M216.94 189.78L222.51 189.78 222.27 187.95 216.66 187.95 216.94 189.78z"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M251.05 179.44c0-.43.56-.78 1.29-.78h95.82c.73 0 1.22.35 1.1.78a1.62 1.62 0 01-1.54.78h-95.33c-.73 0-1.33-.35-1.34-.78z"
          style={{
            WebkitTransformOrigin: 300.164,
            msTransformOrigin: 300.164,
            transformOrigin: 300.164,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M349.13 175.31h-53.06c-.74 0-1.3-.36-1.25-.81s.69-.8 1.44-.8h53.33c.74 0 1.24.36 1.11.8a1.63 1.63 0 01-1.57.81z"
          style={{
            WebkitTransformOrigin: 322.769,
            msTransformOrigin: 322.769,
            transformOrigin: 322.769,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            d="M283.48 175.31H267c-.74 0-1.34-.36-1.33-.81s.61-.8 1.36-.8h16.57c.74 0 1.32.36 1.28.8s-.66.81-1.4.81z"
            style={{
              WebkitTransformOrigin: 275.276,
              msTransformOrigin: 275.276,
              transformOrigin: 275.276,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M317.92 170.23h-74.84c-.75 0-1.38-.37-1.41-.83s.56-.83 1.32-.83h75.24c.75 0 1.3.37 1.21.83s-.76.83-1.52.83z"
          style={{
            WebkitTransformOrigin: 280.559,
            msTransformOrigin: 280.559,
            transformOrigin: 280.559,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            d="M227.43 168.57h5.34c.75 0 1.4.37 1.44.83s-.54.83-1.29.83h-5.31c-.75 0-1.4-.37-1.45-.83s.52-.83 1.27-.83z"
            style={{
              WebkitTransformOrigin: 230.184,
              msTransformOrigin: 230.184,
              transformOrigin: 230.184,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M328.75 164.13c-.1.47-.8.85-1.57.85h-70.52c-.77 0-1.39-.38-1.4-.85s.61-.87 1.37-.87h70.91c.77 0 1.31.39 1.21.87z"
          style={{
            WebkitTransformOrigin: 292.011,
            msTransformOrigin: 292.011,
            transformOrigin: 292.011,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M226.87 163.26h20c.77 0 1.41.39 1.43.87s-.59.85-1.35.85h-19.9c-.76 0-1.42-.38-1.48-.85s.53-.87 1.3-.87z"
          style={{
            WebkitTransformOrigin: 236.933,
            msTransformOrigin: 236.933,
            transformOrigin: 236.933,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M226.28 157.78h76.94c.78 0 1.36.4 1.29.89s-.75.89-1.53.89h-76.51c-.77 0-1.45-.4-1.5-.89s.53-.89 1.31-.89z"
          style={{
            WebkitTransformOrigin: 264.741,
            msTransformOrigin: 264.741,
            transformOrigin: 264.741,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M276.23 153.94c-.79 0-1.41-.41-1.39-.92s.68-.92 1.48-.92h40.59c.8 0 1.37.42 1.28.92s-.8.92-1.59.92z"
          style={{
            WebkitTransformOrigin: 296.519,
            msTransformOrigin: 296.519,
            transformOrigin: 296.519,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M225.68 152.1h35.13c.8 0 1.44.42 1.44.92s-.65.92-1.44.92h-34.93c-.8 0-1.48-.41-1.54-.92s.54-.92 1.34-.92z"
          style={{
            WebkitTransformOrigin: 243.293,
            msTransformOrigin: 243.293,
            transformOrigin: 243.293,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M356.93 148.13h-96.71c-.8 0-1.46-.43-1.46-.95s.65-1 1.46-1h97.25c.81 0 1.34.43 1.19 1a1.81 1.81 0 01-1.73.95z"
          style={{
            WebkitTransformOrigin: 308.723,
            msTransformOrigin: 308.723,
            transformOrigin: 308.723,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M358.65 142.11h-85.09c-.82 0-1.47-.44-1.45-1s.7-1 1.52-1h85.59c.82 0 1.36.44 1.2 1a1.83 1.83 0 01-1.77 1z"
          style={{
            WebkitTransformOrigin: 316.279,
            msTransformOrigin: 316.279,
            transformOrigin: 316.279,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            d="M360.45 135.86h-17.82c-.84 0-1.41-.45-1.28-1a1.77 1.77 0 011.76-1H361c.84 0 1.39.46 1.22 1a1.86 1.86 0 01-1.77 1z"
            style={{
              WebkitTransformOrigin: 351.791,
              msTransformOrigin: 351.791,
              transformOrigin: 351.791,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M330.16 135.86h-65.43c-.83 0-1.51-.45-1.5-1s.68-1 1.52-1h65.82c.84 0 1.42.46 1.31 1a1.71 1.71 0 01-1.72 1z"
          style={{
            WebkitTransformOrigin: 297.562,
            msTransformOrigin: 297.562,
            transformOrigin: 297.562,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M229 183.47h60.43c.72 0 1.27.34 1.22.76s-.65.75-1.37.75h-60.09c-.72 0-1.34-.34-1.39-.75s.5-.76 1.2-.76z"
          style={{
            WebkitTransformOrigin: 259.225,
            msTransformOrigin: 259.225,
            transformOrigin: 259.225,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M229.52 188.13h92.84c.7 0 1.21.33 1.12.73s-.72.73-1.43.73h-92.37c-.71 0-1.32-.32-1.36-.73s.49-.73 1.2-.73z"
          style={{
            WebkitTransformOrigin: 275.904,
            msTransformOrigin: 275.904,
            transformOrigin: 275.904,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M326.91 129.39h-47.26c-.85 0-1.51-.48-1.48-1.06s.74-1.07 1.6-1.07h47.54c.86 0 1.46.48 1.35 1.07a1.74 1.74 0 01-1.75 1.06z"
          style={{
            WebkitTransformOrigin: 303.421,
            msTransformOrigin: 303.421,
            transformOrigin: 303.421,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            d="M266.25 129.39h-43c-.85 0-1.6-.48-1.66-1.06s.57-1.07 1.43-1.07h43.25c.85 0 1.54.48 1.53 1.07s-.7 1.06-1.55 1.06z"
            style={{
              WebkitTransformOrigin: 244.693,
              msTransformOrigin: 244.693,
              transformOrigin: 244.693,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            d="M302.85 183.47c.72 0 1.26.34 1.2.76s-.69.75-1.41.75H298c-.71 0-1.25-.34-1.2-.75s.67-.76 1.39-.76z"
            style={{
              WebkitTransformOrigin: 300.426,
              msTransformOrigin: 300.426,
              transformOrigin: 300.426,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            d="M245.54 179.44c0 .43-.55.78-1.28.78h-6.36c-.73 0-1.35-.35-1.38-.78s.53-.78 1.26-.78h6.39c.73 0 1.35.34 1.37.78z"
            style={{
              WebkitTransformOrigin: 241.029,
              msTransformOrigin: 241.029,
              transformOrigin: 241.029,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            d="M322.29 158.67c-.09.49-.8.89-1.57.89h-7.44c-.78 0-1.34-.4-1.27-.89s.78-.89 1.56-.89h7.48c.78 0 1.34.4 1.24.89z"
            style={{
              WebkitTransformOrigin: 317.153,
              msTransformOrigin: 317.153,
              transformOrigin: 317.153,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            d="M345.5 163.26c.77 0 1.29.39 1.16.87a1.66 1.66 0 01-1.61.85h-5.93c-.77 0-1.29-.38-1.18-.85a1.62 1.62 0 011.6-.87z"
            style={{
              WebkitTransformOrigin: 342.303,
              msTransformOrigin: 342.303,
              transformOrigin: 342.303,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <g>
          <path
            d="M248.51 148.13c-.8 0-1.47-.43-1.5-.95s.62-1 1.43-1h6.31c.81 0 1.47.43 1.48 1s-.64.95-1.44.95z"
            style={{
              WebkitTransformOrigin: 251.62,
              msTransformOrigin: 251.62,
              transformOrigin: 251.62,
            }}
            fill="#FFF"
            className="animable"
            opacity="0.5"
          />
        </g>
        <path
          d="M162.57 117.34a2.13 2.13 0 01-2.1 3 4.44 4.44 0 01-3.94-3 2.13 2.13 0 012.08-3 4.42 4.42 0 013.96 3z"
          style={{
            WebkitTransformOrigin: 159.55,
            msTransformOrigin: 159.55,
            transformOrigin: 159.55,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M170.71 117.39a2.2 2.2 0 01-2.2 3 4.27 4.27 0 01-3.84-3 2.21 2.21 0 012.18-3 4.24 4.24 0 013.86 3z"
          style={{
            WebkitTransformOrigin: 167.693,
            msTransformOrigin: 167.693,
            transformOrigin: 167.693,
          }}
          fill="#FFF"
          className="animable"
        />
        <path
          d="M178.94 117.34a2.27 2.27 0 01-2.29 3 4.09 4.09 0 01-3.75-3 2.28 2.28 0 012.28-3 4.06 4.06 0 013.76 3z"
          style={{
            WebkitTransformOrigin: 175.922,
            msTransformOrigin: 175.922,
            transformOrigin: 175.922,
          }}
          fill="#FFF"
          className="animable"
        />
        <g>
          <path
            style={{
              WebkitTransformOrigin: 130.11,
              msTransformOrigin: 130.11,
              transformOrigin: 130.11,
            }}
            fill="#FFF"
            d="M100.38 106.44L127.33 178.47 159.84 106.44 100.38 106.44z"
            className="animable"
            opacity="0.1"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 201.04,
              msTransformOrigin: 201.04,
              transformOrigin: 201.04,
            }}
            fill="#FFF"
            d="M145.85 198.93L199.78 106.44 256.23 106.44 176.86 198.93 145.85 198.93z"
            className="animable"
            opacity="0.1"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 246.51,
              msTransformOrigin: 246.51,
              transformOrigin: 246.51,
            }}
            fill="#FFF"
            d="M280.56 105.98L196.5 198.93 209.45 198.93 296.52 106.44 280.56 105.98z"
            className="animable"
            opacity="0.1"
          />
        </g>
        <g>
          <path
            style={{
              WebkitTransformOrigin: 349.87,
              msTransformOrigin: 349.87,
              transformOrigin: 349.87,
            }}
            fill="#FFF"
            d="M297.16 198.93L389.54 106.44 402.58 106.44 307.33 198.93 297.16 198.93z"
            className="animable"
            opacity="0.1"
          />
        </g>
      </g>
      <g
        id="freepik--speech-bubbles--inject-11"
        style={{
          WebkitTransformOrigin: 235.99,
          msTransformOrigin: 235.99,
          transformOrigin: 235.99,
        }}
        className="animable animator-active"
      >
        <path
          d="M171.9 239.07h-21.09a5 5 0 00-5 5v10.26a5 5 0 005 5h5.51l4.18 9.47 5.89-9.47h5.51a5 5 0 005-5V244a5 5 0 00-5-4.93z"
          style={{
            WebkitTransformOrigin: 161.355,
            msTransformOrigin: 161.355,
            transformOrigin: 161.355,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M158.42 244.94a1 1 0 011-1 1 1 0 011 .93 1 1 0 01-1 1 1 1 0 01-1-.93zm.22 2.09h1.61v6.86h-1.61z"
          style={{
            WebkitTransformOrigin: 159.42,
            msTransformOrigin: 159.42,
            transformOrigin: 159.42,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M164.12 246.67v.41H166v1.29h-1.83v5.52h-1.61v-5.52h-1.13v-1.29h1.13v-.43a2.22 2.22 0 012.45-2.38 2.64 2.64 0 011.46.37l-.45 1.21a1.59 1.59 0 00-.89-.28c-.66 0-1.01.37-1.01 1.1z"
          style={{
            WebkitTransformOrigin: 163.95,
            msTransformOrigin: 163.95,
            transformOrigin: 163.95,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M236.12 240.5H215a5 5 0 00-5 5v10.27a5 5 0 005 5h5.52l4.17 9.47 5.89-9.47h5.52a5 5 0 005-5v-10.31a5 5 0 00-4.98-4.96z"
          style={{
            WebkitTransformOrigin: 225.55,
            msTransformOrigin: 225.55,
            transformOrigin: 225.55,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M219.46 252.41h-5.39a2.08 2.08 0 002.23 1.65 2.46 2.46 0 001.86-.75l.86 1a3.85 3.85 0 01-6.55-2.4 3.41 3.41 0 013.54-3.51 3.34 3.34 0 013.47 3.55c0 .12-.01.31-.02.46zm-5.4-1.06H218a1.86 1.86 0 00-1.94-1.67 1.89 1.89 0 00-2 1.67z"
          style={{
            WebkitTransformOrigin: 215.978,
            msTransformOrigin: 215.978,
            transformOrigin: 215.978,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M221 245.8h1.6v9.53H221z"
          style={{
            WebkitTransformOrigin: 221.8,
            msTransformOrigin: 221.8,
            transformOrigin: 221.8,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M224 254.65l.61-1.22a4.62 4.62 0 002.39.68c1 0 1.44-.28 1.44-.76 0-1.31-4.24-.08-4.24-2.81 0-1.3 1.17-2.15 3-2.15a5.51 5.51 0 012.57.59l-.62 1.22a3.78 3.78 0 00-2-.51c-1 0-1.44.32-1.44.77 0 1.39 4.24.15 4.24 2.84 0 1.28-1.18 2.12-3.11 2.12a5.4 5.4 0 01-2.84-.77z"
          style={{
            WebkitTransformOrigin: 226.975,
            msTransformOrigin: 226.975,
            transformOrigin: 226.975,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M237.77 252.41h-5.39a2.08 2.08 0 002.23 1.65 2.46 2.46 0 001.86-.75l.86 1a3.85 3.85 0 01-6.55-2.4 3.41 3.41 0 013.54-3.51 3.34 3.34 0 013.47 3.55c0 .12-.01.31-.02.46zm-5.4-1.06h3.89a1.86 1.86 0 00-1.94-1.67 1.89 1.89 0 00-1.95 1.67z"
          style={{
            WebkitTransformOrigin: 234.288,
            msTransformOrigin: 234.288,
            transformOrigin: 234.288,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M298.38 239.9h-21.1a5 5 0 00-5 4.95v10.27a5 5 0 005 5h5.52l4.17 9.47 5.89-9.47h5.52a5 5 0 005-5v-10.27a5 5 0 00-5-4.95z"
          style={{
            WebkitTransformOrigin: 287.83,
            msTransformOrigin: 287.83,
            transformOrigin: 287.83,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M282.12 247.5v.41H284v1.29h-1.84v5.52h-1.6v-5.52h-1.13v-1.29h1.13v-.43a2.22 2.22 0 012.44-2.38 2.54 2.54 0 011.45.37l-.45 1.21a1.54 1.54 0 00-.88-.28c-.65 0-1 .37-1 1.1z"
          style={{
            WebkitTransformOrigin: 281.94,
            msTransformOrigin: 281.94,
            transformOrigin: 281.94,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M284.42 251.29a3.66 3.66 0 113.65 3.52 3.46 3.46 0 01-3.65-3.52zm5.69 0a2 2 0 10-2 2.15 2 2 0 002-2.15z"
          style={{
            WebkitTransformOrigin: 288.077,
            msTransformOrigin: 288.077,
            transformOrigin: 288.077,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M297.23 247.78v1.53a2.6 2.6 0 00-.37 0 1.87 1.87 0 00-2 2.12v3.33h-1.61v-6.86h1.53v1a2.71 2.71 0 012.45-1.12z"
          style={{
            WebkitTransformOrigin: 295.24,
            msTransformOrigin: 295.24,
            transformOrigin: 295.24,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M359.74 239.07h-21.1a5 5 0 00-5 5v10.26a5 5 0 005 5h5.52l4.17 9.47 5.89-9.47h5.52a5 5 0 005-5V244a5 5 0 00-5-4.93z"
          style={{
            WebkitTransformOrigin: 349.19,
            msTransformOrigin: 349.19,
            transformOrigin: 349.19,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M346.45 246.69h5.92V248h-5.92zm0 3.11h5.92v1.29h-5.92z"
          style={{
            WebkitTransformOrigin: 349.41,
            msTransformOrigin: 349.41,
            transformOrigin: 349.41,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M204.06 227.19H183a5 5 0 00-5 5v10.26a5 5 0 005 5h5.52l4.17 9.47 5.89-9.47h5.52a5 5 0 005-5v-10.3a5 5 0 00-5.04-4.96z"
          style={{
            WebkitTransformOrigin: 193.55,
            msTransformOrigin: 193.55,
            transformOrigin: 193.55,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M188.55 231.45h3.07v1.29h-1.47v9.45h1.47v1.29h-3.07z"
          style={{
            WebkitTransformOrigin: 190.085,
            msTransformOrigin: 190.085,
            transformOrigin: 190.085,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M195.6 243.48v-1.29h1.45v-9.45h-1.45v-1.29h3.05v12z"
          style={{
            WebkitTransformOrigin: 197.125,
            msTransformOrigin: 197.125,
            transformOrigin: 197.125,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M266.78 226.14h-21.1a5 5 0 00-5 5v10.26a5 5 0 005 5h5.52l4.18 9.47 5.89-9.47h5.51a5 5 0 005-5v-10.3a5 5 0 00-5-4.96z"
          style={{
            WebkitTransformOrigin: 256.23,
            msTransformOrigin: 256.23,
            transformOrigin: 256.23,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M251.94 236.38c.51.16.76.51.76 1.31v2.44a.86.86 0 001 1h.27v1.29h-.65a1.91 1.91 0 01-2.18-2.1v-2.64c0-.43-.22-.62-.58-.62h-.42v-1.31h.42c.36 0 .58-.19.58-.62v-2.64a1.91 1.91 0 012.18-2.1h.65v1.29h-.27a.86.86 0 00-1 1v2.44c0 .74-.25 1.09-.76 1.26z"
          style={{
            WebkitTransformOrigin: 252.055,
            msTransformOrigin: 252.055,
            transformOrigin: 252.055,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M261.74 235.72V237h-.44c-.35 0-.57.19-.57.62v2.64a1.91 1.91 0 01-2.19 2.1h-.65v-1.26h.27a.87.87 0 001-1v-2.44c0-.8.23-1.15.74-1.31-.51-.17-.74-.52-.74-1.32v-2.44a.87.87 0 00-1-1h-.27v-1.29h.65a1.91 1.91 0 012.19 2.1v2.64c0 .43.22.62.57.62z"
          style={{
            WebkitTransformOrigin: 259.815,
            msTransformOrigin: 259.815,
            transformOrigin: 259.815,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M328.84 224.06h-21.1a5 5 0 00-5 5v10.26a5 5 0 005 5h5.51l4.18 9.47 5.89-9.47h5.52a5 5 0 005-5V229a5 5 0 00-5-4.94z"
          style={{
            WebkitTransformOrigin: 318.29,
            msTransformOrigin: 318.29,
            transformOrigin: 318.29,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M317.45 231.66a1.06 1.06 0 112.11 0 1.06 1.06 0 11-2.11 0zm2.11 4.89a3 3 0 01-.3 1.11l-.66 1.81h-1l.52-2a1 1 0 01-.61-.95 1 1 0 112.09 0z"
          style={{
            WebkitTransformOrigin: 318.522,
            msTransformOrigin: 318.522,
            transformOrigin: 318.522,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M246.36 403.5h21.09a5 5 0 005-5v-10.22a5 5 0 00-5-5h-5.51l-1.61-9.47-8.46 9.47h-5.51a5 5 0 00-5 5v10.26a5 5 0 005 4.96z"
          style={{
            WebkitTransformOrigin: 256.905,
            msTransformOrigin: 256.905,
            transformOrigin: 256.905,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M253.77 391.3l-4.43 1.7 4.43 1.65V396l-5.92-2.3v-1.39l5.92-2.3z"
          style={{
            WebkitTransformOrigin: 250.81,
            msTransformOrigin: 250.81,
            transformOrigin: 250.81,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M258.45 386.63h1.43l-4.24 12.11h-1.43z"
          style={{
            WebkitTransformOrigin: 257.045,
            msTransformOrigin: 257.045,
            transformOrigin: 257.045,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M266.11 392.26v1.39l-5.92 2.3v-1.34l4.43-1.65-4.43-1.66V390z"
          style={{
            WebkitTransformOrigin: 263.15,
            msTransformOrigin: 263.15,
            transformOrigin: 263.15,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M112.24 328.75h21.09a5 5 0 005-4.95v-10.27a5 5 0 00-5-5h-5.51l1.2-9.47-11.27 9.47h-5.51a5 5 0 00-5 5v10.27a5 5 0 005 4.95z"
          style={{
            WebkitTransformOrigin: 122.785,
            msTransformOrigin: 122.785,
            transformOrigin: 122.785,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M118.49 322.25a1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1zm.09-8.09h1.9l-.32 6h-1.27z"
          style={{
            WebkitTransformOrigin: 119.49,
            msTransformOrigin: 119.49,
            transformOrigin: 119.49,
          }}
          fill="#263238"
          className="animable"
        />
        <path
          d="M122.14 316.46h5.92v1.29h-5.92zm0 3.11h5.92v1.29h-5.92z"
          style={{
            WebkitTransformOrigin: 125.1,
            msTransformOrigin: 125.1,
            transformOrigin: 125.1,
          }}
          fill="#263238"
          className="animable"
        />
      </g>
      <g
        id="freepik--Mouse--inject-11"
        style={{
          WebkitTransformOrigin: 426.835,
          msTransformOrigin: 426.835,
          transformOrigin: 426.835,
        }}
        className="animable"
      >
        <path
          d="M450 317.12a71.82 71.82 0 01-1 11.86c-2.9 17.31-12 29.93-22.76 29.93a13.68 13.68 0 01-2.86-.3c-11.75-2.49-20.86-20.11-20.86-41.49 0-23.08 10.62-31.25 23.72-31.25S450 294 450 317.12z"
          style={{
            WebkitTransformOrigin: 426.26,
            msTransformOrigin: 426.26,
            transformOrigin: 426.26,
          }}
          fill="#FFF"
          className="animable"
        />
        <g
          style={{
            WebkitTransformOrigin: 444.009,
            msTransformOrigin: 444.009,
            transformOrigin: 444.009,
          }}
          className="animable"
          clipPath='url("#freepik--clip-path-3--inject-11")'
        >
          <path
            d="M441.43 317.38c.88 12.38-1.24 24.82-4.81 36.71 8.94-7.34 13.05-18.88 16.77-29.83 2.7-7.95 5.43-16.15 4.94-24.53s-5-17.11-12.84-20a17.13 17.13 0 00-12.13.19c-6.59 2.65-3 4.79-.21 9.53a64.6 64.6 0 018.28 27.93z"
            style={{
              WebkitTransformOrigin: 444.009,
              msTransformOrigin: 444.009,
              transformOrigin: 444.009,
            }}
            fill="#7E50E6"
            className="animable"
          />
          <g>
            <path
              d="M441.43 317.38c.88 12.38-1.24 24.82-4.81 36.71 8.94-7.34 13.05-18.88 16.77-29.83 2.7-7.95 5.43-16.15 4.94-24.53s-5-17.11-12.84-20a17.13 17.13 0 00-12.13.19c-6.59 2.65-3 4.79-.21 9.53a64.6 64.6 0 018.28 27.93z"
              style={{
                WebkitTransformOrigin: 444.009,
                msTransformOrigin: 444.009,
                transformOrigin: 444.009,
              }}
              fill="#FFF"
              className="animable"
              opacity="0.5"
            />
          </g>
        </g>
        <path
          d="M450 317.12a71.82 71.82 0 01-1 11.86c-2.9 17.31-12 29.93-22.76 29.93a13.68 13.68 0 01-2.86-.3c-11.75-2.49-20.86-20.11-20.86-41.49 0-23.08 10.62-31.25 23.72-31.25S450 294 450 317.12z"
          style={{
            WebkitTransformOrigin: 426.26,
            msTransformOrigin: 426.26,
            transformOrigin: 426.26,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M439.05 338.35a41 41 0 01-7.79 14.6"
          style={{
            WebkitTransformOrigin: 435.155,
            msTransformOrigin: 435.155,
            transformOrigin: 435.155,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M439.8 335.45c-.12.56-.26 1.12-.41 1.68"
          style={{
            WebkitTransformOrigin: 439.595,
            msTransformOrigin: 439.595,
            transformOrigin: 439.595,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M439.74 317.06a40.77 40.77 0 01.47 16.28"
          style={{
            WebkitTransformOrigin: 440.277,
            msTransformOrigin: 440.277,
            transformOrigin: 440.277,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M402.57 317.12s27-10.66 47.46 0"
          style={{
            WebkitTransformOrigin: 426.3,
            msTransformOrigin: 426.3,
            transformOrigin: 426.3,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M426.3 285.87s2.7 10 3 26.27"
          style={{
            WebkitTransformOrigin: 427.8,
            msTransformOrigin: 427.8,
            transformOrigin: 427.8,
          }}
          fill="#FFF"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
        <path
          d="M430.07 298c.34 3.11-.2 5.75-1.21 5.91s-2.11-2.23-2.45-5.33.19-5.76 1.2-5.92 2.11 2.27 2.46 5.34z"
          style={{
            WebkitTransformOrigin: 428.239,
            msTransformOrigin: 428.239,
            transformOrigin: 428.239,
          }}
          fill="#BFBFBF"
          stroke="#263238"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animable"
        />
        <path
          d="M415.66 366.91H384a7.75 7.75 0 01-7.69-6.71 5.33 5.33 0 01-.09-1.07v-74.59a5.63 5.63 0 01.09-1.08 7.74 7.74 0 017.69-6.7h89.72a7.66 7.66 0 013.73 1"
          style={{
            WebkitTransformOrigin: 426.835,
            msTransformOrigin: 426.835,
            transformOrigin: 426.835,
          }}
          fill="none"
          stroke="#263238"
          strokeMiterlimit="10"
          className="animable"
        />
      </g>
      <defs>
        <clipPath id="freepik--clip-path--inject-11">
          <path
            fill="#fff"
            d="M347.67 388.48l.12-44.21c.48-1.78.87-8.34 1.89-12.91 1.74-7.66-5.1-16.9-5.58-17.2-1.92-1.19-6-1.17-6-1.17s-4-4.57-7.57-6a17.87 17.87 0 00-7.66-1 36.61 36.61 0 00-9.1-5.51 7.49 7.49 0 00-7.66 1.44l-4.47 7a5.21 5.21 0 00.61 6.52c2.14 2.11 4.88 1.12 6.26 1.12 1.91 0 2.63-2.16 2.63-2.16s.47 11.26 0 12.69c-.49 1.43-4.07 4.78-4.07 4.78l-12-15.83a114.51 114.51 0 01-10.77-17.78 8.5 8.5 0 00-1.35-2.09c-2.1-2.38-6.59-3.07-7.76 1.32a8.7 8.7 0 00.19 4.24c5 14.78 11.38 25.95 17.19 37.59 3.45 6.91 2.17 6.83 3.89 9.95-.2.14-.1.4-.32.53-.84 3.36-1.43 6.73-2.28 10.09a46 46 0 00-3.83-12.18 27.5 27.5 0 00.53-7.12 9.38 9.38 0 00-3-6.31 6.17 6.17 0 00-3.49-1.36 3.64 3.64 0 00-3.84 3.12 37.51 37.51 0 01-1 5.41 54.48 54.48 0 01-2.76 6.8c0 4.46 2.76 3.73 4.77 21.67 1.56 14 19.56 23.21 29.36 33.3l10.44 32.86A202.3 202.3 0 00356 417.79z"
          />
        </clipPath>
        <clipPath id="freepik--clip-path-2--inject-11">
          <path
            fill="#fff"
            d="M237.2 336.42c-.43-2-3.24-1.69-3.24-1.69-9.45.56-10.72 15.37-10.72 15.37l-3.39 10.14-1-15.26.1-19.67s2.86-18.82 1.59-21.77a4.31 4.31 0 00-3.91-2.86c-5.5-1.38-5.82 6.55-5.82 6.55l-4.64 16.18-1.91 17.45-1.58-.84s-.75-18.52-.43-18.83 2.22-12.79 2.22-12.79 1.05-2.33 2.33-5.29a6.43 6.43 0 000-5.29c-2.23-4.54-6.87-2.42-7.83 0a70.39 70.39 0 01-3.8 7.19l-5.3 14.49c.2 3.28-1.68 19.46-1.68 19.46l-1.91-.87-3.07-9.5 2.34-9.73s5.07-5.6 4.22-8.88-5.18-2.32-5.18-2.32L175.88 318h-2.55l-6 7.61a48.27 48.27 0 00-1.38 25.29l1.38 6.43v41.56s-4.12 6.66-4.12 7.29c0 .29-1.7 5.54-4.07 12.09 10.37 6.1 19.3 10.82 25.63 13.31 3 1.18 6 2.3 9 3.37 3.8-10.67 8.24-22.08 10.69-24.75 4.86-5.28 14.38-15.44 14.38-15.44s10.81-17.37 12.08-23.14c1-4.74 3.58-13.35 4.46-16.3a5.77 5.77 0 00.24-2.07c-.07-1.56-.22-4.59-.22-7.26-.04-3.79 2.22-7.6 1.8-9.57z"
          />
        </clipPath>
        <clipPath id="freepik--clip-path-3--inject-11">
          <path
            fill="#fff"
            stroke="#263238"
            strokeMiterlimit="10"
            d="M450 317.12a71.82 71.82 0 01-1 11.86c-2.9 17.31-12 29.93-22.76 29.93a13.68 13.68 0 01-2.86-.3c-11.75-2.49-20.86-20.11-20.86-41.49 0-23.08 10.62-31.25 23.72-31.25S450 294 450 317.12z"
          />
        </clipPath>
      </defs>
      <defs>
        <filter id="active" height="200%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="DILATED"
          />
          <feFlood floodColor="#32DFEC" floodOpacity="1" result="PINK" />
          <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE" />
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hover" height="200%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="DILATED"
          />
          <feFlood floodColor="red" floodOpacity="0.5" result="PINK" />
          <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE" />
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
          <feColorMatrix values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
  )
}
export default HeroAnimation
