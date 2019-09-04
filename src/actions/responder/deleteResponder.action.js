import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { DELETE_RESPONDER } from './responder.constants'

export const deleteResponder = responderId => {
  /* 
    TODO: For now only responder details from the users collection is deleted.
    Firebase Auth requires that the user must input his/her credentials 
    before his/her account gets deleted
  */
  return async (dispatch, getState) => {
    try {
      await db
        .collection('users')
        .doc(responderId)
        .delete()

      const {
        admin: { responders }
      } = getState()
      const payload = responders.filter(e => e.id !== responderId)

      dispatch(createAction(DELETE_RESPONDER)(payload))
    } catch (error) {
      alert(error.message)
      message.error(error.message, 10)
    }
  }
}
