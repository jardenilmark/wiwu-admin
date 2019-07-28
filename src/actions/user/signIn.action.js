import { auth } from '../../firebase'
import { LOGIN_SUCCESS, LOGIN_FAILED } from './user.constants'
import { history } from '../../history'

export const signIn = ({ emailAddress, password }) => {
  return async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
      alert(auth.currentUser.emailVerified)
      dispatch({
        type: LOGIN_SUCCESS
      })
      history.push('/')
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error.message
      })
    }
  }
}
