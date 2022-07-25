import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, {FC, ReactElement, useState} from 'react'
import styled from 'styled-components'
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
          <StyledIconButton aria-label="edit" onClick={onEditToggle}>
            <StyledEditIcon />
          </StyledIconButton>
          <StyledIconButton aria-label="delete" onClick={onDeleteButtonClicked}>
            <StyledDeleteIcon />
          </StyledIconButton>
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

const StyledIconButton = styled(IconButton)`
  padding: 0px !important;
`

const StyledEditIcon = styled(EditIcon)`
  color: ${(props) => props.theme.accentColor};
`

const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${(props) => props.theme.accentColor};
`

export default useEditItemActions
