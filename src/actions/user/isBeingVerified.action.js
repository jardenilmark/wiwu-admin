import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { IS_BEING_VERIFIED } from './user.constants'

export const isBeingVerified = (id, isBeingVerified) => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update({ isBeingVerified: isBeingVerified })
      const {
        admin: { users }
      } = getState()

      const index = _.findIndex(users, e => e.id === id)
      const editedUsers = [...users]
      editedUsers[index].isBeingVerified = isBeingVerified
      dispatch(createAction(IS_BEING_VERIFIED)(editedUsers))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
