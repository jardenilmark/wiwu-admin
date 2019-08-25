import {
  TOGGLE_EDIT_MODAL,
  SET_CLICKED_RESPONDER,
  FETCH_RESPONDERS_SUCCESS,
  FETCH_RESPONDERS_FAILED,
  EDIT_RESPONDER_FAILED,
  EDIT_RESPONDER_SUCCESS,
  DELETE_RESPONDER_FAILED,
  DELETE_RESPONDER_SUCCESS
} from '../actions/responder/responder.constants'
import { message } from 'antd'

const initialState = {
  clickedResponder: null,
  editModalVisibility: false,
  responders: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_RESPONDER_SUCCESS:
      message.success('Responder updated successfully!', 10)
      return {
        ...state
      }
    case EDIT_RESPONDER_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case DELETE_RESPONDER_SUCCESS:
      message.success('Responder deleted successfully!', 10)
      return {
        ...state
      }
    case DELETE_RESPONDER_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
    case FETCH_RESPONDERS_SUCCESS:
      return {
        ...state,
        responders: action.payload
      }
    case FETCH_RESPONDERS_FAILED:
      message.error(action.payload, 10)
      return {
        ...state
      }
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
