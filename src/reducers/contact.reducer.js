import {
  TOGGLE_EDIT_MODAL,
  SET_CLICKED_CONTACT
} from '../actions/contact/contact.constants'

const initialState = {
  clickedContact: null,
  editModalVisibility: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        editModalVisibility: !state.editModalVisibility
      }
    case SET_CLICKED_CONTACT:
      return {
        ...state,
        clickedContact: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
