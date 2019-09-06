import { createAction } from 'redux-actions'

import { firestore } from '../../firebase'
import { SET_CURRENT_USER } from './admin.constants'

export const setCurrentUser = user => {
  return async dispatch => {
    try {
      let userPayload = user

      if (user) {
        const { uid, email, emailVerified } = user

        const ref = await firestore
          .collection('users')
          .doc(uid)
          .get()
        const userData = ref.data()

        userPayload = { uid, email, emailVerified, ...userData }
      }

      dispatch(createAction(SET_CURRENT_USER)(userPayload))
    } catch (e) {
      console.log('error', e.message)
      // TODO add proper catch
    }
  }
}
