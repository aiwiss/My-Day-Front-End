import React, { useState, useEffect } from 'react';
import MessageWindow from '../../Elements/MessageWindow/MessageWindow';
import { useSelector, useDispatch } from 'react-redux';
import { messageActions } from '../../../redux/action-creators';
import { Container, makeStyles, TextField, Grid, Typography } from '@material-ui/core';

import ToolbarSpacer from '../../Layout/ToolbarSpacer';
import ContactList from '../../Elements/ContactList/ContactList';
import { alertMessages } from '../../../misc/alertMessages';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '600px',
    left:0,
    top:0,
    bottom:0,
    right:0,
    margin:'auto'

  },
  right: {
    float: 'right'
  },
  left: {
    float: 'left'
  },
  noMessagesWrapper: {
    padding: '15px',
    backgroundColor: 'white',
    whiteSpace: 'pre-wrap',
  }
}))

const MessagesPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.userState.user);
  const messageData = useSelector(state => state.messageState.messages);
  const newChatUser = useSelector(state => state.messageState.newChat);
  const contacts = messageData ? messageData.contacts : [];
  const [currentContact, setCurrentContact] = useState(contacts[0]);
  const [currentMessages, setCurrentMessages] = useState([]);
  let timer = null;

  useEffect(() => {
    if (newChatUser) startNewChat();
    dispatch(messageActions.getByUsername(user.pseudoname));
    timer = 
      setInterval(() => 
        dispatch(messageActions.getByUsername(user.pseudoname)
        ), 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const messages = getMessagesForView();
    setCurrentMessages(messages);
  }, [currentContact, messageData]);

  const startNewChat = () => {
    const messageData = {
      sender: user.pseudoname,
      recipient: newChatUser,
      body: null
    };

    dispatch(messageActions.create(messageData));
    dispatch(messageActions.clearNewChat());
    setCurrentContact(messageData.recipient);
    
  }

  const getMessagesForView = () => {
    if (!messageData) return;
    const userMessages = messageData.messages.filter(msg => msg.sender === currentContact || msg.recipient === currentContact );
    const currMessages = [];
    
    userMessages.forEach(msg => {
      if (msg.body) {
        const author = msg.sender === user.pseudoname ? 'me' : 'them';
        const type = 'text';
        const data = { text: msg.body }
        const message = {author, type, data};
        currMessages.push(message);
      } 
    });

    return currMessages;
  }

  const handleContactClick = name => {
    setCurrentContact(name);
  }

  const handleMessageSent = message => {
    const sender = user.pseudoname;
    const recipient = currentContact;

    const messageData = {
      sender: sender,
      recipient: recipient,
      body: message.data.text
    };

    dispatch(messageActions.create(messageData));
  }

  const noMessagesPanel = (
    <div className={classes.noMessagesWrapper}>
      <Typography variant="h5">{alertMessages.NO_USER_MESSAGES.message}</Typography>
    </div>
  )

  return (
    <div >
      {messageData && messageData.contacts.length ?
        <Grid container>
          <Grid item xs={12} md={4}>
            <ContactList contacts={contacts} onClick={handleContactClick} selectedUser={newChatUser || currentContact} />
          </Grid>
          <Grid item xs={12} md={8}>
            <MessageWindow messages={currentMessages} onMessageSent={handleMessageSent} />
          </Grid>
        </Grid> :
        noMessagesPanel}
    </div>
  )
}

export default MessagesPage;
