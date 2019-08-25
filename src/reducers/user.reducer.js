import {
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS
} from '../actions/user/user.constants.js'
import { message } from 'antd'

const initialState = {
  users: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return {
        ...state
      }
  }
}
