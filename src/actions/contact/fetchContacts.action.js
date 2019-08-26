import { firestore as db } from '../../firebase'
import {
  FETCH_CONTACTS_FAILED,
  FETCH_CONTACTS_SUCCESS
} from './contact.constants'
import { createAction } from 'redux-actions'

export const fetchContacts = () => {
  return async dispatch => {
    let contacts = []
    try {
      const contactsRef = await db.collection('contacts').get()
      contacts = contactsRef.docs.map(contact => {
        return { ...contact.data(), id: contact.id }
      })
      dispatch(createAction(FETCH_CONTACTS_SUCCESS)(contacts))
    } catch (error) {
      dispatch(createAction(FETCH_CONTACTS_FAILED)(error.message))
    }
  }
}
