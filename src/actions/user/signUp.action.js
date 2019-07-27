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
      // TODO: verification working already (just the redirect not working)
      await user.sendEmailVerification()
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { email: auth.currentUser.email }
      })
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILED,
        payload: error.message
      })
    }
  }
}
