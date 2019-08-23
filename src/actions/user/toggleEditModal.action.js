import { TOGGLE_EDIT_MODAL } from './user.constants'
import { createAction } from 'redux-actions'

export const toggleEditModal = () => {
  return dispatch => {
    dispatch(createAction(TOGGLE_EDIT_MODAL)())
  }
}
