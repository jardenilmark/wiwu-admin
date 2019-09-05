import { SET_SELECTED_CONTACT } from './contact.constants'
import { createAction } from 'redux-actions'

export const setSelectedContact = contact => {
  return dispatch => {
    dispatch(createAction(SET_SELECTED_CONTACT)(contact))
  }
}
