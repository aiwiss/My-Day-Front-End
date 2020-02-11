import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions, messageActions, postActions } from '../../../redux/action-creators';
import { List, ListItem, Avatar, ListItemText, 
  ListItemSecondaryAction, ListItemAvatar, makeStyles,
  Tooltip, IconButton, ListSubheader } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteIcon from '@material-ui/icons/Delete';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ConfirmDialog from '../../Elements/ConfirmDialog/ConfirmDialog';
import { alertMessages } from '../../../misc/alertMessages';
import history from '../../../misc/history';

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: 'white',
    width: 600
  },
  header: {
    marginLeft: '9%',
    marginRight: '5%'
  },
  messageIcon: {
    '&:hover': {
      color: 'blue'
    }
  },
  binIcon: {
    '&:hover': {
      color: 'darkseagreen'
    }
  },
  visible: {
    display: 'block'
  },
  hidden: {
    display: 'none'
  }
}))

const AllUsersPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.userState.user);
  const tempUser = useSelector(state => state.userState.tempUser);
  const users = useSelector(state => state.userState.users);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToBeRemoved, setUserToBeRemoved] = useState({});
  const [forceRefresh, setForceRefresh] = useState(0);
  
  useEffect(() => {
    if (tempUser) {
      setForceRefresh(forceRefresh => ++forceRefresh);
      dispatch(userActions.clearUser());
    } 
  }, [tempUser])

  useEffect(() => dispatch(userActions.getAll(user._id)), [forceRefresh]);

  const handleChatClick = username => dispatch(messageActions.startNewChat(username));

  const handleUserStoriestClick = username => {
    dispatch(postActions.getByUsername(username));
    history.push('/user-stories');
  }

  const handleDeleteUser = deleteConfirmed => {
    console.log(deleteConfirmed)
    if (!deleteConfirmed){
      setShowDeleteConfirm(!showDeleteConfirm);
      return;
    } 

    dispatch(userActions.remove(userToBeRemoved._id));
    dispatch(messageActions.removeAllByUser(userToBeRemoved.pseudoname));
    dispatch(postActions.removeAllByUser(userToBeRemoved.pseudoname));
    setShowDeleteConfirm(!showDeleteConfirm);
    setUserToBeRemoved('');
  };

  const handleDeleteClick = user => {
    setShowDeleteConfirm(!showDeleteConfirm);
    setUserToBeRemoved(user);
  }

  return (
    <div className={classes.wrapper}>
      <List 
        className={users && users.length > 0 ? classes.visible : classes.hidden}
        subheader={
          <React.Fragment>
            <ListSubheader component="span" className={classes.header}>
              Brukernavn
            </ListSubheader>
            <ListSubheader component="span" className={classes.header}>
              Anonymt-navn
            </ListSubheader>
          </React.Fragment>
        }
        >
        {users && users.map((user, index) => 
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={user.username} />
            <ListItemText primary={user.pseudoname} />
            <ListItemSecondaryAction>
            <Tooltip title="Send melding til bruker">
              <IconButton className={classes.messageIcon} onClick={() => handleChatClick(user.pseudoname)}>
                <ChatBubbleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Se brukernes historier">
              <IconButton className={classes.messageIcon} onClick={() => handleUserStoriestClick(user.pseudoname)}>
                <ImportContactsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fjern bruker">
              <IconButton className={classes.binIcon} onClick={() => handleDeleteClick(user)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        <ConfirmDialog
          open={showDeleteConfirm}
          handleDeleteClick={handleDeleteUser} 
          header={alertMessages.DELETE_USER_CONFIRM.header} 
          message={alertMessages.DELETE_USER_CONFIRM.message}
          />
      </List>
    </div>
  )
}

export default AllUsersPage;