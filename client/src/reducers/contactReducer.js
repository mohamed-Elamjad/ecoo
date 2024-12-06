import {
  ALL_CONTACTS_FAIL,
  ALL_CONTACTS_REQUEST,
  ALL_CONTACTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  NEW_CONTACT_FAIL,
  NEW_CONTACT_REQUEST,
  NEW_CONTACT_SUCCESS,
} from "../constants/contactConstants";

const initialState = {
  loading: false,
  contacts: [],
  contact: {},
  isDeleted: false,
  error: null,
  success: false,
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    // New Contact
    case NEW_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        contact: action.payload.contact,
      };
    case NEW_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Contact
    case DELETE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Get All Contacts
    case ALL_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
        contacts: [],
      };
    case ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case ALL_CONTACTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
