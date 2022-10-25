import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from '../config/env';
import { LOGOUT} from '../constants/routeNames';
import {navigate} from '../navigations/SideMenu/RootNavigator';

let headers = {};
// console.log(env.DEV_BACKEND_URL);
// create axios instace
const axiosInstace = axios.create({
  baseURL: 'https://truly-contacts.herokuapp.com/api/',
  headers,
});
// create request interceptor to add anything /modify a request
axiosInstace.interceptors.request.use(
  async config => {
    // navigate(CREATE_CONTACT);

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

// create response interceptor
axiosInstace.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      //error is not from server (error from client)
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    //error is from server
    if (error.response.status === 403) {
      navigate(LOGOUT, {
        tokenExpired: true,
      });
    } else {
      //error is not from server (error from client)
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);
export default axiosInstace;
