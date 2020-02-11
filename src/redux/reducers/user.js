import { userActionTypes } from '../action-types/user';
import { alertMessages } from '../../misc/alertMessages';

const initialState = {
  email: ''
}

export function userState(state = initialState, action) {
  switch(action.type) {
    case userActionTypes.LOADING:
      return {
        ...state,
        loading: true
      }
    case userActionTypes.CLEAR_ALERT:
      return {
        ...state,
        alert: null
      }
    case userActionTypes.CLEAR_USER:
      return {
        ...state,
        tempUser: null
      }
    case userActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        alert: action.error
       };
    case userActionTypes.VALIDATION_SUCCESS:
      return {
        ...state,
        validationSuccessful: true
      };
    case userActionTypes.VALIDATION_FAILURE:
      return {
        ...state,
        validationSuccessful: false
       };
    case userActionTypes.CLEAR_VALIDATION:
    return {
      ...state,
      validationSuccessful: null
      };
    case userActionTypes.LOGOUT:
      return { };
    case userActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userActionTypes.SIGNUP_FAILURE:
      return { };
    case userActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: alertMessages.UPDATE_SUCCESS
      };
    case userActionTypes.UPDATE_FAILURE:
      return { 
        ...state,
        loading: false,
        alert: alertMessages.UPDATE_FAILURE
      };
    case userActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        tempUser: action.tempUser
      };
    case userActionTypes.DELETE_FAILURE:
      return { };
    case userActionTypes.GET_ALL:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
}