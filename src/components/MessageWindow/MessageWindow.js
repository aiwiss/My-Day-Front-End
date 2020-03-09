import React, { useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { Launcher } from 'react-chat-window';

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: 0,
    margin: 0,
    width: '80%',
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  sender: {
    backgroundColor: 'cyan',
  },
  recipient: {
    backgroundColor: 'grey'
  }
}));

const Message = props => {
  const classes = useStyles();

  // TODO: find better way to override this...
  useEffect(() => {
    const openChatButton = document.getElementsByClassName('sc-launcher opened')[0];
    openChatButton.style.display='none';
    const closeButton = document.getElementsByClassName('sc-header--close-button')[0];
    closeButton.style.display='none';
    const messageWindow = document.getElementsByClassName('sc-chat-window opened')[0];
    messageWindow.style.position='unset';
    messageWindow.style.maxHeight='unset';
    messageWindow.style.height='70vh';
    messageWindow.style.width='80vh';
    const header = document.getElementsByClassName('sc-header')[0];
    header.style.minHeight='unset';
    const inputBox = document.getElementsByClassName('sc-user-input--text')[0];
    inputBox.style.width='73vh';
    inputBox.style.maxHeight='75px';
    inputBox.setAttribute('placeholder', 'Skriv inn meldingen din...');
    document.querySelectorAll('.sc-message').forEach(el => el.style.width = '90%')
    const messageListContainer = document.getElementsByClassName('sc-message-list')[0];
    messageListContainer.scrollTop = 9999;
    const attachFileButton = document.getElementsByClassName('sc-user-input--button')[2];
    attachFileButton.style.display='none';
  }, [props.messages])

  return (
    <Container component="div" className={classes.wrapper}>
      <Launcher
          agentProfile={{
            teamName: 'Meldinger'
          }}
          onMessageWasSent={props.onMessageSent}
          isOpen={true}
          messageList={props.messages}
          showEmoji
          mute
        />
    </Container>
  )
}

export default Message;