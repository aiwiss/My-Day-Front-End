import axios from 'axios';
import { store } from '../redux/store';

// TODO: replace with config
const api = 'https://my-day-server.herokuapp.com';

// export functions
export const postService = {
  getAll,
  getUserPosts,
  create,
  update,
  remove,
  getFavoriteUserPosts,
  removeAllByUser
};

function getAll(page, limit) {
  const options = _getRequestOptions();

  return axios.get(`${api}/posts?page=${page}&limit=${limit}`, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function getUserPosts(username) {
  const options = _getRequestOptions();

  return axios.get(`${api}/posts/user-posts/${username}`, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function getFavoriteUserPosts(username) {
  const options = _getRequestOptions();

  return axios.get(`${api}/posts/favorite-posts/${username}`, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function create(postData) {
  const options = _getRequestOptions();

  return axios.post(`${api}/posts/create`, postData, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function update(postData) {
  const options = _getRequestOptions();

  return axios.put(`${api}/posts/${postData._id}`, postData, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function remove(id) {
  const options = _getRequestOptions();

  return axios.delete(`${api}/posts/${id}`, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error))
}

function removeAllByUser(username) {
  const options = _getRequestOptions();
  return axios.delete(`${api}/posts/admin/all/${username}`, options)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function _getRequestOptions() {
  const user = store.getState().userState.user;
  const options = {
    headers: {'Authorization': `Bearer ${user.token}`}
  }
  return options;
}