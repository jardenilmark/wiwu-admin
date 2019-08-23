import {
  TOGGLE_EDIT_MODAL,
  SET_CLICKED_RESPONDER
} from '../actions/user/user.constants'

const initialState = {
  clicked: null,
  modalState: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        modalState: !state.modalState
      }
    case SET_CLICKED_RESPONDER:
      return {
        ...state,
        clicked: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
