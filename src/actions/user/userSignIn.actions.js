import { auth } from '../../firebase'
import { LOGIN_SUCCESS, LOGIN_FAILED } from './user.constants'

const signIn = ({ emailAddress, password }) => {
  return async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
      alert(auth.currentUser.emailVerified)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { email: auth.currentUser.email }
      })
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error.message
      })
    }
  }
}

const clearLoginErrors = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_LOGIN_ERRORS'
    })
  }
}

export { signIn, clearLoginErrors }
