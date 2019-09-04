import { firestore as db } from '../../firebase'
import {
  ARCHIVE_RESPONDER_FAILED,
  ARCHIVE_RESPONDER_SUCCESS
} from './responder.constants'
import { createAction } from 'redux-actions'
import { fetchResponders } from './fetchResponders.action'

export const archiveResponder = responderId => {
  return async dispatch => {
    try {
      await db
        .collection('users')
        .doc(responderId)
        .update({ archived: true })
      dispatch(fetchResponders())
      dispatch(createAction(ARCHIVE_RESPONDER_SUCCESS)())
    } catch (error) {
      alert(error.message)
      dispatch(createAction(ARCHIVE_RESPONDER_FAILED)(error.message))
    }
  }
}
