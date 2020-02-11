import { messageActionTypes } from '../action-types/message';
import { alertMessages } from '../../misc/alertMessages';

const initialState = { };

export function messageState(state = initialState, action) {
  switch(action.type) {
    case messageActionTypes.GET_SUCCESS:
        return {
          ...state,
          messages: action.messageData
        }
    case messageActionTypes.GET_FAILURE:
      return {
        ...state,
        alert: alertMessages.GET_MSG_FAILURE
      }
    case messageActionTypes.ADD_SUCCESS:
      return {
        ...state,
        messages: action.messageData
      };
    case messageActionTypes.ADD_FAIL:
      return { 
        ...state,
        alert: alertMessages.ADD_MSG_FAILURE
      };
    case messageActionTypes.NEW_CHAT:
      return { 
        ...state,
        newChat: action.username
      };
    case messageActionTypes.CLEAR_CHAT:
      return { 
        ...state,
        newChat: ''
      };
    case messageActionTypes.DELETE_ALL_BY_USER:
      return {
        ...state,
        removalDone: action.success
      };
    default:
      return state;
  }
}