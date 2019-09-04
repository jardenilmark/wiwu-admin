import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { FETCH_RESPONDERS } from './responder.constants'

import { roles } from '../../constants/User'

export const fetchResponders = () => {
  return async dispatch => {
    try {
      const respondersRef = await db
        .collection('users')
        .where('role', '==', roles.RESPONDER)
        .get()

      const responders = respondersRef.docs.map(responder => {
        return { ...responder.data(), id: responder.id }
      })

      dispatch(createAction(FETCH_RESPONDERS)(responders))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
