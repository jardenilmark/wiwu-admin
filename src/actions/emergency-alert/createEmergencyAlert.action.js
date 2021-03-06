import { message } from 'antd'
import { createAction } from 'redux-actions'
import { CREATE_ALERT } from './alert.constants'
import { firestore as db } from '../../firebase'
import * as firebase from 'firebase/app'
import { broadcastNotification } from '../../helpers/common/broadcastNotification.helper'

export const createAlert = values => {
  return async dispatch => {
    try {
      const currentDate = new Date()
      const payload = { ...values, date: currentDate, status: 'active' }
      const res = await db.collection('emergency-alerts').add(payload)

      broadcastNotification(`Emergency broadcast: ${values.message}`)
      message.success('Alert created successfully!', 5)
      dispatch(
        createAction(CREATE_ALERT)({
          ...payload,
          date: firebase.firestore.Timestamp.fromDate(currentDate),
          status: 'active',
          id: res.id
        })
      )
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
