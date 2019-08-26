import { SET_CLICKED_CONTACT } from './contact.constants'
import { createAction } from 'redux-actions'

export const setClickedContact = contact => {
  return dispatch => {
    dispatch(createAction(SET_CLICKED_CONTACT)(contact))
  }
}
