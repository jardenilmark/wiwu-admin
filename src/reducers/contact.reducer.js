import {
  FETCH_CONTACTS_FAILED,
  FETCH_CONTACTS_SUCCESS,
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILED,
  CREATE_CONTACT_SUCCESS
} from '../actions/contact/contact.constants'
import { message } from 'antd'

const initialState = {
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
    default:
      return {
        ...state
      }
  }
}
