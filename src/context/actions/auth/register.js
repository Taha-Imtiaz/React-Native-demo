import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInstance';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default ({
    email,
    password,
    userName: username,
    firstName: first_name,
    lastName: last_name,
  }) =>
  dispatch =>
  async onSuccess => {
    dispatch({
      type: REGISTER_LOADING,
    });
    try {
      let response = await axiosInstace.post(`auth/register`, {
        email,
        password,
        username,
        first_name,
        last_name,
      });
      // console.log('🚀 ~ file: register.js ~ line 34 ~ response', response.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      onSuccess(response.data);
    } catch (error) {
      // console.log(
      //   '🚀 ~ file: register.js ~ line 47 ~ error',
      //   error.response.data,
      // );
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response
          ? error.response.data
          : {
              error: 'Something Went Wrong try again later',
            },
      });
    }
  };
