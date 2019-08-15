import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  SET_AUTH_DETAILS
} from '../actions/user/user.constants.js'
import { message } from 'antd'

const initialState = {
  current: null,
  loading: true,
  authenticated: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state
      }
    case SIGNUP_SUCCESS:
      return {
        ...state
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      }
    case LOGIN_FAILED:
      message.error(action.payload, 10)
      return {
        ...initialState
      }
    case SIGNUP_FAILED:
      message.error(action.payload, 10)
      return {
        ...initialState
      }
    case SET_AUTH_DETAILS:
      const { user, loading, authenticated } = action.payload
      return {
        ...initialState,
        current: user,
        loading: loading,
        authenticated: authenticated
      }
    default:
      return state
  }
}
