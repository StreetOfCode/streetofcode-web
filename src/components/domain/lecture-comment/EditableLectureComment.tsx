import React, {ChangeEvent, useState} from 'react'
import styled, {css} from 'styled-components'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import TextField from '../../core/TextField'
import Loading from '../../Loading'
import {BiToggleLeft, BiToggleRight} from 'react-icons/bi'
import Text from '../../core/Text'

type EditableLectureCommentProps = {
  /* Props for existing lecture comment */
  initialText?: string
  onEditCancelled?: () => void

  onSubmit: (text: string) => Promise<void>
}

const EditableLectureComment = ({
  initialText,
  onEditCancelled,
  onSubmit,
}: EditableLectureCommentProps) => {
  const [text, setText] = useState<string>(initialText || '')
  const [isInPreview, setIsInPreview] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)
    await onSubmit(text).then(() => {
      setIsLoading(false)
      setText('')
      setIsInPreview(false)
    })
  }

  const togglePreview = (): void => {
    setIsInPreview(!isInPreview)
  }

  const MarkdownPreview = () => {
    return (
      <MarkdownPreviewFlex justifyContent="flex-end">
        <PreviewWrapper gap="8px" alignItems="center" onClick={togglePreview}>
          <Text size="small" color="accent">
            Markdown preview
          </Text>
          {isInPreview ? <StyledToggleRightIcon /> : <StyledToggleLeftIcon />}
        </PreviewWrapper>
      </MarkdownPreviewFlex>
    )
  }

  return (
    <WrapperFlex direction="column" alignItems="flex-start" alignSelf="stretch">
      {!isInPreview && (
        <TextField
          itemBefore={text.length > 0 && <MarkdownPreview />}
          text={text}
          onTextChanged={onTextChanged}
          maxLength={750}
          maxRows={100}
          label="Sem napíš svoj komentár"
        />
      )}
      {isInPreview && (
        <CommentField>
          <MarkdownPreview />
          <MarkdownView children={text} />
        </CommentField>
      )}
      {isLoading && <Loading />}
      {!isLoading && (
        <Flex alignItems="flex-end" gap="12px" alignSelf="flex-start">
          <SubmitButton
            disabled={text.trim().length === 0}
            variant="accent"
            onClick={handleOnSubmit}
          >
            {initialText && 'Upraviť komentár'}
            {!initialText && 'Pridať komentár'}
          </SubmitButton>
          {onEditCancelled && <Button onClick={onEditCancelled}>Zrušiť</Button>}
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

const CommentField = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-accent);
`

const MarkdownPreviewFlex = styled(Flex)`
  padding-right: 12px;
  width: 100%;
`

const PreviewWrapper = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`

const IconStyle = css`
  color: var(--color-accent);
  width: 24px;
  height: 24px;

  &:hover {
    cursor: pointer;
  }
`

const StyledToggleLeftIcon = styled(BiToggleLeft)`
  ${IconStyle}
`

const StyledToggleRightIcon = styled(BiToggleRight)`
  ${IconStyle}
`

export default EditableLectureComment
