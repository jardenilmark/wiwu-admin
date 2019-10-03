import { message } from 'antd'
import { firestore as db } from '../../firebase'
import { createAction } from 'redux-actions'
import { EDIT_ALERT } from './alert.constants'

export const deleteEmergencyAlertAction = id => {
  return async (dispatch, getState) => {
    try {
      await db
        .collection('emergency-alerts')
        .doc(id)
        .delete()

      const {
        admin: { alerts }
      } = getState()

      const newAlerts = alerts.filter(alert => alert.id !== id)
      dispatch(createAction(EDIT_ALERT)(newAlerts))
      message.success('Alert deleted successfully!', 5)
    } catch (error) {
      alert(error.message)
      message.error(error.message, 5)
    }
  }
}
