import { firestore as db } from '../../firebase'
import {
  FETCH_RESPONDERS_FAILED,
  FETCH_RESPONDERS_SUCCESS
} from './responder.constants'
import { roles } from '../../constants/User'
import { createAction } from 'redux-actions'

export const fetchResponders = () => {
  let responders = []
  return async dispatch => {
    try {
      const respondersRef = await db
        .collection('users')
        .where('role', '==', roles.RESPONDER)
        .get()
      responders = respondersRef.docs.map(responder => {
        return { ...responder.data(), id: responder.id }
      })
      dispatch(createAction(FETCH_RESPONDERS_SUCCESS)(responders))
    } catch (error) {
      dispatch(createAction(FETCH_RESPONDERS_FAILED)(error.message))
    }
  }
}
