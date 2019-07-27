import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED
} from '../actions/user/user.constants.js'

const initialState = {
  current: {},
  loginError: null,
  signUpError: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        current: action.payload
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        current: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      }
    case LOGIN_FAILED:
      return {
        ...initialState,
        loginError: action.payload
      }
    case SIGNUP_FAILED:
      return {
        ...initialState,
        signUpError: action.payload
      }
    case 'CLEAR_LOGIN_ERRORS':
      return {
        ...initialState,
        loginError: null
      }
    case 'CLEAR_SIGNUP_ERRORS':
      return {
        ...initialState,
        signUpError: null
      }
    default:
      return state
  }
}
