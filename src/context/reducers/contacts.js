import {
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from '../../constants/actionTypes';

const contacts = (state, {type, payload}) => {
  switch (type) {
    case CREATE_CONTACT_LOADING:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          error: null,
          loading: true,
        },
      };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          error: null,
          loading: false,
          data: payload,
        },
        getContacts: {
          ...state.getContacts,
          error: null,
          data: [payload,...state.getContacts.data ],
          loading: false,
        },
      };
    case CREATE_CONTACT_FAIL:
      return {
        ...state,
        createContact: {
          ...state.createContact,
          error: payload,
          loading: false,
        },
      };
    case GET_CONTACTS_LOADING:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          error: null,
          loading: true,
        },
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          error: null,
          data: payload,
          loading: false,
        },
      };
    case GET_CONTACTS_FAIL:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          error: payload,
          loading: false,
        },
      };
    default:
      return state;
  }
};
export default contacts;
