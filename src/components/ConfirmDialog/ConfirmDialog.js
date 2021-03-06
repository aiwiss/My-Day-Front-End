import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = props => {
  return (
    <Dialog open={props.open}>
      <DialogTitle>{props.header}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleDeleteClick(false)} color="primary">
          Avbryt
        </Button>
        <Button onClick={() => props.handleDeleteClick(true)} color="secondary">
          Bekrefte
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog;