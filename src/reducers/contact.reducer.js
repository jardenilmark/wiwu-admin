import {
  FETCH_CONTACTS_FAILED,
  FETCH_CONTACTS_SUCCESS,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILED,
  CREATE_CONTACT_SUCCESS,
  EDIT_CONTACT_FAILED,
  EDIT_CONTACT_SUCCESS,
  TOGGLE_EDIT_MODAL,
  SET_CLICKED_CONTACT
} from '../actions/contact/contact.constants'
import { message } from 'antd'

const initialState = {
  clickedContact: null,
  editModalVisibility: false,
  contacts: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload
      }
    case FETCH_CONTACTS_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case DELETE_CONTACT_SUCCESS:
      message.success('Contact deleted successfully!', 10)
      return {
        ...state
      }
    case DELETE_CONTACT_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case CREATE_CONTACT_SUCCESS:
      message.success('Contact created successfully!', 10)
      return {
        ...state
      }
    case CREATE_CONTACT_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case EDIT_CONTACT_SUCCESS:
      message.success('Contact updated successfully!', 10)
      return {
        ...state
      }
    case EDIT_CONTACT_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        editModalVisibility: !state.editModalVisibility
      }
    case SET_CLICKED_CONTACT:
      return {
        ...state,
        clickedContact: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
