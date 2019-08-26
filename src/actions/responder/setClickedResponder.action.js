import { SET_CLICKED_RESPONDER } from './responder.constants'
import { createAction } from 'redux-actions'

export const setClickedResponder = responder => {
  return dispatch => {
    dispatch(createAction(SET_CLICKED_RESPONDER)(responder))
  }
}
