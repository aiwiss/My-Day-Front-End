import { combineReducers } from 'redux';
import { userState } from './user';
import { postState } from './post';
import { messageState } from './message';

const rootReducer = combineReducers({
  userState,
  postState,
  messageState
});

export default rootReducer;