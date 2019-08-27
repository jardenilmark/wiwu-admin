import { firestore as db } from '../../firebase'
import {
  EDIT_RESPONDER_FAILED,
  EDIT_RESPONDER_SUCCESS
} from './responder.constants'
import { createAction } from 'redux-actions'
import { fetchResponders } from './fetchResponders.action'

export const editResponder = (values, id) => {
  return async dispatch => {
    try {
      await db
        .collection('users')
        .doc(id)
        .update(values)
      dispatch(createAction(EDIT_RESPONDER_SUCCESS)())
      dispatch(fetchResponders())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(EDIT_RESPONDER_FAILED)(error.message))
    }
  }
}
