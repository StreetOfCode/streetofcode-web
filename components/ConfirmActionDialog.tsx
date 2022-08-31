import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {TransitionProps} from '@mui/material/transitions'
import React from 'react'
import styled from 'styled-components'
import Button from './core/Button'
import Heading from './core/Heading'
import Text from './core/Text'

const ConfirmActionDialog = ({
  title,
  description = '',
  primaryButtonText,
  secondaryButtonText = 'Zrušiť',
  isOpen,
  onClose,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: {
  title: string
  description?: string
  primaryButtonText: string
  secondaryButtonText?: string
  isOpen: boolean
  onClose?: (event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => void
  onPrimaryButtonClick: () => void
  onSecondaryButtonClick?: () => void
}) => {
  const Transition = React.forwardRef(
    (
      props: TransitionProps & {children?: React.ReactElement},
      ref: React.Ref<unknown>,
    ) => {
      return <Slide direction="up" ref={ref} {...props} />
    },
  )

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogContentWrapper>
        <DialogTitle id="alert-dialog-title">
          <Heading variant="h4">{title}</Heading>
        </DialogTitle>
        {description && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Text>{description}</Text>
            </DialogContentText>
          </DialogContent>
        )}
      </DialogContentWrapper>
      <DialogActionsWrapper>
        <Button onClick={onSecondaryButtonClick}>{secondaryButtonText}</Button>
        <Button onClick={onPrimaryButtonClick} variant="danger">
          {primaryButtonText}
        </Button>
      </DialogActionsWrapper>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
  .MuiPaper-rounded {
    border-radius: 12px;
  }

  .MuiDialogActions-root {
    padding: 12px;
    padding-top: 0;
  }
`

const DialogContentWrapper = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  min-width: 300px;
  min-height: 100px;
`

const DialogActionsWrapper = styled(DialogActions)`
  background-color: ${(props) => props.theme.primaryColor};
`

export default ConfirmActionDialog
