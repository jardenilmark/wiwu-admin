import { message } from 'antd'
import { createAction } from 'redux-actions'

import { auth, firestore as db } from '../../firebase'

import { SIGNUP } from './admin.constants'

import { statuses, roles } from '../../constants/User'

export const signUp = ({ emailAddress: email, password, ...rest }) => {
  return async dispatch => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      const user = auth.currentUser

      const firestorePayload = {
        ...rest,
        role: roles.ADMIN,
        status: statuses.ACTIVE,
        emergencies: []
      }

      await db
        .collection('users')
        .doc(user.uid)
        .set(firestorePayload)

      const actionCodeSettings = {
        url: 'http://localhost:3000/'
      }

      await user.sendEmailVerification(actionCodeSettings)

      const userPayload = {
        ...firestorePayload,
        email,
        uid: user.uid,
        emailVerified: false
      }

      dispatch(createAction(SIGNUP)(userPayload))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
