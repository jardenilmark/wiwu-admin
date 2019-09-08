import _ from 'lodash'

import { firestore as db } from '../../firebase'

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
    } catch (error) {}
  }
}
