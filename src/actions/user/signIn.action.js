import { auth } from '../../firebase'
import { LOGIN_SUCCESS, LOGIN_FAILED } from './user.constants'
import { createAction } from 'redux-actions'

export const signIn = ({ emailAddress, password }) => {
  return async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
      alert(auth.currentUser.emailVerified)
      dispatch(createAction(LOGIN_SUCCESS))
    } catch (error) {
      console.log('error', error)
      dispatch(createAction(LOGIN_FAILED)(error.message))
    }
  }
}
