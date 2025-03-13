const baseUrl = '/api/users';
import axios from 'axios';

const create = (userObj) => {
  const req = axios.post(baseUrl, userObj);
  return req.then(res => res.data);
}

export default {
  create, 
}