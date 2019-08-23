import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  SET_AUTH_DETAILS,
  GET_TWILIO_TOKEN_SUCCESS,
  GET_TWILIO_TOKEN_FAILED,
  RESET_TWILIO_TOKEN_SUCCESS,
  RESET_TWILIO_TOKEN_FAILED
} from '../actions/user/user.constants.js'
import { message } from 'antd'

const initialState = {
  user: null,
  loading: true,
  authenticated: false,
  token: ''
}

export default function reducer(state = initialState, action) {
  let token
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
        ...state,
        user,
        loading,
        authenticated
      }
    case GET_TWILIO_TOKEN_SUCCESS:
      token = action.payload
      return {
        ...state,
        token
      }
    case GET_TWILIO_TOKEN_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case RESET_TWILIO_TOKEN_SUCCESS:
      token = action.payload
      return {
        ...state,
        token
      }
    case RESET_TWILIO_TOKEN_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    default:
      return state
  }
}
