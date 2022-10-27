import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInstance';

export default form => dispatch => async onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };
  dispatch({
    type: CREATE_CONTACT_LOADING,
  });
  try {
    const response = await axiosInstace.post('contacts/', requestPayload);
    console.log(
      '🚀 ~ file: createContact.js ~ line 23 ~ response',
      JSON.stringify(response.data),
    );
    dispatch({
      type: CREATE_CONTACT_SUCCESS,
      payload: response.data,
    });
    onSuccess();
  } catch (error) {
    console.log('🚀 ~ file: createContact.js ~ line 33 ~ error', error);
    dispatch({
      type: CREATE_CONTACT_FAIL,
      payload: error.response
        ? error.response.data
        : {
            error: 'Something Went Wrong try again later',
          },
    });
  }
};
