import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.105:3100/api'
})
export default api;
