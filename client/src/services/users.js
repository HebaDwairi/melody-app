const baseUrl = '/api/users';
import axios from 'axios';

const token = null;

const setToken = (token) => {
  token = `Bearer ${token}`;
}

const create = (userObj) => {
  const req = axios.post(baseUrl, userObj);
  return req.then(res => res.data);
}


export default {
  create, 
  setToken,
}