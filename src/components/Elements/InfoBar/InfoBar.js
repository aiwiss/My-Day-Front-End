import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const InfoBar = props => {
  return (
    <Snackbar 
      open={props.open} 
      autoHideDuration={props.autoHideDuration} 
      onClose={props.onAlertClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
      <MuiAlert 
        elevation={6} 
        variant="filled" 
        severity={props.infoType ? props.infoType : 'info'} 
        onClose={props.onAlertClose}
        >
        {props.message}
      </MuiAlert>
    </Snackbar>
  )
}

export default InfoBar;