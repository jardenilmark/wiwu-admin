import { auth, firestore as db, secondaryAuth } from '../../firebase'
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from './user.constants'
import { fetchResponders } from './fetchResponders.action'
import { statuses, roles } from '../../constants/User'
import { createAction } from 'redux-actions'

export const signUp = ({ emailAddress, password, ...rest }) => {
  const whichAuth = rest.role === roles.ADMIN ? auth : secondaryAuth
  return async dispatch => {
    try {
      await whichAuth.createUserWithEmailAndPassword(emailAddress, password)
      const user = whichAuth.currentUser
      await db
        .collection('users')
        .doc(user.uid)
        .set({
          ...rest,
          status: statuses.ACTIVE,
          emergencies: []
        })

      const actionCodeSettings = {
        url: 'http://localhost:3000/'
      }

      await user.sendEmailVerification(actionCodeSettings)
      if (rest.role === roles.RESPONDER) {
        whichAuth.signOut()
        dispatch(fetchResponders())
      }
      dispatch(createAction(SIGNUP_SUCCESS)())
    } catch (error) {
      dispatch(createAction(SIGNUP_FAILED)(error.message))
    }
  }
}
