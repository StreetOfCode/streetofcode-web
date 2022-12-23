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
              color: var(--color-primary);`
    } else if (props.isChecked) {
      return `background-color: var(--color-accent);
              color: var(--color-primary);
              border: 1px solid var(--color-accent);`
    } else {
      return `
              ${
                !props.disabled
                  ? `:hover {
                  transform: scale(1.02);
                  transition: transform 0.2s ease-in-out;
                  box-shadow: 0 0 10px 0 var(--color-shadow);
              }`
                  : ''
              }
              color: var(--color-secondary);
              border: 1px solid var(--color-accent);
              `
    }
  }}
`

const Radio = styled.span<{
  isChecked: boolean
}>`
  border: 1px solid
    ${(props) => {
      return props.isChecked ? 'var(--color-primary)' : 'var(--color-accent)'
    }};

  width: 20px;
  aspect-ratio: 1;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 20px;
`

export default RadioGroup
