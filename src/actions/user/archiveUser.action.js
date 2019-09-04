import _ from 'lodash'
import { message } from 'antd'
import { firestore as db } from '../../firebase'
import { ARCHIVE_USER } from './user.constants'
import { createAction } from 'redux-actions'
import { statuses } from '../../constants/User'

export const archiveUser = id => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update({ status: statuses.ARCHIVED })

      const {
        admin: { users }
      } = getState()

      const index = _.findIndex(users, e => e.id === id)
      const editedUsers = [...users]
      editedUsers[index].status = statuses.ARCHIVED

      message.success('User archived successfully!', 10)
      dispatch(createAction(ARCHIVE_USER)(editedUsers))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
