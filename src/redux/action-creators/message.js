import { messageActionTypes } from '../action-types/message';
import { messageService } from '../../services/message-service';
import history from '../../misc/history';

export const messageActions = {
  getByUsername,
  create,
  startNewChat,
  clearNewChat,
  removeAllByUser
};

function getByUsername(username) {
  return dispatch => {
    messageService.getUserMessages(username)
      .then(
        messageData => dispatch({ type: messageActionTypes.GET_SUCCESS, messageData }),
        error => dispatch({ type: messageActionTypes.GET_FAILURE, error })
      );
  }
}

function create(messageData) {
  return dispatch => {
    messageService.create(messageData)
      .then(
        messageData => dispatch({ type: messageActionTypes.ADD_SUCCESS, messageData }),
        error => dispatch({ type: messageActionTypes.ADD_FAIL, error })
      );
  }
}

function removeAllByUser(username) {
  return dispatch => {
    messageService.removeAllByUser(username)
      .then(
        success => dispatch({ type: messageActionTypes.DELETE_ALL_BY_USER, success }),
        error => console.log(error)
      );
  }
}

function startNewChat(username) {
  return dispatch => {
    dispatch({ type: messageActionTypes.NEW_CHAT, username });
    history.push('/messages');
  }
}

function clearNewChat() {
  return dispatch => {
    dispatch({ type: messageActionTypes.CLEAR_CHAT });
  }
}