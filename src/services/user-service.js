import axios from 'axios';
import { store } from '../redux/store';

// TODO: replace with config
const api = 'http://localhost:4000';

export const userService = {
  login,
  signup,
  update,
  remove,
  validate,
  getAll
};


function login(username, password) {
  return axios.post(`${api}/users/login`, {username, password})
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function signup(userData) {
  return axios.post(`${api}/users/register`, userData)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function validate(username, password) {
  return axios.post(`${api}/users/login`, {username, password})
    // .then(res => res.data)
    // .catch(err => Promise.reject(err));
}

function update(userData) {
  const options = _getRequestOptions();
  return axios.put(`${api}/users/${userData._id}`, userData, options)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function remove(id) {
  const options = _getRequestOptions();
  return axios.delete(`${api}/users/${id}`, options)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getAll(id) {
  const options = _getRequestOptions();
  return axios.get(`${api}/users/admin/all/${id}`, options)
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