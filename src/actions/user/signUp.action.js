import { auth, firestore as db } from '../../firebase'
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from './user.constants'
import { roles, statuses } from '../../constants/User'

export const signUp = ({ emailAddress, password, ...rest }) => {
  return async dispatch => {
    try {
      await auth.createUserWithEmailAndPassword(emailAddress, password)
      const user = auth.currentUser
      await db
        .collection('users')
        .doc(user.uid)
        .set({
          ...rest,
          role: roles.ADMIN,
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
      dispatch({
        type: SIGNUP_SUCCESS
      })
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILED,
        payload: error.message
      })
    }
  }
}
