import { SET_AUTH_DETAILS } from './user.constants'

export const setAuthDetails = (user, loading, authenticated) => {
  return dispatch => {
    dispatch({
      type: SET_AUTH_DETAILS,
      payload: { user, loading, authenticated }
    })
  }
}
