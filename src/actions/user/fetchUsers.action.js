import { firestore as db } from '../../firebase'
import { FETCH_USERS_FAILED, FETCH_USERS_SUCCESS } from './user.constants'
import { roles } from '../../constants/User'
import { createAction } from 'redux-actions'

export const fetchUsers = () => {
  let users = []
  return async dispatch => {
    try {
      const usersRef = await db
        .collection('users')
        .where('role', '==', roles.USER)
        .get()
      users = usersRef.docs.map(user => {
        return { ...user.data(), id: user.id }
      })
      dispatch(createAction(FETCH_USERS_SUCCESS)(users))
    } catch (error) {
      dispatch(createAction(FETCH_USERS_FAILED)(error.message))
    }
  }
}
