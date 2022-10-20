import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_USER} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInterceptor';

export default () => async dispatch => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');

  dispatch({
    type: LOGOUT_USER,
  });
};
