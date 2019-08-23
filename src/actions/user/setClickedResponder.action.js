import { SET_CLICKED_RESPONDER } from './user.constants'
import { createAction } from 'redux-actions'

export const setClickedResponder = responder => {
  return dispatch => {
    dispatch(createAction(SET_CLICKED_RESPONDER)(responder))
  }
}
