import React, {ChangeEvent, useState} from 'react'
import styled from 'styled-components'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import TextField from '../../core/TextField'
import Loading from '../../Loading'

type EditableLectureCommentProps = {
  /* Props for existing lecture comment */
  initialText?: string
  onEditCancelled?: () => void

  onSubmit: (text: string) => Promise<void>
}

const EditableLectureComment = (
  {initialText, onEditCancelled, onSubmit}: EditableLectureCommentProps,
) => {
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
        maxLength={360}
        label="Sem napíš svoj komentár"
      />
      {isLoading && <Loading />}
      {!isLoading && (
        <Flex alignItems="flex-end" gap="12px" alignSelf="flex-start">
          <SubmitButton variant="accent" onClick={handleOnSubmit}>
            {initialText && 'upraviť komentár'}
            {!initialText && 'pridať komentár'}
          </SubmitButton>
          {onEditCancelled && <Button onClick={onEditCancelled}>zrušiť</Button>}
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

export default EditableLectureComment
