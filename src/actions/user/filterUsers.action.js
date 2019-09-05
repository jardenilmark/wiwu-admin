import { createAction } from 'redux-actions'

import { FILTER_USERS } from './user.constants'

export const filterUsers = (users, filter) => {
  return dispatch => {
    let result = users
    if (filter !== 'all') {
      result = users.filter(user => user.status === filter)
    }
    dispatch(createAction(FILTER_USERS)(result))
  }
}
