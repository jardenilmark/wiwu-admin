import { firestore as db } from '../../firebase'
import { createAction } from 'redux-actions'

export const getEmergencies = () => {
  return async (dispatch, getState) => {
    try {
      const {
        admin: { current }
      } = getState()
      const emergenciesRef = await db.collection('emergencies').get()
      const emergencies = emergenciesRef.docs.map(contact => {
        return { ...contact.data(), id: contact.id }
      })
      console.log(current, emergencies)
    } catch (error) {}
  }
}
