import { combineReducers } from 'redux'
import user from './user.reducer'
import navigation from './navigation.reducer'

export default combineReducers({
  user,
  navigation
})
