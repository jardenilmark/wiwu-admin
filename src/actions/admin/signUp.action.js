import { auth, firestore as db } from '../../firebase'
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from './admin.constants'
import { statuses, roles } from '../../constants/User'
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

      const actionCodeSettings = {
        url: 'http://localhost:3000/'
      }

      await user.sendEmailVerification(actionCodeSettings)
      dispatch(createAction(SIGNUP_SUCCESS)())
    } catch (error) {
      dispatch(createAction(SIGNUP_FAILED)(error.message))
    }
  }
}
