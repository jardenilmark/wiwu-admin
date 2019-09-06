import _ from 'lodash'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { GET_EMERGENCIES } from './emergency.constants'

export const completeEmergency = id => {
  return async (dispatch, getState) => {
    try {
      const {
        emergency: { list }
      } = getState()

      await db
        .collection('emergencies')
        .doc(id)
        .update({
          status: 'COMPLETED'
        })

      const index = _.findIndex(list, e => e.id === id)
      list[index].status = 'COMPLETED'

      dispatch(createAction(GET_EMERGENCIES)(list))
    } catch (error) {}
  }
}
