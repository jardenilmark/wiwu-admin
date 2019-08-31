import {
  TOGGLE_EDIT_MODAL,
  SET_CLICKED_RESPONDER
} from '../actions/responder/responder.constants'

const initialState = {
  clickedResponder: null,
  editModalVisibility: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        editModalVisibility: !state.editModalVisibility
      }
    case SET_CLICKED_RESPONDER:
      return {
        ...state,
        clickedResponder: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
