import React, {ChangeEvent, useState} from 'react'
import {AiOutlineEdit} from 'react-icons/ai'
import {MdOutlinePreview} from 'react-icons/md'
import styled, {css} from 'styled-components'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import MarkdownView from '../../core/MarkdownView'
import TextField from '../../core/TextField'
import Loading from '../../Loading'

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
    })
  }

  const togglePreview = (): void => {
    setIsInPreview(!isInPreview)
  }

  const containsMarkdown =
    text.includes('`') ||
    text.includes('#') ||
    text.includes('[') ||
    text.includes(']') ||
    text.includes(`'`)

  return (
    <WrapperFlex direction="column" alignItems="flex-start" alignSelf="stretch">
      {!isInPreview && (
        <TextField
          itemBefore={
            containsMarkdown && (
              <PreviewIconFlex justifyContent="flex-end">
                <StyledPreviewIcon
                  onClick={() => togglePreview()}
                  title="Zobraziť preview"
                />
              </PreviewIconFlex>
            )
          }
          text={text}
          onTextChanged={onTextChanged}
          maxLength={750}
          label="Sem napíš svoj komentár"
        />
      )}
      {isInPreview && (
        <CommentField>
          <PreviewIconFlex justifyContent="flex-end">
            <StyledEditIcon
              onClick={() => togglePreview()}
              title="Naspäť na editovanie"
            />
          </PreviewIconFlex>
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

const PreviewIconFlex = styled(Flex)`
  width: 100%;
`

const IconStyle = css`
  color: var(--color-accent);
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`

const StyledPreviewIcon = styled(MdOutlinePreview)`
  ${IconStyle}
`

const StyledEditIcon = styled(AiOutlineEdit)`
  ${IconStyle}
`

export default EditableLectureComment
