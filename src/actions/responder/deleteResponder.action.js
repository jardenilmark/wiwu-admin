import { firestore as db } from '../../firebase'
import {
  DELETE_RESPONDER_FAILED,
  DELETE_RESPONDER_SUCCESS
} from './responder.constants'
import { createAction } from 'redux-actions'
import { fetchResponders } from './fetchResponders.action'

export const deleteResponder = userID => {
  /* 
    TODO: For now only user details from the users collection is deleted.
    Firebase Auth requires that the user must input his/her credentials 
    before his/her account gets deleted
  */
  return async dispatch => {
    try {
      await db
        .collection('users')
        .doc(userID)
        .delete()
      dispatch(fetchResponders())
      dispatch(createAction(DELETE_RESPONDER_SUCCESS)())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(DELETE_RESPONDER_FAILED)(error.message))
    }
  }
}
