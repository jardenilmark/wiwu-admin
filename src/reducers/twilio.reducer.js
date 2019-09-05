import {
  GET_TWILIO_TOKEN_SUCCESS,
  GET_TWILIO_TOKEN_FAILED,
  RESET_TWILIO_TOKEN_SUCCESS,
  RESET_TWILIO_TOKEN_FAILED
} from '../actions/twilio/twilio.constants.js'
import { message } from 'antd'

const initialState = {
  token: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TWILIO_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload
      }
    case GET_TWILIO_TOKEN_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case RESET_TWILIO_TOKEN_SUCCESS:
      return {
        initialState
      }
    case RESET_TWILIO_TOKEN_FAILED:
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
