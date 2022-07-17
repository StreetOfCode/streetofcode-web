import React, {ChangeEvent, SyntheticEvent, useState} from 'react'
import styled from 'styled-components'
import Button from '../../core/Button'
import Flex from '../../core/Flex'
import Rating from '../../core/Rating'
import TextField from '../../core/TextField'
import Loading from '../../Loading'

type EditableCourseReviewProps = {
  /* Props for existing course review */
  initialRating?: number
  initialText?: string
  onEditCancelled?: () => void

  onSubmit: (rating: number, text: string) => Promise<void>
}

const EditableCourseReview = (
  {initialRating, initialText, onEditCancelled, onSubmit}: EditableCourseReviewProps,
) => {
  const [rating, setRating] = useState<number>(initialRating || 5)
  const [text, setText] = useState<string>(initialText || '')
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const onRatingChanged = (e: SyntheticEvent, value: number | null) => {
    setRating(value ?? 0)
  }

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)
    await onSubmit(rating, text)
  }

  return (
    <WrapperFlex direction="column" alignItems="flex-start" alignSelf="stretch">
      <TextField
        text={text}
        onTextChanged={onTextChanged}
        maxLength={360}
        label="Sem napíš svoje hodnotenie"
        itemBefore={
          <Rating name="half-rating-read" value={rating} onChange={onRatingChanged} style={{marginBottom: '12px'}} />
        }
      />
      {isLoading && <Loading />}
      {!isLoading && (
        <Flex alignItems="flex-end" gap="12px" alignSelf="flex-start">
          <SubmitButton variant="accent" onClick={handleOnSubmit}>
            {initialText && 'upraviť hodnotenie'}
            {!initialText && 'pridať hodnotenie'}
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

export default EditableCourseReview
