import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from '../config/env';

let headers = {};
// console.log(env.DEV_BACKEND_URL);
// create axios instace
const axiosInstace = axios.create({
  baseURL: 'https://truly-contacts.herokuapp.com/api/',
  headers,
});
// create interceptor to add anything /modify a request
axiosInstace.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    // console.log(`JWT token ${token}`);
    // if toke then add authorization header
    if (token) {
      config.headers.Authorization = ` Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export default axiosInstace;
