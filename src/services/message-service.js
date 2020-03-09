import axios from 'axios';
import { store } from '../redux/store';

// TODO: replace with config
// const api = 'https://my-day-server.herokuapp.com';
const api = 'http://localhost:4000';

export const messageService = {
  getUserMessages,
  create,
  removeAllByUser
};


function getUserMessages(username) {
  const options = _getRequestOptions();
  return axios.get(`${api}/messages/${username}`, options)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function create(messageData) {
  const options = _getRequestOptions();
  return axios.post(`${api}/messages/create`, messageData, options)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function removeAllByUser(username) {
  const options = _getRequestOptions();
  return axios.delete(`${api}/messages/admin/all/${username}`, options)
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