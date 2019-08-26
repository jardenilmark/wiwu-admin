import { firestore as db } from '../../firebase'
import { DELETE_USER_FAILED, DELETE_USER_SUCCESS } from './user.constants'
import { createAction } from 'redux-actions'
import { fetchUsers } from './fetchUsers.action'

export const deleteUser = userId => {
  /* 
    TODO: For now only user details from the users collection is deleted.
    Firebase Auth requires that the user must input his/her credentials 
    before his/her account gets deleted
  */
  return async dispatch => {
    try {
      await db
        .collection('users')
        .doc(userId)
        .delete()
      dispatch(fetchUsers())
      dispatch(createAction(DELETE_USER_SUCCESS)())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(DELETE_USER_FAILED)(error.message))
    }
  }
}
