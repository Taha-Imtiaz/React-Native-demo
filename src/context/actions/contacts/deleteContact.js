import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInstance';

export default id => dispatch => async onSuccess => {
  console.log('🚀 ~ file: deleteContact.js ~ line 10 ~ id', id);
  dispatch({
    type: DELETE_CONTACT_LOADING,
  });
  try {
    const response = await axiosInstace.delete(`contacts/${id}`);
    // console.log("🚀 ~ file: getContacts.js ~ line 15 ~ response", JSON.stringify(response.data))
    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: id,
    });
    onSuccess();
  } catch (error) {
    dispatch({
      type: DELETE_CONTACT_FAIL,
      payload: error.response
        ? error.response.data
        : {
            error: 'Something Went Wrong try again later',
          },
    });
  }
};
