import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_CONTACTS_FAIL,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInstance';

export default () => async dispatch => {
  dispatch({
    type: GET_CONTACTS_LOADING,
  });
  try {
    const response = await axiosInstace.get('contacts/');
    console.log(`response ${JSON.stringify(response, null, 4)}`);
    dispatch({
      type: GET_CONTACTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONTACTS_FAIL,
      payload: error.response
        ? error.response.data
        : {
            error: 'Something Went Wrong try again later',
          },
    });
  }
};
