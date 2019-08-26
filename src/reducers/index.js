import { combineReducers } from 'redux'
import user from './user.reducer'
import responder from './responder.reducer'
import admin from './admin.reducer'
import contact from './contact.reducer'
import twilio from './twilio.reducer'

export default combineReducers({
  user,
  responder,
  admin,
  contact,
  twilio
})
