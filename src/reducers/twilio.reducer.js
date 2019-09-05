import {
  GET_TWILIO_TOKEN,
  RESET_TWILIO_TOKEN
} from '../actions/twilio/twilio.constants.js'

const initialState = {
  token: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TWILIO_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case RESET_TWILIO_TOKEN:
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}
