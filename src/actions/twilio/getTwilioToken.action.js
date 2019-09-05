import { message } from 'antd'
import { createAction } from 'redux-actions'

import { GET_TWILIO_TOKEN } from './twilio.constants'

export const getTwilioToken = (identity, roomName) => {
  return async dispatch => {
    try {
      const tokenURL = `https://silver-hawk-9950.twil.io/video-token?identity=${identity}&roomName=${roomName}`

      const res = await fetch(tokenURL)
      const responseValues = await res.json()

      dispatch(createAction(GET_TWILIO_TOKEN)(responseValues.token))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
