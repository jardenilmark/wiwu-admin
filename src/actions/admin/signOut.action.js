import { auth } from '../../firebase'
import { SIGNOUT_SUCCESS, SIGNOUT_FAILED } from './admin.constants'
import { createAction } from 'redux-actions'
import { history } from '../../history'

export const signOut = () => {
  return async dispatch => {
    try {
      await auth.signOut()
      history.push('/auth/signIn')
      dispatch(createAction(SIGNOUT_SUCCESS))
    } catch (error) {
      dispatch(createAction(SIGNOUT_FAILED)(error.message))
    }
  }
}
