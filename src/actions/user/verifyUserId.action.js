import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { VERIFY_USER_ID } from './user.constants'

export const verifyUserId = id => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update({ hasValidId: true })
      const {
        admin: { users }
      } = getState()

      const index = _.findIndex(users, e => e.id === id)
      const editedUsers = [...users]
      editedUsers[index].hasValidId = true

      message.success('Verified user ID successfully!', 5)
      dispatch(createAction(VERIFY_USER_ID)(editedUsers))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
