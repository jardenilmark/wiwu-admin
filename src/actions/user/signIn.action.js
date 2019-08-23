import { auth } from '../../firebase'
import { LOGIN_SUCCESS, LOGIN_FAILED } from './user.constants'
import { createAction } from 'redux-actions'

export const signIn = ({ emailAddress, password }) => {
  return async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
      dispatch(createAction(LOGIN_SUCCESS)())
    } catch (error) {
      dispatch(createAction(LOGIN_FAILED)(error.message))
    }
  }
}
