import { auth, firestore as db } from '../../firebase'
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from './user.constants'
import { roles, statuses } from '../../constants/User'
import { createAction } from 'redux-actions'

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
      /*
       TODO: verification working already except for the redirect (continueURL)
      */
      await user.sendEmailVerification()
      dispatch(createAction(SIGNUP_SUCCESS))
    } catch (error) {
      dispatch(createAction(SIGNUP_FAILED)(error.message))
    }
  }
}
