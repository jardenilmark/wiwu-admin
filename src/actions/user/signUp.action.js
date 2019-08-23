import { auth, firestore as db, secondaryAuth } from '../../firebase'
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from './user.constants'
import { statuses, roles } from '../../constants/User'
import { createAction } from 'redux-actions'

export const signUp = ({ emailAddress, password, ...rest }) => {
  const whichAuth = rest.role === roles.ADMIN ? auth : secondaryAuth
  console.log(rest)
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
      /** TODO: instead of passing through the web widget
       *  and clicing the continue button to redirect, implement
       *  that it automatically redirects to the Home Screen
       */
      const actionCodeSettings = {
        url: 'http://localhost:3000/'
      }

      await user.sendEmailVerification(actionCodeSettings)
      if (rest.role === roles.RESPONDER) {
        whichAuth.signOut()
      }
      dispatch(createAction(SIGNUP_SUCCESS)())
    } catch (error) {
      dispatch(createAction(SIGNUP_FAILED)(error.message))
    }
  }
}
