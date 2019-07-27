import { CLEAR_SIGNUP_ERRORS } from './user.constants'

export const clearSignUpErrors = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SIGNUP_ERRORS
    })
  }
}
