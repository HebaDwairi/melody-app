import axios from 'axios';
const baseUrl = '/api/login';


const login = (credintials) => {
  return axios
    .post(baseUrl, credintials)
    .then(res => (
      res.data
    ));
}

export default { login };