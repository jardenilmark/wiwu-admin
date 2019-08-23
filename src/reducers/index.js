import { combineReducers } from 'redux'
import user from './user.reducer'
import layout from './layout.reducer'
import responder from './responder.reducer'

export default combineReducers({
  user,
  layout,
  responder
})
