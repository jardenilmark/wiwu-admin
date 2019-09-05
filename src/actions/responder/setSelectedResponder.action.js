import { SET_SELECTED_RESPONDER } from './responder.constants'
import { createAction } from 'redux-actions'

export const setSelectedResponder = responder => {
  return dispatch => {
    dispatch(createAction(SET_SELECTED_RESPONDER)(responder))
  }
}
