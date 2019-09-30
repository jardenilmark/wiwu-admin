import { message } from 'antd'
import { createAction } from 'redux-actions'
import { firestore as db } from '../../firebase'
import { GET_ALERTS } from './alert.constants'

export const getEmergencyAlerts = () => {
  return async dispatch => {
    try {
      const alertsRef = await db.collection('emergency-alerts').get()
      const alerts = alertsRef.docs.map(alert => ({
        ...alert.data(),
        id: alert.id
      }))

      dispatch(createAction(GET_ALERTS)(alerts))
    } catch (error) {
      message.error(error.message, 5)
    }
  }
}
