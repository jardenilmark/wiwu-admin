import { message } from 'antd'
import { createAction } from 'redux-actions'

import { RESET_TWILIO_TOKEN } from './twilio.constants'

export const resetTwilioToken = () => {
  return dispatch => {
    try {
      dispatch(createAction(RESET_TWILIO_TOKEN)())
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
