import React, {useState, HTMLAttributes, useEffect} from 'react'
import styled from 'styled-components'
import Flex from './Flex'

type Props = {
  children: React.ReactNode[]
  onRadioClick: (i: number) => void
  selected?: number
  applyColor?: (i: number) => string | undefined
  disabled?: boolean
} & HTMLAttributes<HTMLElement>

function RadioGroup({
  children,
  selected,
  onRadioClick,
  applyColor,
  disabled,
}: Props) {
  const initialSelected =
    selected === undefined || selected === -1 ? null : selected
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    setSelectedId(initialSelected)
  }, [initialSelected, setSelectedId])

  return (
    <Flex alignItems="stretch" alignSelf="stretch" direction="column" gap="8px">
      {children.map((childComponent: React.ReactNode, i: number) => {
        const isSelected = selectedId === i

        return (
          <RadioContainer
            isChecked={isSelected}
            color={applyColor !== undefined ? applyColor(i) : undefined}
            key={i}
            disabled={disabled}
            onClick={() => {
              if (disabled) {
                return
              }

              setSelectedId(selectedId === i ? null : i)
              onRadioClick(i)
            }}
          >
            <Radio isChecked={isSelected} />
            {childComponent}
          </RadioContainer>
        )
      })}
    </Flex>
  )
}

const RadioContainer = styled.div<{
  isChecked: boolean
  color?: string
  disabled?: boolean
}>`
  display: flex;
  ${(props) => (!props.disabled ? 'cursor: pointer;' : '')}
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  border-radius: 12px;

  ${(props) => {
    if (props.color) {
      return `background-color: ${props.color};
              color: ${props.theme.primaryColor};`
    } else if (props.isChecked) {
      return `background-color: ${props.theme.accentColor};
              color: ${props.theme.primaryColor};
              border: 1px solid ${props.theme.accentColor};`
    } else {
      return `
              ${
                !props.disabled
                  ? `:hover {
                background-color: ${props.theme.secondaryAccentColor};
              }`
                  : ''
              }
              color: ${props.theme.secondaryColor};
              border: 1px solid ${props.theme.accentColor};
              `
    }
  }}
`

const Radio = styled.span<{
  isChecked: boolean
}>`
  border: 1px solid
    ${(props) => {
      return props.isChecked
        ? props.theme.primaryColor
        : props.theme.accentColor
    }};

  width: 20px;
  aspect-ratio: 1;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 20px;
`

export default RadioGroup
