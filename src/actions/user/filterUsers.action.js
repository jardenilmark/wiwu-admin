import { FILTER_USERS } from './user.constants'
import { createAction } from 'redux-actions'

export const filterUsers = (users, filter) => {
  return dispatch => {
    let result = users
    if (filter !== 'all') {
      result = users.filter(user => user.status === filter)
    }
    dispatch(createAction(FILTER_USERS)(result))
  }
}
