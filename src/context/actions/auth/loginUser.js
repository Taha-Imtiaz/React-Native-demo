import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInterceptor';

export default ({password, userName: username}) =>
  async dispatch => {
    dispatch({
      type: LOGIN_START,
    });
    try {
      let response = await axiosInstace.post(`auth/login`, {
        password,
        username,
      });
      console.log('🚀 ~ file: login.js ~ line 34 ~ response', response.data);
      // set token in async storage
      AsyncStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log('🚀 ~ file: login.js ~ line 47 ~ error', error.response.data);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response
          ? error.response.data
          : {
              error: 'Something Went Wrong try again later',
            },
      });
    }
  };
