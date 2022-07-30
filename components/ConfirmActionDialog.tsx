import {Button, Dialog} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {TransitionProps} from '@mui/material/transitions'
import React from 'react'
import styled from 'styled-components'

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
  onClose?: (event: any, reason: 'backdropClick' | 'escapeKeyDown') => void
  onPrimaryButtonClick: () => void
  onSecondaryButtonClick?: () => void
}) => {

  const Transition = React.forwardRef((
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) => {
    return <Slide direction="up" ref={ref} {...props} />
  })

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogContentWrapper>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {description && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
          </DialogContent>
        )}
      </DialogContentWrapper>
      <DialogActions>
        <Button onClick={onSecondaryButtonClick} variant="contained" color="primary">
          {secondaryButtonText}
        </Button>
        <Button onClick={onPrimaryButtonClick} variant="contained" color="primary" autoFocus>
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const DialogContentWrapper = styled.div`
  min-width: 300px;
  min-height: 100px;
`

export default ConfirmActionDialog
