import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
  SET_AUTH_DETAILS
} from '../actions/user/user.constants.js'

const initialState = {
  user: null,
  loginError: null,
  signUpError: null,
  loading: true,
  authenticated: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state
      }
    case SIGNUP_SUCCESS:
      return {
        ...state
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
    case CLEAR_LOGIN_ERRORS:
      return {
        ...initialState,
        loginError: null
      }
    case CLEAR_SIGNUP_ERRORS:
      return {
        ...initialState,
        signUpError: null
      }
    case SET_AUTH_DETAILS:
      const { user, loading, authenticated } = action.payload
      return {
        ...initialState,
        user: user,
        loading: loading,
        authenticated: authenticated
      }
    default:
      return state
  }
}
