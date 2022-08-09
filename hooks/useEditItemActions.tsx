import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import React, {FC, ReactElement, useState} from 'react'
import styled, {css} from 'styled-components'
import ConfirmActionDialog from '../components/ConfirmActionDialog'
import Flex from '../components/core/Flex'

const useEditItemActions = ({
  deleteAction,
  dialogTitle,
  disabled,
}: {
  deleteAction: () => Promise<void>
  dialogTitle: string
  disabled?: boolean
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false)

  const onDelete = async () => {
    await deleteAction()
    setIsConfirmingDelete(false)
  }

  const onDeleteButtonClicked = () => {
    setIsConfirmingDelete(true)
  }

  const handleConfirmDeleteDialogClose = () => {
    setIsConfirmingDelete(false)
  }

  const onEditToggle = () => {
    setIsEditing(true)
  }

  const onEdited = () => {
    setIsEditing(false)
  }

  const onEditCancelled = () => {
    setIsEditing(false)
  }

  const EditItemActions: FC = (): ReactElement => {

    return (
      <Wrapper disabled={disabled || isEditing}>
        <Flex gap="8px">
          <StyledEditIcon onClick={onEditToggle} />
          <StyledDeleteIcon onClick={onDeleteButtonClicked} />
        </Flex>
        <ConfirmActionDialog
          title={dialogTitle}
          primaryButtonText="Zmazať"
          isOpen={isConfirmingDelete}
          onClose={handleConfirmDeleteDialogClose}
          onSecondaryButtonClick={handleConfirmDeleteDialogClose}
          onPrimaryButtonClick={onDelete}
        />
      </Wrapper>
    )
  }
  return [isEditing, onEdited, onEditCancelled, EditItemActions] as const
}

const Wrapper = styled.div<{disabled?: boolean}>`
  display: ${(props) => props.disabled && 'none'};
`

const IconStyle = css`
  color: ${(props) => props.theme.accentColor};
  width: 20px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`

const StyledEditIcon = styled(AiOutlineEdit)`
  ${IconStyle}
`
const StyledDeleteIcon = styled(AiOutlineDelete)`
  ${IconStyle}
`

export default useEditItemActions
