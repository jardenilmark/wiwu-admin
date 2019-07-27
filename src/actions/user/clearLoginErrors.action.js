import { CLEAR_LOGIN_ERRORS } from './user.constants'

export const clearLoginErrors = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_LOGIN_ERRORS
    })
  }
}
