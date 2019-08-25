// import {
//   SIGNIN_SUCCESS,
//   SIGNIN_FAILED,
//   SIGNUP_SUCCESS,
//   SIGNUP_FAILED,
//   SIGNOUT_SUCCESS,
//   SIGNOUT_FAILED,
//   SET_AUTH_DETAILS,
// } from '../actions/admin/user.constants.js'

// const initialState = {
//   current: null,
//   loading: true,
//   authenticated: false
// }

// export default function reducer (state = initialState, action) {
//   switch (action.type) {
//     case SIGNIN_SUCCESS:
//       return {
//         ...state
//       }
//     case SIGNIN_FAILED:
//       message.error(action.payload, 10)
//       return {
//         ...state
//       }
//     case SIGNUP_SUCCESS:
//       return {
//         ...state
//       }
//     case SIGNUP_FAILED:
//       message.error(action.payload, 10)
//       return {
//         ...state
//       }
//     case SIGNOUT_SUCCESS:
//       return {
//         ...state
//       }
//     case SIGNOUT_FAILED:
//       message.error(action.payload, 10)
//       return {
//         ...state
//       }

//     case SET_AUTH_DETAILS:
//       const { user, loading, authenticated } = action.payload
//       return {
//         ...state,
//         current: user,
//         loading,
//         authenticated
//       }
//     default:
//       return {
//         ...state
//       }
//   }
// }
