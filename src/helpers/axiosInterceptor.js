import axios from 'axios';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import env from '../config/env';

let headers = {};
// create axios instace
const axiosInstace = axios.create({
  baseURL: env.DEV_BACKEND_URL,
  headers,
});
// create interceptor to add anything /modify a request
axiosInstace.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
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
