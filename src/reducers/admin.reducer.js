import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILED,
  SET_AUTH_DETAILS
} from '../actions/admin/admin.constants'
import {
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  DELETE_USER_FAILED,
  DELETE_USER_SUCCESS,
  SEARCH_USERS
} from '../actions/user/user.constants'
import {
  FETCH_RESPONDERS_SUCCESS,
  FETCH_RESPONDERS_FAILED,
  EDIT_RESPONDER_FAILED,
  EDIT_RESPONDER_SUCCESS,
  DELETE_RESPONDER_FAILED,
  DELETE_RESPONDER_SUCCESS,
  CREATE_RESPONDER_SUCCESS,
  CREATE_RESPONDER_FAILED,
  SEARCH_RESPONDERS
} from '../actions/responder/responder.constants'
import {
  FETCH_CONTACTS_FAILED,
  FETCH_CONTACTS_SUCCESS,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILED,
  CREATE_CONTACT_SUCCESS,
  EDIT_CONTACT_FAILED,
  EDIT_CONTACT_SUCCESS,
  SEARCH_CONTACTS
} from '../actions/contact/contact.constants'
import { message } from 'antd'

const initialState = {
  current: null,
  loading: true,
  authenticated: false,
  responders: [],
  filteredResponders: null,
  users: [],
  filteredUsers: null,
  contacts: [],
  filteredContacts: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state
      }
    case SIGNIN_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case SIGNUP_SUCCESS:
      return {
        ...state
      }
    case SIGNUP_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state
      }
    case SIGNOUT_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case SET_AUTH_DETAILS:
      const { user, loading, authenticated } = action.payload
      return {
        ...state,
        current: user,
        loading,
        authenticated
      }
    case CREATE_RESPONDER_SUCCESS:
      message.success('Responder created successfully!', 10)
      return {
        ...state
      }
    case CREATE_RESPONDER_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case EDIT_RESPONDER_SUCCESS:
      message.success('Responder updated successfully!', 10)
      return {
        ...state
      }
    case EDIT_RESPONDER_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case DELETE_RESPONDER_SUCCESS:
      message.success('Responder deleted successfully!', 10)
      return {
        ...state
      }
    case DELETE_RESPONDER_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case FETCH_RESPONDERS_SUCCESS:
      return {
        ...state,
        responders: action.payload
      }
    case FETCH_RESPONDERS_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case SEARCH_RESPONDERS:
      return {
        ...state,
        filteredResponders: action.payload
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      }
    case FETCH_USERS_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case DELETE_USER_SUCCESS:
      message.success('User deleted successfully!', 10)
      return {
        ...state
      }
    case DELETE_USER_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case SEARCH_USERS:
      return {
        ...state,
        filteredUsers: action.payload
      }
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
    case SEARCH_CONTACTS:
      return {
        ...state,
        filteredContacts: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
