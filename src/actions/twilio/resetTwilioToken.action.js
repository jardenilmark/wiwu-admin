import {
  RESET_TWILIO_TOKEN_SUCCESS,
  RESET_TWILIO_TOKEN_FAILED
} from './twilio.constants'
import { createAction } from 'redux-actions'

export const resetTwilioToken = () => {
  return dispatch => {
    try {
      dispatch(createAction(RESET_TWILIO_TOKEN_SUCCESS)())
    } catch (error) {
      dispatch(createAction(RESET_TWILIO_TOKEN_FAILED)(error.message))
    }
  }
}
