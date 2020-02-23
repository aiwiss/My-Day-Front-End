import { postActionTypes } from '../action-types/post';
import { postService } from '../../services/post-service';

export const postActions = {
  getAll,
  getByUsername,
  getFavoritesByUsername,
  create,
  update,
  remove,
  clearPost,
  removeAllByUser,
  updatePostHtml
};

function getAll(page, limit) {
  return dispatch => {
    postService.getAll(page, limit)
      .then(
        posts => dispatch({ type: postActionTypes.GETALL_SUCCESS, posts, page }),
        error => dispatch({ type: postActionTypes.GETALL_FAIL, error })
      );
  }
}

function getByUsername(username) {
  return dispatch => {
    postService.getUserPosts(username)
      .then(
        userPosts => dispatch({ type: postActionTypes.GETBYUSER_SUCCESS, userPosts }),
        error => dispatch({ type: postActionTypes.GETBYUSER_FAILURE, error })
      );
  }
}

function getFavoritesByUsername(username) {
  return dispatch => {
    postService.getFavoriteUserPosts(username)
      .then(
        favoritePosts => dispatch({ type: postActionTypes.GETUSERFAVORITES_SUCCESS, favoritePosts }),
        error => dispatch({ type: postActionTypes.GETUSERFAVORITES_FAILURE, error })
      );
  }
}

function create(postData) {
  return dispatch => {
    postService.create(postData)
      .then(
        post => dispatch({ type: postActionTypes.ADD_SUCCESS, post }),
        error => dispatch({ type: postActionTypes.ADD_FAIL, error })
      );
  }
}

function update(postData) {
  return dispatch => {
    postService.update(postData)
      .then(
        post => dispatch({ type: postActionTypes.UPDATE_SUCCESS, post }),
        error => dispatch({ type: postActionTypes.UPDATE_FAILURE, error })
      );
  }
}

function remove(postId) {
  return dispatch => {
    postService.remove(postId)
      .then(
        post => dispatch({ type: postActionTypes.DELETE_SUCCESS, post }),
        error => dispatch({ type: postActionTypes.DELETE_FAILURE, error })
      );
  }
}

function removeAllByUser(username) {
  return dispatch => {
    postService.removeAllByUser(username)
      .then(
        success => dispatch({ type: postActionTypes.DELETE_ALL_BY_USER, success }),
        error => console.log(error)
      );
  }
}

function clearPost() {
  return dispatch => {
    dispatch({ type: postActionTypes.CLEAR_POST })
  }
}

function updatePostHtml(content) {
  return dispatch => dispatch({ type: postActionTypes.UPDATE_EDITOR_STATE, content});
}