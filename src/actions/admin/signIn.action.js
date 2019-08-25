import { auth } from '../../firebase'
import { SIGNIN_SUCCESS, SIGNIN_FAILED } from './admin.constants'
import { createAction } from 'redux-actions'

export const signIn = ({ emailAddress, password }) => {
  return async dispatch => {
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password)
      dispatch(createAction(SIGNIN_SUCCESS)())
    } catch (error) {
      dispatch(createAction(SIGNIN_FAILED)(error.message))
    }
  }
}
