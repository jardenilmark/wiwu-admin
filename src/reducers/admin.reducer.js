import {
  SIGNIN,
  SIGNUP,
  SET_AUTH_DETAILS,
  SIGNOUT
} from '../actions/admin/admin.constants'
import {
  GET_USERS,
  DELETE_USER,
  SEARCH_USERS,
  CHANGE_USER_STATUS
} from '../actions/user/user.constants'
import {
  GET_RESPONDERS,
  EDIT_RESPONDER,
  DELETE_RESPONDER,
  CREATE_RESPONDER,
  SEARCH_RESPONDERS,
  CHANGE_RESPONDER_STATUS,
  FILTER_RESPONDERS
} from '../actions/responder/responder.constants'
import {
  GET_CONTACTS,
  DELETE_CONTACT,
  CREATE_CONTACT,
  EDIT_CONTACT,
  SEARCH_CONTACTS,
  FILTER_CONTACTS
} from '../actions/contact/contact.constants'

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
    case SIGNIN:
      return {
        ...state,
        current: action.payload
      }
    case SIGNUP:
      return {
        ...state,
        current: action.payload
      }
    case SIGNOUT:
      return {
        ...initialState
      }
    case SET_AUTH_DETAILS:
      const { userPayload, loading, authenticated } = action.payload

      return {
        ...state,
        current: userPayload,
        loading,
        authenticated
      }
    case CREATE_RESPONDER:
      return {
        ...state,
        responders: [...state.responders, action.payload]
      }
    case EDIT_RESPONDER:
      return {
        ...state,
        responders: action.payload
      }
    case DELETE_RESPONDER:
      return {
        ...state,
        responders: action.payload
      }
    case CHANGE_RESPONDER_STATUS:
      return {
        ...state,
        responders: action.payload
      }
    case GET_RESPONDERS:
      return {
        ...state,
        responders: action.payload
      }
    case SEARCH_RESPONDERS:
      return {
        ...state,
        filteredResponders: action.payload
      }
    case FILTER_RESPONDERS:
      return {
        ...state,
        filteredResponders: action.payload
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case DELETE_USER:
      return {
        ...state,
        users: action.payload
      }
    case SEARCH_USERS:
      return {
        ...state,
        filteredUsers: action.payload
      }
    case CHANGE_USER_STATUS:
      return {
        ...state,
        users: action.payload
      }
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: action.payload
      }
    case SEARCH_CONTACTS:
      return {
        ...state,
        filteredContacts: action.payload
      }
    case FILTER_CONTACTS:
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
