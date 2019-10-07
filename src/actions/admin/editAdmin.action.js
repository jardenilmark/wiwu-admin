import _ from 'lodash'
import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'
import { EDIT_ADMIN } from './admin.constants'

export const editAdmin = ({ firstName, lastName, ...rest }, id) => {
  const values = {
    firstName: _.capitalize(firstName),
    lastName: _.capitalize(lastName),
    ...rest
  }

  return async dispatch => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update(values)

      message.success('Admin updated successfully!', 5)
      dispatch(createAction(EDIT_ADMIN)())
    } catch (error) {
      alert(error.message)
      message.error(error.message, 5)
    }
  }
}
