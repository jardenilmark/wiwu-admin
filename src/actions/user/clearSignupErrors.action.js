export const clearSignUpErrors = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_SIGNUP_ERRORS'
    })
  }
}
