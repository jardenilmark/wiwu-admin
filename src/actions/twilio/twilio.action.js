import {
  GET_TWILIO_TOKEN_SUCCESS,
  GET_TWILIO_TOKEN_FAILED,
  RESET_TWILIO_TOKEN_SUCCESS,
  RESET_TWILIO_TOKEN_FAILED
} from './twilio.constants'
import { createAction } from 'redux-actions'

export const getTwilioToken = (identity, roomName) => {
  return async dispatch => {
    try {
      const tokenURL = `https://silver-hawk-9950.twil.io/video-token?identity=${identity}&roomName=${roomName}`
      const res = await fetch(tokenURL)
      const responseValues = await res.json()
      dispatch(createAction(GET_TWILIO_TOKEN_SUCCESS)(responseValues.token))
    } catch (error) {
      dispatch(createAction(GET_TWILIO_TOKEN_FAILED))
    }
  }
}

export const resetTwilioToken = () => {
  return dispatch => {
    try {
      dispatch(createAction(RESET_TWILIO_TOKEN_SUCCESS)(''))
    } catch (error) {
      dispatch(createAction(RESET_TWILIO_TOKEN_FAILED)(error.message))
    }
  }
}
