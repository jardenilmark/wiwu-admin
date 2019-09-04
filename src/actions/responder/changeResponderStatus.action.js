import _ from 'lodash'
import { message } from 'antd'
import { firestore as db } from '../../firebase'
import { CHANGE_RESPONDER_STATUS } from './responder.constants'
import { createAction } from 'redux-actions'

export const changeResponderStatus = (id, status) => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update({ status: status })

      const {
        admin: { responders }
      } = getState()

      const index = _.findIndex(responders, e => e.id === id)
      const editedResponders = [...responders]
      editedResponders[index].status = status

      message.success('Responder status changed successfully!', 10)
      dispatch(createAction(CHANGE_RESPONDER_STATUS)(editedResponders))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
