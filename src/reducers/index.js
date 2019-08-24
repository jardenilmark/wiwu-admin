import { combineReducers } from 'redux'
import user from './user.reducer'
import responder from './responder.reducer'

export default combineReducers({
  user,
  responder
})
