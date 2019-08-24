import { auth } from '../../firebase'
import { LOGOUT_SUCCESS, LOGOUT_FAILED } from './user.constants'
import { createAction } from 'redux-actions'
import { history } from '../../history'

export const logout = () => {
  return async dispatch => {
    try {
      await auth.signOut()
      history.push('/auth/signIn')
      dispatch(createAction(LOGOUT_SUCCESS))
    } catch (error) {
      dispatch(createAction(LOGOUT_FAILED)(error.message))
    }
  }
}
