import { createAction } from 'redux-actions'

import { firestore } from '../../firebase'
import { SET_AUTH_DETAILS } from './admin.constants'

export const setAuthDetails = (user, loading, authenticated) => {
  return async dispatch => {
    try {
      const { uid, email, emailVerified } = user

      const ref = await firestore
        .collection('users')
        .doc(uid)
        .get()
      const userData = ref.data()

      const userPayload = { uid, email, emailVerified, ...userData }

      dispatch(
        createAction(SET_AUTH_DETAILS)({ userPayload, loading, authenticated })
      )
    } catch (e) {
      // TODO add proper catch
    }
  }
}
