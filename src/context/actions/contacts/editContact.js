import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EDIT_CONTACT_FAIL,
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInstance';

export default (form, id) => dispatch => async onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: EDIT_CONTACT_LOADING,
  });
  try {
    const response = await axiosInstace.put(`contacts/${id}`, requestPayload);
    dispatch({
      type: EDIT_CONTACT_SUCCESS,
      payload: response.data,
    });
    console.log(
      '🚀 ~ file: EDITContact.js ~ line 23 ~ response',
      JSON.stringify(response.data),
    );
    onSuccess(response.data);
  } catch (error) {
    dispatch({
      type: EDIT_CONTACT_FAIL,
      payload: error.response
        ? error.response.data
        : {
            error: 'Something Went Wrong try again later',
          },
    });
  }
};
