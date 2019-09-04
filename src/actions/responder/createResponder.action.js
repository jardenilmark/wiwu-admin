import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db, secondaryAuth } from '../../firebase'

import { CREATE_RESPONDER } from './responder.constants'

import { statuses, roles } from '../../constants/User'

export const createResponder = ({ emailAddress: email, password, ...rest }) => {
  return async dispatch => {
    try {
      await secondaryAuth.createUserWithEmailAndPassword(email, password)
      const user = secondaryAuth.currentUser

      const payload = {
        ...rest,
        role: roles.RESPONDER,
        status: statuses.ACTIVE,
        emergencies: []
      }

      await db
        .collection('users')
        .doc(user.uid)
        .set(payload)

      const actionCodeSettings = {
        url: 'http://localhost:3000/'
      }

      payload.id = user.uid

      await user.sendEmailVerification(actionCodeSettings)
      await secondaryAuth.signOut()

      message.success('Responder created successfully!', 10)
      dispatch(createAction(CREATE_RESPONDER)(payload))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
