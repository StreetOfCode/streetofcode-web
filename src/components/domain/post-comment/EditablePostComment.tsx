import React, {ChangeEvent, useState} from 'react'
import styled from 'styled-components'
import {useAuth} from '../../../AuthUserContext'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import Text from '../../core/Text'
import TextField from '../../core/TextField'
import Loading from '../../Loading'

type EditablePostCommentProps = {
  /* Props for existing post comment */
  initialText?: string
  onEditCancelled?: () => void

  onSubmit: (text: string) => Promise<void>
}

const EditablePostComment = ({
  initialText,
  onEditCancelled,
  onSubmit,
}: EditablePostCommentProps) => {
  const {userId} = useAuth()
  const [text, setText] = useState<string>(initialText || '')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)
    await onSubmit(text).then(() => {
      setIsLoading(false)
      setText('')
    })
  }

  return (
    <WrapperFlex direction="column" alignItems="flex-start" alignSelf="stretch">
      <TextField
        text={text}
        onTextChanged={onTextChanged}
        maxLength={750}
        label="Sem napíš svoj komentár"
      />
      {isLoading && <Loading />}
      {!isLoading && (
        <Flex direction="column" gap="6px">
          <Flex alignItems="flex-end" gap="12px" alignSelf="flex-start">
            <SubmitButton
              disabled={text.trim().length === 0}
              variant="accent"
              onClick={handleOnSubmit}
            >
              {initialText && 'Upraviť komentár'}
              {!initialText && 'Pridať komentár'}
            </SubmitButton>
            {onEditCancelled && (
              <Button onClick={onEditCancelled}>Zrušiť</Button>
            )}
          </Flex>
          {!userId && (
            <Text size="small">
              Komentár píšeš anonymne. Po odoslaní ho nebudeš môcť upraviť ani
              zmazať.
            </Text>
          )}
        </Flex>
      )}
    </WrapperFlex>
  )
}

const WrapperFlex = styled(Flex)`
  width: 100%;
`

const SubmitButton = styled(Button)`
  margin-top: 12px;
`

export default EditablePostComment
