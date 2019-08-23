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
  RESET_TWILIO_TOKEN_FAILED,
  FETCH_RESPONDERS_SUCCESS,
  FETCH_RESPONDERS_FAILED
} from '../actions/user/user.constants.js'
import { message } from 'antd'

const initialState = {
  current: null,
  loading: true,
  authenticated: false,
  responders: [],
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
        ...state
      }
    case LOGIN_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case SIGNUP_FAILED:
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
        ...state,
        current: user,
        loading: loading,
        authenticated: authenticated
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
    default:
      return state
  }
}
