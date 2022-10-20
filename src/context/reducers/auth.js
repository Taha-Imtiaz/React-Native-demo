import {
  CLEAR_AUTH_STATE,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../constants/actionTypes';

const auth = (state, {type, payload}) => {
  switch (type) {
    case LOGIN_START:

    case REGISTER_LOADING:
      // console.log('🚀 ~ file: auth.js ~ line 8 ~ auth ~ state', state);
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      // console.log(`State success ${state}`);
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case LOGIN_SUCCESS:
      // console.log(`State success ${state}`);
      return {
        ...state,
        loading: false,
        data: payload,
        isLoggedIn: true,
      };

      case LOGOUT_USER:
        return {
          ...state,
          loading: false,
          data: null,
          isLoggedIn: false,
        };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      // console.log(`State fail ${state}`);

      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        loading: false,
        data: null,
        error: null,
      };
    default:
      return state;
  }
};
export default auth;
