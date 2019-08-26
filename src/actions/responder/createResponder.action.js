import { firestore as db, secondaryAuth } from '../../firebase'
import {
  CREATE_RESPONDER_SUCCESS,
  CREATE_RESPONDER_FAILED
} from './responder.constants'
import { fetchResponders } from '../responder/fetchResponders.action'
import { statuses, roles } from '../../constants/User'
import { createAction } from 'redux-actions'

export const createResponder = ({ emailAddress, password, ...rest }) => {
  return async dispatch => {
    try {
      await secondaryAuth.createUserWithEmailAndPassword(emailAddress, password)
      const user = secondaryAuth.currentUser
      await db
        .collection('users')
        .doc(user.uid)
        .set({
          ...rest,
          role: roles.RESPONDER,
          status: statuses.ACTIVE,
          emergencies: []
        })

      const actionCodeSettings = {
        url: 'http://localhost:3000/'
      }

      await user.sendEmailVerification(actionCodeSettings)
      await secondaryAuth.signOut()
      dispatch(fetchResponders())
      dispatch(createAction(CREATE_RESPONDER_SUCCESS)())
    } catch (error) {
      dispatch(createAction(CREATE_RESPONDER_FAILED)(error.message))
    }
  }
}
