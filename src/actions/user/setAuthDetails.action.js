import { SET_AUTH_DETAILS } from './user.constants'
import { createAction } from 'redux-actions'

export const setAuthDetails = (user, loading, authenticated) => {
  return dispatch => {
    dispatch(createAction(SET_AUTH_DETAILS)({ user, loading, authenticated }))
  }
}
