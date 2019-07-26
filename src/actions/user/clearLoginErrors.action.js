export const clearLoginErrors = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_LOGIN_ERRORS'
    })
  }
}
