import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { DELETE_USER } from './user.constants'

export const deleteUser = userId => {
  /* 
    TODO: For now only user details from the users collection is deleted.
    Firebase Auth requires that the user must input his/her credentials 
    before his/her account gets deleted
  */
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(userId)
        .delete()

      const {
        admin: { users }
      } = getState()
      const payload = users.filter(e => e.id !== userId)

      message.success('User deleted successfully!', 10)

      dispatch(createAction(DELETE_USER)(payload))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 10)
    }
  }
}
