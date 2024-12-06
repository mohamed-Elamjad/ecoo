import axios from "axios";
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

// Get all contacts
export const getAllContacts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CONTACTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/contacts`);

    dispatch({
      type: ALL_CONTACTS_SUCCESS,
      payload: data.contacts,
    });
  } catch (error) {
    dispatch({
      type: ALL_CONTACTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create Contact
export const createContact = (contactData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CONTACT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/contact/new`,
      contactData,
      config
    );

    dispatch({
      type: NEW_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete a contact
export const deleteContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/contact/${id}`);

    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
