import { firestore as db } from '../../firebase'
import { ARCHIVE_USER_FAILED, ARCHIVE_USER_SUCCESS } from './user.constants'
import { createAction } from 'redux-actions'
import { fetchUsers } from './fetchUsers.action'

export const archiveUser = userId => {
  return async dispatch => {
    try {
      await db
        .collection('users')
        .doc(userId)
        .delete()
      dispatch(fetchUsers())
      dispatch(createAction(ARCHIVE_USER_SUCCESS)())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(ARCHIVE_USER_FAILED)(error.message))
    }
  }
}
