import history from '../../misc/history';
import { userActionTypes } from '../action-types/user';
import { userService } from '../../services/user-service';

export const userActions = {
  login,
  signup,
  logout,
  update,
  remove,
  getAll,
  clearAlert,
  clearUser
};

function login(username, password) {
  return dispatch => {
    userService.login(username, password)
      .then(
        user => {
          dispatch({ type: userActionTypes.LOGIN_SUCCESS, user });
          _redirectToHome();
        },
        error => {
          dispatch({ type: userActionTypes.LOGIN_FAILURE, error })
        }
      );
  }
}

function validate(username, password) {
  return dispatch => {
    userService.validate(username, password)
      .then(
        validatedUser => {
          dispatch({ type: userActionTypes.VALIDATION_SUCCESS, validatedUser });
        },
        error => {
          dispatch({ type: userActionTypes.VALIDATION_FAILURE, error });
        }
      );
  }
}

function logout() {
  return dispatch => {
    dispatch({ type: userActionTypes.LOGOUT });
  };
};

function signup(userData) {
  return dispatch => {
    userService.signup(userData)
      .then(
        user => {
          dispatch({ type: userActionTypes.SIGNUP_SUCCESS, user });
          _redirectToHome();
        },
        error => {
          dispatch({ type: userActionTypes.SIGNUP_FAILURE, error });
        }
      );
  }
}

function update(userData) {
  return dispatch => {
    dispatch({ type: userActionTypes.LOADING });

    userService.update(userData)
      .then(
        user => {
          dispatch({ type: userActionTypes.UPDATE_SUCCESS, user });
        },
        error => {
          dispatch({ type: userActionTypes.UPDATE_FAILURE, error });
        }
      );
  }
}

function remove(userId) {
  return dispatch => {
    userService.remove(userId)
      .then(
        tempUser => {
          dispatch({ type: userActionTypes.DELETE_SUCCESS, tempUser });
        },
        error => {
          dispatch({ type: userActionTypes.DELETE_FAILURE, error });
        }
      );
  }
}

function getAll(id) {
  return dispatch => {
    userService.getAll(id)
      .then(
        users => {
          dispatch({ type: userActionTypes.GET_ALL, users });
        },
        error => {
          dispatch({ type: userActionTypes.DELETE_FAILURE, error });
        }
      );
  }
}

function clearUser() {
  return dispatch => {
    dispatch({ type: userActionTypes.CLEAR_USER })
  }
}

function clearAlert() {
  return dispatch => dispatch({type: userActionTypes.CLEAR_ALERT});
}

function _redirectToHome() {
  history.push('/');
}